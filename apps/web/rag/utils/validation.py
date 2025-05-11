from typing import Dict, Any
from fastapi import HTTPException

def validate_user_profile(profile: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate user profile data
    """
    # Validate age
    if not 0 < profile["age"] < 120:
        raise HTTPException(status_code=400, detail="Invalid age value")
    
    # Validate weights
    if not 0 < profile["current_weight"] < 500:
        raise HTTPException(status_code=400, detail="Invalid current weight value")
    
    if not 0 < profile["goal_weight"] < 500:
        raise HTTPException(status_code=400, detail="Invalid goal weight value")
    
    # Validate health goals
    if not profile["health_goals"].strip():
        raise HTTPException(status_code=400, detail="Health goals cannot be empty")
    
    return profile 