from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .food_advisor import FoodAdvisor
from .food_image_analyzer import food_analyzer
from .utils.storage import save_temp_file
from .utils.validation import validate_user_profile
from .utils.llm_client import generate_response
import requests
import tempfile
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for API requests
class ImageAnalysisRequest(BaseModel):
    imageUrl: str

class FoodAnalysisResponse(BaseModel):
    foodName: str
    calories: int
    confidence: float
    nutrition: dict
    portionSize: str

# Health check endpoint
@app.get("/")
async def health_check():
    return {
        "status": "healthy",
        "service": "RAG Food Advisor",
        "version": "1.0.0"
    }

# Test Gemini connection
@app.get("/test-gemini")
async def test_gemini():
    try:
        test_prompt = "Give me a simple healthy breakfast suggestion in 2 sentences."
        response = await generate_response(test_prompt)
        return {
            "status": "success",
            "response": response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")

# Test food advisor with sample data
@app.get("/test-advisor")
async def test_advisor():
    try:
        sample_profile = {
            "age": 44,
            "current_weight": 70.0,
            "current_fat_percentage": 17.0,
            "health_goals": "Reduce fat percentage to 13%"
        }
        
        advisor = FoodAdvisor(sample_profile)
        recommendation = await advisor.get_recommendation(None)
        
        return {
            "status": "success",
            "sample_profile": sample_profile,
            "recommendation": recommendation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Advisor Error: {str(e)}")

# Original analyze endpoint
@app.post("/analyze")
async def analyze_food(
    file: UploadFile = File(...),
    age: int = Form(...),
    current_weight: float = Form(...),
    goal_weight: float = Form(...),
    health_goals: str = Form(...)
):
    try:
        # Validate inputs
        user_profile = validate_user_profile({
            "age": age, 
            "current_weight": current_weight,
            "goal_weight": goal_weight,
            "health_goals": health_goals
        })
        
        # Process image and get recommendation
        image_path = await save_temp_file(file)
        advisor = FoodAdvisor(user_profile)
        recommendation = await advisor.get_recommendation(image_path)
        
        return recommendation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New endpoint for NextJS integration - analyze image from URL
@app.post("/analyze-image-url")
async def analyze_image_url(request: ImageAnalysisRequest):
    """
    Analyze food image from URL and return nutrition information
    This endpoint is specifically designed for NextJS app integration
    """
    try:
        # Download image from URL to temporary file
        image_path = await download_image_from_url(request.imageUrl)
        
        # Analyze the image
        analysis_result = await food_analyzer.analyze_food_image(image_path)
        
        # Clean up temporary file
        if os.path.exists(image_path):
            os.remove(image_path)
        
        if not analysis_result['success']:
            raise HTTPException(
                status_code=400, 
                detail=f"Food analysis failed: {analysis_result.get('error', 'Unknown error')}"
            )
        
        # Transform the result to match TypeScript expected format
        data = analysis_result['data']
        
        response = {
            "foodName": data.get('foodName', 'Unknown Food'),
            "calories": int(data.get('calories', 0)),
            "confidence": float(data.get('confidence', 0.0)),
            "nutrition": {
                "protein": float(data.get('nutrition', {}).get('protein', 0)),
                "carbs": float(data.get('nutrition', {}).get('carbs', 0)),
                "fat": float(data.get('nutrition', {}).get('fat', 0)),
                "fiber": float(data.get('nutrition', {}).get('fiber', 0)),
                "sugar": float(data.get('nutrition', {}).get('sugar', 0))
            },
            "portionSize": data.get('portionSize', 'Unknown')
        }
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image analysis error: {str(e)}")

async def download_image_from_url(url: str) -> str:
    """
    Download image from URL and save to temporary file
    Returns the path to the temporary file
    """
    try:
        # Create a temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
        temp_path = temp_file.name
        temp_file.close()
        
        # Download the image
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()
        
        # Save to temporary file
        with open(temp_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return temp_path
        
    except Exception as e:
        # Clean up temp file if it was created
        if 'temp_path' in locals() and os.path.exists(temp_path):
            os.remove(temp_path)
        raise Exception(f"Failed to download image: {str(e)}")