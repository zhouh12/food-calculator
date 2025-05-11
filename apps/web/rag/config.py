from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")  # Get from environment variable
    MODEL_NAME: str = "gemini-1.5-flash"  
    MAX_TOKENS: int = 2048
    TEMPERATURE: float = 0.7
    
    class Config:
        env_prefix = "RAG_"

settings = Settings()

# Validate API key is present
if not settings.GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in environment variables") 