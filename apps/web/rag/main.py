from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .food_advisor import FoodAdvisor
from .utils.storage import save_temp_file
from .utils.validation import validate_user_profile
from .utils.llm_client import generate_response

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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