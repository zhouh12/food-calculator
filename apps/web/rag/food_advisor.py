from .utils.llm_client import generate_response

class FoodAdvisor:
    def __init__(self, user_profile: dict):
        self.user_profile = user_profile
        
    async def get_recommendation(self, image_path: str) -> dict:
        # Here you would add your image analysis logic
        # For example, using Gemini's vision capabilities
        
        system_prompt = """You are a nutritional expert AI that provides personalized food advice. 
        Analyze the food and provide recommendations based on the user's profile and health goals."""
        
        user_prompt = f"""
        Given the following user profile, provide a detailed nutritional analysis and recommendations:
        
        User Profile:
        - Age: {self.user_profile['age']}
        - Current Weight: {self.user_profile['current_weight']} kg
        - Current Fat Percentage: {self.user_profile['current_fat_percentage']} %
        - Health Goals: {self.user_profile['health_goals']}
        
        Please provide:
        1. Detailed nutritional analysis of the food
        2. Assessment of how this food aligns with the user's goals
        3. Specific recommendations or healthier alternatives if needed
        4. Portion size recommendations based on their goals
        
        Format your response in clear sections with bullet points where appropriate.
        """
        
        # For debugging purposes, print to stderr which shows in console
        import sys
        print("System Prompt:", system_prompt, file=sys.stderr)
        print("User Prompt:", user_prompt, file=sys.stderr)

        recommendation = await generate_response(user_prompt, system_prompt)
        
        return {
            "analysis": recommendation,
            "image_path": image_path
        } 