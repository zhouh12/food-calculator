# SST Lambda Migration Guide

## 🎯 **Migrating to SST Lambda with Python**

This guide shows how to migrate your current FastAPI RAG implementation to AWS Lambda using SST (Serverless Stack) for optimal cost and scalability.

## 🏆 **Why SST Lambda?**

SST Lambda combines the best of both worlds:

- **Python AI Ecosystem**: Keep all your Python ML/AI libraries
- **Serverless Benefits**: Auto-scaling, pay-per-use, zero maintenance
- **Cost Optimization**: Could be 90% cheaper than always-on servers
- **Global Scale**: Deploy worldwide with ease

## 📋 **Setup**

### 1. Install SST and Dependencies

```bash
# In your project root
npm install sst aws-cdk-lib
npm install -D @types/aws-lambda

# Create SST structure
mkdir -p packages/functions/src
mkdir -p packages/core/src
```

### 2. Project Structure

```
stone-turborepo/
├── sst.config.ts           # SST configuration
├── packages/
│   ├── functions/          # Lambda functions
│   │   ├── src/
│   │   │   ├── analyze-food.py
│   │   │   └── requirements.txt
│   │   └── package.json
│   └── core/               # Shared utilities
└── apps/web/               # Your NextJS app
```

## 🔧 **Implementation**

### **Step 1: SST Configuration**

Create `sst.config.ts` in your project root:

```typescript
import { SSTConfig } from 'sst'
import { NextjsSite, Api } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'food-calorie-app',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Lambda API for AI processing
      const api = new Api(stack, 'FoodAnalysisApi', {
        routes: {
          'POST /analyze-food': {
            function: {
              handler: 'packages/functions/src/analyze-food.handler',
              runtime: 'python3.9',
              timeout: 30,
              memorySize: 1024,
              environment: {
                GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
              },
              layers: [
                // Optional: Add layers for faster cold starts
                'arn:aws:lambda:us-east-1:770693421928:layer:Klayers-p39-pillow:1',
              ],
            },
          },
          'GET /health': {
            function: {
              handler: 'packages/functions/src/health.handler',
              runtime: 'python3.9',
            },
          },
        },
        cors: {
          allowMethods: ['GET', 'POST'],
          allowOrigins: ['http://localhost:3000'],
          allowHeaders: ['Content-Type'],
        },
      })

      // NextJS site
      const site = new NextjsSite(stack, 'FoodCalorieSite', {
        path: 'apps/web',
        environment: {
          NEXT_PUBLIC_API_URL: api.url,
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
        ApiUrl: api.url,
      })
    })
  },
} satisfies SSTConfig
```

### **Step 2: Lambda Function for Food Analysis**

Create `packages/functions/src/analyze-food.py`:

```python
import json
import os
import logging
from typing import Dict, Any
import google.generativeai as genai
from PIL import Image
import requests
import tempfile
import boto3

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize Gemini outside handler for reuse
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config={
        "temperature": 0.3,
        "max_output_tokens": 1024,
    }
)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    AWS Lambda handler for food image analysis
    """
    try:
        # Log request for debugging
        logger.info(f"Received event: {json.dumps(event, default=str)}")

        # Parse request body
        if 'body' not in event:
            return create_error_response(400, "Missing request body")

        try:
            body = json.loads(event['body'])
        except json.JSONDecodeError:
            return create_error_response(400, "Invalid JSON in request body")

        image_url = body.get('imageUrl')
        if not image_url:
            return create_error_response(400, "imageUrl is required")

        # Download and analyze image
        analysis_result = analyze_food_image(image_url)

        return {
            'statusCode': 200,
            'headers': get_cors_headers(),
            'body': json.dumps(analysis_result)
        }

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return create_error_response(500, f"Internal server error: {str(e)}")

def analyze_food_image(image_url: str) -> Dict[str, Any]:
    """
    Download image and analyze with Gemini AI
    """
    temp_path = None
    try:
        # Download image
        logger.info(f"Downloading image from: {image_url}")
        response = requests.get(image_url, timeout=10, stream=True)
        response.raise_for_status()

        # Validate content type
        content_type = response.headers.get('content-type', '')
        if not content_type.startswith('image/'):
            raise ValueError(f"Invalid content type: {content_type}")

        # Create temporary file
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp_file:
            for chunk in response.iter_content(chunk_size=8192):
                tmp_file.write(chunk)
            temp_path = tmp_file.name

        # Open and validate image
        image = Image.open(temp_path)
        logger.info(f"Image loaded: {image.size}, mode: {image.mode}")

        # Analyze with Gemini
        analysis_result = analyze_with_gemini(image)

        return analysis_result

    except requests.RequestException as e:
        logger.error(f"Error downloading image: {str(e)}")
        raise ValueError(f"Failed to download image: {str(e)}")

    except Exception as e:
        logger.error(f"Error in image analysis: {str(e)}", exc_info=True)
        raise

    finally:
        # Clean up temp file
        if temp_path and os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except Exception as e:
                logger.warning(f"Failed to clean up temp file: {str(e)}")

def analyze_with_gemini(image: Image.Image) -> Dict[str, Any]:
    """
    Analyze food image using Gemini AI
    """
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
        "portionSize": "estimated portion size (e.g., '150g', '1 cup', '1 medium')"
    }

    Important guidelines:
    - Be as accurate as possible with calorie and nutrition estimates
    - Consider typical serving sizes
    - If you can't identify the food clearly, set confidence below 0.5
    - Estimate based on what you can see in the image
    - Return ONLY the JSON object, no additional text
    """

    try:
        response = model.generate_content([prompt, image])
        logger.info(f"Gemini response: {response.text}")

        # Parse JSON response
        result = json.loads(response.text.strip())

        # Validate required fields
        required_fields = ['foodName', 'calories', 'confidence', 'nutrition', 'portionSize']
        for field in required_fields:
            if field not in result:
                raise ValueError(f"Missing required field: {field}")

        # Validate nutrition subfields
        nutrition_fields = ['protein', 'carbs', 'fat', 'fiber', 'sugar']
        for field in nutrition_fields:
            if field not in result['nutrition']:
                result['nutrition'][field] = 0

        # Ensure types are correct
        result['calories'] = int(result['calories'])
        result['confidence'] = float(result['confidence'])

        for field in nutrition_fields:
            result['nutrition'][field] = float(result['nutrition'][field])

        return result

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse Gemini response: {response.text}")
        # Return fallback data with low confidence
        return {
            "foodName": "Unknown Food",
            "calories": 200,
            "confidence": 0.1,
            "nutrition": {
                "protein": 10,
                "carbs": 20,
                "fat": 8,
                "fiber": 3,
                "sugar": 5
            },
            "portionSize": "Unknown"
        }

    except Exception as e:
        logger.error(f"Error with Gemini analysis: {str(e)}")
        raise

def create_error_response(status_code: int, message: str) -> Dict[str, Any]:
    """Create standardized error response"""
    return {
        'statusCode': status_code,
        'headers': get_cors_headers(),
        'body': json.dumps({'error': message})
    }

def get_cors_headers() -> Dict[str, str]:
    """Get CORS headers for response"""
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
```

### **Step 3: Lambda Requirements**

Create `packages/functions/src/requirements.txt`:

```txt
google-generativeai==0.3.2
Pillow==10.0.1
requests==2.31.0
boto3==1.34.0
```

### **Step 4: Health Check Lambda**

Create `packages/functions/src/health.py`:

```python
import json
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Simple health check endpoint"""
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({
            'status': 'healthy',
            'service': 'Food Analysis Lambda',
            'version': '1.0.0'
        })
    }
```

### **Step 5: Update NextJS Integration**

Update `apps/web/core/food/analyze-food.ts`:

```typescript
// Replace the FastAPI URL with SST Lambda API
async function analyzeImageWithAI(imageUrl: string): Promise<FoodAnalysisResult> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

    const response = await fetch(`${apiUrl}/analyze-food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Lambda API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()

    // Validate response format
    if (!result.foodName || typeof result.calories !== 'number') {
      throw new Error('Invalid response format from Lambda')
    }

    return result
  } catch (error) {
    console.error('Error calling Lambda function:', error)

    // Fallback to mock data if Lambda is unavailable
    return {
      foodName: 'Unknown Food (Lambda Unavailable)',
      calories: 200,
      confidence: 0.1,
      nutrition: {
        protein: 10,
        carbs: 20,
        fat: 8,
        fiber: 3,
        sugar: 5,
      },
      portionSize: 'Unknown',
    }
  }
}
```

### **Step 6: Package.json for Functions**

Create `packages/functions/package.json`:

```json
{
  "name": "food-analysis-functions",
  "version": "1.0.0",
  "description": "AWS Lambda functions for food analysis",
  "main": "index.js",
  "scripts": {
    "build": "echo 'Python functions - no build needed'",
    "test": "python -m pytest tests/"
  },
  "dependencies": {},
  "devDependencies": {
    "pytest": "^7.4.0"
  }
}
```

## 🚀 **Deployment**

### **Step 1: Set Environment Variables**

```bash
# Set your Gemini API key
export GEMINI_API_KEY="your-gemini-api-key"
```

### **Step 2: Deploy to AWS**

```bash
# Install SST globally (optional)
npm install -g sst

# Deploy to development
npx sst deploy --stage dev

# Deploy to production
npx sst deploy --stage prod
```

### **Step 3: Test the Deployment**

```bash
# Test health endpoint
curl https://your-api-url.execute-api.us-east-1.amazonaws.com/health

# Test food analysis
curl -X POST https://your-api-url.execute-api.us-east-1.amazonaws.com/analyze-food \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"}'
```

## 📊 **Benefits of SST Lambda**

### **Cost Savings**

- **Pay-per-use**: Only pay when functions are invoked
- **No idle costs**: Unlike always-on FastAPI server
- **Potential 90% cost reduction** for variable traffic

### **Performance**

- **Auto-scaling**: From 0 to thousands of concurrent executions
- **Global deployment**: Deploy to multiple AWS regions
- **Warm instances**: Keep functions warm to avoid cold starts

### **Maintenance**

- **Zero server management**: AWS handles all infrastructure
- **Automatic scaling**: No capacity planning needed
- **Built-in monitoring**: CloudWatch logs and metrics

### **Developer Experience**

- **Live development**: `sst dev` for local development
- **Type safety**: Full TypeScript support in configuration
- **Easy debugging**: Integrated logging and error tracking

## 🔧 **Advanced Configuration**

### **Cold Start Optimization**

```typescript
// In sst.config.ts
function: {
  handler: "packages/functions/src/analyze-food.handler",
  runtime: "python3.9",
  timeout: 30,
  memorySize: 1024,
  // Keep functions warm
  environment: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
  },
  // Use provisioned concurrency for critical functions
  reservedConcurrentExecutions: 10,
}
```

### **Multi-Stage Deployment**

```typescript
// Different configurations per stage
const stage = app.stage
const isProd = stage === 'prod'

const api = new Api(stack, 'FoodAnalysisApi', {
  routes: {
    'POST /analyze-food': {
      function: {
        handler: 'packages/functions/src/analyze-food.handler',
        runtime: 'python3.9',
        timeout: isProd ? 30 : 60,
        memorySize: isProd ? 1024 : 512,
        environment: {
          GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
          STAGE: stage,
        },
      },
    },
  },
})
```

### **Monitoring and Alerts**

```typescript
// Add CloudWatch alarms
import { Alarm, Metric } from 'aws-cdk-lib/aws-cloudwatch'

const errorAlarm = new Alarm(stack, 'FunctionErrorAlarm', {
  metric: Metric.metricAll('AWS/Lambda', 'Errors', {
    dimensionsMap: {
      FunctionName: api.getFunction('POST /analyze-food')!.functionName,
    },
  }),
  threshold: 5,
  evaluationPeriods: 2,
})
```

## 🧪 **Testing**

### **Local Development**

```bash
# Start SST in development mode
npx sst dev

# This creates a local endpoint that proxies to your local functions
# Your NextJS app will call the local Lambda functions
```

### **Unit Testing**

Create `packages/functions/tests/test_analyze_food.py`:

```python
import json
import pytest
from unittest.mock import patch, MagicMock
from src.analyze_food import handler, analyze_food_image

def test_handler_success():
    event = {
        'body': json.dumps({'imageUrl': 'https://example.com/food.jpg'})
    }
    context = {}

    with patch('src.analyze_food.analyze_food_image') as mock_analyze:
        mock_analyze.return_value = {
            'foodName': 'Test Food',
            'calories': 100,
            'confidence': 0.8,
            'nutrition': {'protein': 10, 'carbs': 15, 'fat': 5, 'fiber': 2, 'sugar': 3},
            'portionSize': '100g'
        }

        response = handler(event, context)

        assert response['statusCode'] == 200
        body = json.loads(response['body'])
        assert body['foodName'] == 'Test Food'
        assert body['calories'] == 100

def test_handler_missing_image_url():
    event = {
        'body': json.dumps({})
    }
    context = {}

    response = handler(event, context)

    assert response['statusCode'] == 400
    body = json.loads(response['body'])
    assert 'imageUrl is required' in body['error']
```

## 📈 **Monitoring**

### **CloudWatch Metrics**

Monitor these key metrics:

- **Duration**: Function execution time
- **Errors**: Failed invocations
- **Throttles**: Concurrent execution limits hit
- **Cold Starts**: New container initializations

### **Custom Metrics**

```python
import boto3

cloudwatch = boto3.client('cloudwatch')

def put_custom_metric(metric_name: str, value: float, unit: str = 'Count'):
    cloudwatch.put_metric_data(
        Namespace='FoodAnalysis',
        MetricData=[
            {
                'MetricName': metric_name,
                'Value': value,
                'Unit': unit,
            },
        ]
    )

# In your function
put_custom_metric('AnalysisConfidence', result['confidence'])
put_custom_metric('ImageDownloadTime', download_time, 'Seconds')
```

## 🎯 **Migration Checklist**

- [ ] Install SST and configure project structure
- [ ] Set up SST configuration file
- [ ] Create Lambda functions for food analysis
- [ ] Set up Python requirements and dependencies
- [ ] Update NextJS app to call Lambda API
- [ ] Set environment variables (GEMINI_API_KEY)
- [ ] Deploy to development environment
- [ ] Test all functionality thoroughly
- [ ] Set up monitoring and alerts
- [ ] Deploy to production
- [ ] Monitor performance and costs
- [ ] Remove old FastAPI infrastructure (when confident)

## 🏆 **Final Recommendation**

**SST Lambda is excellent for your food calorie app if you want:**

1. **Massive cost savings** (pay-per-use vs always-on servers)
2. **Auto-scaling** from 0 to millions of requests
3. **Python AI ecosystem** benefits
4. **Zero maintenance** overhead
5. **Global deployment** capabilities

The migration provides the perfect balance of:

- **Cost optimization**
- **Scalability**
- **Maintainability**
- **Performance**

**This approach could save you 90% on infrastructure costs while providing better scalability than your current FastAPI setup!** 🎉
