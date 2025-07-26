import json
import datetime

def handler(event, context):
    print("Event:", json.dumps(event, indent=2))
    
    http_method = event.get('httpMethod', 'UNKNOWN')
    path = event.get('path', '/')
    query_params = event.get('queryStringParameters', {})

    response_body = {
        "message": "Hello from Python Lambda!",
        "timestamp": datetime.datetime.now().isoformat(),
        "method": http_method,
        "path": path,
        "queryParams": query_params
    }
    
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps(response_body)
    }

def hello(event, context):
    print("Hello Event:", json.dumps(event, indent=2))

    request_body = {}
    if event.get('body'):
        try:
            request_body = json.loads(event['body'])
        except json.JSONDecodeError:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({"error": "Invalid JSON in request body"})
            }

    name = request_body.get('name', 'World')
    
    response_body = {
        "message": f"Hello, {name}!",
        "timestamp": datetime.datetime.now().isoformat(),
        "received_data": request_body
    }
    
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps(response_body)
    } 