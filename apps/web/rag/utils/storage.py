import os
import uuid
from fastapi import UploadFile

async def save_temp_file(file: UploadFile) -> str:
    """
    Save uploaded file to a temporary location and return the file path
    """
    # Create temp directory if it doesn't exist
    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    temp_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(temp_dir, temp_filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    return file_path 