import google.generativeai as genai
from PIL import Image
from .config import settings
import json
import logging

logger = logging.getLogger(__name__)

class FoodImageAnalyzer:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config={
                "temperature": 0.3,  # Lower temperature for more consistent food analysis
                "max_output_tokens": 1024,
            }
        )

    async def analyze_food_image(self, image_path: str) -> dict:
        """
        Analyze food image and return detailed nutrition information
        """
        try:
            image = Image.open(image_path)
            
            # Enhanced prompt for food analysis
            prompt = """
            You are a professional nutritionist and food expert. Analyze this food image and provide detailed information.

            Return ONLY a valid JSON object with this exact structure:
            {
                "foodName": "specific name of the food/dish",
                "calories": estimated calories as a number,
                "confidence": confidence score from 0.0 to 1.0,
                "nutrition": {
                    "protein": grams of protein,
                    "carbs": grams of carbohydrates,
                    "fat": grams of fat,
                    "fiber": grams of fiber,
                    "sugar": grams of sugar
                },
                "portionSize": "estimated portion size (e.g., '150g', '1 cup', '1 medium')",
                "ingredients": ["list", "of", "main", "ingredients"],
                "mealType": "breakfast/lunch/dinner/snack",
                "healthScore": score from 1-10 (10 being healthiest),
                "tips": ["helpful", "nutrition", "tips"]
            }

            Important guidelines:
            - Be as accurate as possible with calorie and nutrition estimates
            - Consider typical serving sizes
            - If you can't identify the food clearly, set confidence below 0.5
            - Provide practical nutrition tips
            - Estimate based on what you can see in the image
            """

            response = self.model.generate_content([prompt, image])
            
            # Parse the JSON response
            try:
                result = json.loads(response.text.strip())
                
                # Validate required fields
                required_fields = ['foodName', 'calories', 'confidence', 'nutrition', 'portionSize']
                for field in required_fields:
                    if field not in result:
                        raise ValueError(f"Missing required field: {field}")
                
                # Ensure nutrition has required subfields
                nutrition_fields = ['protein', 'carbs', 'fat', 'fiber', 'sugar']
                for field in nutrition_fields:
                    if field not in result['nutrition']:
                        result['nutrition'][field] = 0
                
                # Add default values if missing
                result.setdefault('ingredients', [])
                result.setdefault('mealType', 'unknown')
                result.setdefault('healthScore', 5)
                result.setdefault('tips', [])
                
                return {
                    'success': True,
                    'data': result
                }
                
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON response: {response.text}")
                return {
                    'success': False,
                    'error': 'Failed to parse AI response',
                    'raw_response': response.text
                }
                
        except Exception as e:
            logger.error(f"Error analyzing food image: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }

    async def get_food_recommendations(self, user_profile: dict, current_nutrition: dict) -> dict:
        """
        Generate personalized food recommendations based on user profile and current intake
        """
        try:
            prompt = f"""
            Based on the user profile and current nutrition intake, provide personalized food recommendations.

            User Profile:
            - Age: {user_profile.get('age')} years
            - Weight: {user_profile.get('weight')} kg
            - Height: {user_profile.get('height')} cm
            - Goal: {user_profile.get('goal')}
            - Activity Level: {user_profile.get('activity_level')}
            - Gender: {user_profile.get('gender')}

            Current Daily Intake:
            - Calories: {current_nutrition.get('calories', 0)}
            - Protein: {current_nutrition.get('protein', 0)}g
            - Carbs: {current_nutrition.get('carbs', 0)}g
            - Fat: {current_nutrition.get('fat', 0)}g

            Return ONLY a valid JSON object:
            {
                "recommendations": [
                    {
                        "food": "food name",
                        "reason": "why this food is recommended",
                        "calories": estimated calories,
                        "mealType": "breakfast/lunch/dinner/snack"
                    }
                ],
                "dailyTargets": {
                    "calories": target calories,
                    "protein": target protein in grams,
                    "carbs": target carbs in grams,
                    "fat": target fat in grams
                },
                "tips": ["personalized nutrition tips"]
            }
            """

            response = self.model.generate_content(prompt)
            result = json.loads(response.text.strip())
            
            return {
                'success': True,
                'data': result
            }
            
        except Exception as e:
            logger.error(f"Error generating recommendations: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }

# Global instance
food_analyzer = FoodImageAnalyzer()