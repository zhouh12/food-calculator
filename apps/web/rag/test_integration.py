#!/usr/bin/env python3
"""
Test the RAG integration with a sample image URL
"""
import requests
import json
import sys

def test_food_analysis():
    """Test the food analysis endpoint"""
    
    # Test image URL (a sample food image)
    test_image_url = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop"
    
    print("🧪 Testing RAG Food Analysis Integration...")
    print(f"📸 Test Image URL: {test_image_url}")
    print("")
    
    try:
        # Make the API call
        response = requests.post(
            "http://localhost:8000/analyze-image-url",
            json={"imageUrl": test_image_url},
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS! Food analysis completed:")
            print(f"🍽️  Food Name: {result['foodName']}")
            print(f"🔥 Calories: {result['calories']}")
            print(f"📊 Confidence: {result['confidence']:.2%}")
            print(f"📏 Portion Size: {result['portionSize']}")
            print("")
            print("🥗 Nutrition Breakdown:")
            nutrition = result['nutrition']
            print(f"   • Protein: {nutrition['protein']}g")
            print(f"   • Carbs: {nutrition['carbs']}g")
            print(f"   • Fat: {nutrition['fat']}g")
            print(f"   • Fiber: {nutrition['fiber']}g")
            print(f"   • Sugar: {nutrition['sugar']}g")
            print("")
            print("🎉 Integration test PASSED!")
            return True
            
        else:
            print(f"❌ ERROR: API returned status {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ ERROR: Could not connect to RAG server")
        print("💡 Make sure the server is running: python start_server.py")
        return False
        
    except requests.exceptions.Timeout:
        print("❌ ERROR: Request timed out (30s)")
        print("💡 The AI analysis might be taking longer than expected")
        return False
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False

def test_health_check():
    """Test if the server is running"""
    try:
        response = requests.get("http://localhost:8000/", timeout=5)
        if response.status_code == 200:
            print("✅ RAG Server is running!")
            return True
        else:
            print(f"❌ Server health check failed: {response.status_code}")
            return False
    except:
        print("❌ RAG Server is not running")
        return False

if __name__ == "__main__":
    print("🔧 Testing RAG Integration...")
    print("=" * 50)
    
    # First check if server is running
    if not test_health_check():
        print("\n💡 Start the server first: python start_server.py")
        sys.exit(1)
    
    print("")
    
    # Test the food analysis
    if test_food_analysis():
        print("\n🎉 All tests passed! Your integration is working correctly.")
        print("🚀 You can now use the food scanner in your NextJS app!")
    else:
        print("\n❌ Integration test failed. Check the error messages above.")
        sys.exit(1) 