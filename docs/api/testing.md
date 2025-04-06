# API Testing Guide

## Overview
This guide explains how to test the PlantPal API, including setting up a test environment, writing tests, and using our testing tools.

## Test Environment Setup

### 1. Test API Keys
1. Sign up for a developer account
2. Generate a test API key from the developer dashboard
3. Use the test environment URL: `https://staging-api.plantpal.com/v1`

### 2. Test Data
We provide test data sets for common scenarios:

```bash
# Download test images
curl -O https://staging-api.plantpal.com/v1/test-data/plant-images.zip

# Download test responses
curl -O https://staging-api.plantpal.com/v1/test-data/sample-responses.json
```

## Testing Tools

### 1. Postman Collection
We provide a Postman collection for testing all endpoints:

1. Download the collection: [PlantPal API.postman_collection.json](https://staging-api.plantpal.com/v1/postman/PlantPal_API.postman_collection.json)
2. Import into Postman
3. Set up environment variables:
   - `base_url`: https://staging-api.plantpal.com/v1
   - `api_key`: Your test API key

### 2. API Testing Scripts
Example test scripts in different languages:

#### Python
```python
import requests
import pytest

BASE_URL = 'https://staging-api.plantpal.com/v1'
API_KEY = 'your_test_api_key'

def test_plant_detection():
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Test with sample image
    with open('test_data/healthy_plant.jpg', 'rb') as f:
        files = {'file': f}
        response = requests.post(f'{BASE_URL}/plants/detect', headers=headers, files=files)
    
    assert response.status_code == 200
    assert response.json()['success'] == True
    assert 'plant_name' in response.json()['data']
```

#### JavaScript
```javascript
const axios = require('axios');
const assert = require('assert');

const BASE_URL = 'https://staging-api.plantpal.com/v1';
const API_KEY = 'your_test_api_key';

async function testPlantDetection() {
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    };
    
    const formData = new FormData();
    formData.append('file', fs.createReadStream('test_data/healthy_plant.jpg'));
    
    try {
        const response = await axios.post(`${BASE_URL}/plants/detect`, formData, { headers });
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.success, true);
        assert.ok(response.data.data.plant_name);
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}
```

## Test Cases

### 1. Authentication Tests
```python
def test_authentication():
    # Test valid credentials
    response = requests.post(f'{BASE_URL}/auth/login', json={
        'email': 'test@example.com',
        'password': 'test_password'
    })
    assert response.status_code == 200
    assert 'access_token' in response.json()['data']
    
    # Test invalid credentials
    response = requests.post(f'{BASE_URL}/auth/login', json={
        'email': 'test@example.com',
        'password': 'wrong_password'
    })
    assert response.status_code == 401
    assert response.json()['error']['code'] == 'AUTH_INVALID_CREDENTIALS'
```

### 2. Plant Detection Tests
```python
def test_plant_detection_scenarios():
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Test healthy plant
    with open('test_data/healthy_plant.jpg', 'rb') as f:
        response = requests.post(f'{BASE_URL}/plants/detect', headers=headers, files={'file': f})
    assert response.status_code == 200
    assert response.json()['data']['disease'] is None
    
    # Test diseased plant
    with open('test_data/diseased_plant.jpg', 'rb') as f:
        response = requests.post(f'{BASE_URL}/plants/detect', headers=headers, files={'file': f})
    assert response.status_code == 200
    assert response.json()['data']['disease'] is not None
```

### 3. Error Handling Tests
```python
def test_error_handling():
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Test invalid file type
    with open('test_data/invalid.txt', 'rb') as f:
        response = requests.post(f'{BASE_URL}/plants/detect', headers=headers, files={'file': f})
    assert response.status_code == 400
    assert response.json()['error']['code'] == 'VALIDATION_INVALID_FILE_TYPE'
    
    # Test file too large
    with open('test_data/large_image.jpg', 'rb') as f:
        response = requests.post(f'{BASE_URL}/plants/detect', headers=headers, files={'file': f})
    assert response.status_code == 400
    assert response.json()['error']['code'] == 'VALIDATION_FILE_TOO_LARGE'
```

## Performance Testing

### 1. Rate Limiting Tests
```python
def test_rate_limiting():
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Make requests up to rate limit
    for _ in range(60):  # Free tier limit
        response = requests.get(f'{BASE_URL}/plants', headers=headers)
        assert response.status_code == 200
    
    # Next request should be rate limited
    response = requests.get(f'{BASE_URL}/plants', headers=headers)
    assert response.status_code == 429
    assert 'Retry-After' in response.headers
```

### 2. Response Time Tests
```python
def test_response_time():
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    start_time = time.time()
    response = requests.get(f'{BASE_URL}/plants', headers=headers)
    end_time = time.time()
    
    assert response.status_code == 200
    assert end_time - start_time < 1.0  # Response within 1 second
```

## Best Practices

1. **Use Test Environment**
   - Always use staging API URL
   - Use test API keys
   - Don't use production data

2. **Test Coverage**
   - Test all endpoints
   - Test success and error cases
   - Test rate limiting
   - Test response times

3. **Test Data Management**
   - Use consistent test data
   - Clean up test data after tests
   - Don't modify production data

4. **Error Handling**
   - Test all error codes
   - Verify error messages
   - Check error details

## Support

For testing support:
1. Check our testing documentation
2. Join our developer community
3. Contact support at support@plantpal.com
4. Report issues on GitHub 