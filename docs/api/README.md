# PlantPal API Documentation

Welcome to the PlantPal API documentation. This guide provides comprehensive information about our API endpoints, authentication, error handling, and integration examples.

## Table of Contents

1. [Authentication](#authentication)
2. [Endpoints](#endpoints)
3. [Error Handling](#error-handling)
4. [Integration Examples](#integration-examples)
5. [Testing Guide](#testing-guide)

## Authentication

PlantPal API uses JWT (JSON Web Tokens) for authentication. Here's how to authenticate:

### Getting an API Key

1. Register on PlantPal platform
2. Go to Developer Settings
3. Generate API Key

### Using the API Key

Include your API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Token Refresh

Tokens expire after 24 hours. Use the refresh endpoint to get a new token:

```http
POST /api/auth/refresh
Authorization: Bearer YOUR_REFRESH_TOKEN
```

## Endpoints

### Plant Detection

#### Detect Plant Disease

```http
POST /api/v1/plants/detect
Content-Type: multipart/form-data
Authorization: Bearer YOUR_API_KEY

file: <image_file>
```

Response:
```json
{
  "success": true,
  "data": {
    "plant_name": "Tomato",
    "disease": "Early Blight",
    "confidence": 0.95,
    "treatment": {
      "recommendations": [
        "Remove infected leaves",
        "Apply fungicide",
        "Improve air circulation"
      ],
      "products": [
        {
          "name": "Organic Fungicide",
          "type": "Natural",
          "application": "Spray every 7 days"
        }
      ]
    }
  }
}
```

### Plant Care

#### Get Care Schedule

```http
GET /api/v1/plants/{plant_id}/care-schedule
Authorization: Bearer YOUR_API_KEY
```

Response:
```json
{
  "success": true,
  "data": {
    "watering_frequency": "Every 3 days",
    "sunlight": "Partial shade",
    "fertilizer": "Monthly",
    "next_tasks": [
      {
        "type": "watering",
        "due_date": "2024-04-08",
        "description": "Water thoroughly"
      }
    ]
  }
}
```

### User Management

#### Update User Profile

```http
PUT /api/v1/users/profile
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "notifications": true,
    "language": "en"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "notifications": true,
      "language": "en"
    },
    "updated_at": "2024-04-05T10:30:00Z"
  }
}
```

## Error Handling

### Error Codes

| Code | Description |
|------|-------------|
| 400  | Bad Request - Invalid input parameters |
| 401  | Unauthorized - Invalid or missing API key |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource doesn't exist |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error |

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "Additional error details"
    }
  }
}
```

## Integration Examples

### Python

```python
import requests

API_KEY = 'your_api_key'
BASE_URL = 'https://api.plantpal.com/v1'

def detect_plant_disease(image_path):
    headers = {
        'Authorization': f'Bearer {API_KEY}'
    }
    
    with open(image_path, 'rb') as image:
        files = {'file': image}
        response = requests.post(
            f'{BASE_URL}/plants/detect',
            headers=headers,
            files=files
        )
    
    return response.json()

# Usage
result = detect_plant_disease('plant_image.jpg')
print(result)
```

### JavaScript

```javascript
const API_KEY = 'your_api_key';
const BASE_URL = 'https://api.plantpal.com/v1';

async function detectPlantDisease(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${BASE_URL}/plants/detect`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    },
    body: formData
  });

  return await response.json();
}

// Usage
const imageFile = document.querySelector('input[type="file"]').files[0];
detectPlantDisease(imageFile)
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

## Testing Guide

### Testing Endpoints

1. **Setup Test Environment**
   ```bash
   # Install dependencies
   npm install
   
   # Set environment variables
   export PLANTPAL_API_KEY=your_test_api_key
   export PLANTPAL_API_URL=https://api.plantpal.com/v1
   ```

2. **Run Tests**
   ```bash
   # Run all tests
   npm test
   
   # Run specific test file
   npm test -- tests/api/plants.test.js
   ```

### Test Cases

1. **Authentication Tests**
   - Valid API key
   - Invalid API key
   - Expired token
   - Token refresh

2. **Plant Detection Tests**
   - Valid image upload
   - Invalid image format
   - Image size limits
   - Response format

3. **Error Handling Tests**
   - Rate limiting
   - Invalid inputs
   - Server errors

### Example Test

```javascript
const { expect } = require('chai');
const { detectPlantDisease } = require('../src/api');

describe('Plant Detection API', () => {
  it('should detect plant disease from valid image', async () => {
    const result = await detectPlantDisease('test-image.jpg');
    expect(result.success).to.be.true;
    expect(result.data).to.have.property('plant_name');
    expect(result.data).to.have.property('disease');
  });

  it('should handle invalid image format', async () => {
    try {
      await detectPlantDisease('invalid.txt');
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
});
``` 