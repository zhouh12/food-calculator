import google.generativeai as genai
from PIL import Image
from ..config import settings

def init_gemini():
    genai.configure(api_key=settings.GEMINI_API_KEY)
    
async def generate_response(prompt: str, system_prompt: str = None, image_path: str = None) -> str:
    init_gemini()
    
    try:
        model = genai.GenerativeModel(
            model_name=settings.MODEL_NAME,
            generation_config={
                "temperature": settings.TEMPERATURE,
                "max_output_tokens": settings.MAX_TOKENS,
            }
        )
        
        # Combine prompts
        full_prompt = f"{system_prompt}\n\n{prompt}" if system_prompt else prompt
        
        # If image is provided, use multimodal generation
        if image_path:
            image = Image.open(image_path)
            response = model.generate_content([full_prompt, image])
        else:
            response = model.generate_content(full_prompt)
            
        return response.text
    except Exception as e:
        print(f"Error generating Gemini response: {e}")
        return None 