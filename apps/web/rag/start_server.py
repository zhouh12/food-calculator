#!/usr/bin/env python3
"""
Start the RAG FastAPI server for food image analysis
"""
import uvicorn
import os
from pathlib import Path

if __name__ == "__main__":
    # Change to the rag directory
    os.chdir(Path(__file__).parent)
    
    print("🚀 Starting RAG Food Analysis Server...")
    print("📡 Server will be available at: http://localhost:8000")
    print("📄 API Documentation: http://localhost:8000/docs")
    print("✨ Health Check: http://localhost:8000/")
    print("")
    print("🔧 Make sure you have GEMINI_API_KEY in your environment variables!")
    print("💡 You can test the integration with: curl -X POST http://localhost:8000/analyze-image-url")
    print("")
    
    # Start the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["."]
    ) 