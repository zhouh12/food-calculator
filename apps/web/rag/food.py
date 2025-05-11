from fastapi import APIRouter, UploadFile, File, Form
import httpx

router = APIRouter()

RAG_SERVICE_URL = "http://localhost:8001"  # RAG service address

@app.post("/api/food/analyze")
async def analyze_food(
    file: UploadFile = File(...),
    age: int = Form(...),
    current_weight: float = Form(...),
    goal_weight: float = Form(...),
    health_goals: str = Form(...)
):
    async with httpx.AsyncClient() as client:
        # Forward request to RAG service
        form_data = {
            "file": file.file,
            "age": str(age),
            "current_weight": str(current_weight),
            "goal_weight": str(goal_weight),
            "health_goals": health_goals
        }
        response = await client.post(
            f"{RAG_SERVICE_URL}/analyze",
            files={"file": (file.filename, file.file)},
            data=form_data
        )
        return response.json()