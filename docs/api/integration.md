# API Integration Guide

## Overview
This guide provides detailed examples of integrating the PlantPal API into your applications. We'll cover common use cases and provide code examples in multiple languages.

## Quick Start

### 1. Install Dependencies

#### Python
```bash
pip install requests pillow
```

#### Node.js
```bash
npm install axios form-data
```

#### PHP
```bash
composer require guzzlehttp/guzzle
```

### 2. Basic Configuration

#### Python
```python
import requests

API_KEY = 'your_api_key_here'
BASE_URL = 'https://api.plantpal.com/v1'

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}
```

#### Node.js
```javascript
const axios = require('axios');

const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.plantpal.com/v1';

const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
};
```

#### PHP
```php
<?php

$api_key = 'your_api_key_here';
$base_url = 'https://api.plantpal.com/v1';

$headers = [
    'Authorization: Bearer ' . $api_key,
    'Content-Type: application/json'
];
```

## Common Use Cases

### 1. Plant Disease Detection

#### Python
```python
def detect_plant_disease(image_path):
    with open(image_path, 'rb') as image_file:
        files = {'file': image_file}
        response = requests.post(
            f'{BASE_URL}/plants/detect',
            headers=headers,
            files=files
        )
    
    if response.status_code == 200:
        result = response.json()
        if result['success']:
            return {
                'plant_name': result['data']['plant_name'],
                'disease': result['data']['disease'],
                'confidence': result['data']['confidence'],
                'treatment': result['data']['treatment']
            }
    return None

# Usage
result = detect_plant_disease('path/to/plant_image.jpg')
if result:
    print(f"Plant: {result['plant_name']}")
    print(f"Disease: {result['disease']}")
    print(f"Confidence: {result['confidence']}")
    print("Treatment:", result['treatment']['recommendations'])
```

#### Node.js
```javascript
const FormData = require('form-data');
const fs = require('fs');

async function detectPlantDisease(imagePath) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));
    
    try {
        const response = await axios.post(`${BASE_URL}/plants/detect`, formData, {
            headers: {
                ...headers,
                ...formData.getHeaders()
            }
        });
        
        if (response.data.success) {
            return {
                plantName: response.data.data.plant_name,
                disease: response.data.data.disease,
                confidence: response.data.data.confidence,
                treatment: response.data.data.treatment
            };
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
    return null;
}

// Usage
detectPlantDisease('path/to/plant_image.jpg')
    .then(result => {
        if (result) {
            console.log(`Plant: ${result.plantName}`);
            console.log(`Disease: ${result.disease}`);
            console.log(`Confidence: ${result.confidence}`);
            console.log('Treatment:', result.treatment.recommendations);
        }
    });
```

### 2. Plant Care Schedule

#### Python
```python
def get_care_schedule(plant_id):
    response = requests.get(
        f'{BASE_URL}/plants/{plant_id}/care-schedule',
        headers=headers
    )
    
    if response.status_code == 200:
        result = response.json()
        if result['success']:
            return result['data']
    return None

# Usage
schedule = get_care_schedule('plant_123')
if schedule:
    print(f"Watering: {schedule['watering_frequency']}")
    print(f"Sunlight: {schedule['sunlight']}")
    print(f"Fertilizer: {schedule['fertilizer']}")
    print("Next tasks:", schedule['next_tasks'])
```

#### Node.js
```javascript
async function getCareSchedule(plantId) {
    try {
        const response = await axios.get(
            `${BASE_URL}/plants/${plantId}/care-schedule`,
            { headers }
        );
        
        if (response.data.success) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
    return null;
}

// Usage
getCareSchedule('plant_123')
    .then(schedule => {
        if (schedule) {
            console.log(`Watering: ${schedule.watering_frequency}`);
            console.log(`Sunlight: ${schedule.sunlight}`);
            console.log(`Fertilizer: ${schedule.fertilizer}`);
            console.log('Next tasks:', schedule.next_tasks);
        }
    });
```

### 3. User Profile Management

#### Python
```python
def update_user_profile(user_data):
    response = requests.put(
        f'{BASE_URL}/users/profile',
        headers=headers,
        json=user_data
    )
    
    if response.status_code == 200:
        result = response.json()
        if result['success']:
            return result['data']
    return None

# Usage
profile_data = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'preferences': {
        'notifications': True,
        'language': 'en'
    }
}

updated_profile = update_user_profile(profile_data)
if updated_profile:
    print(f"Profile updated: {updated_profile['name']}")
```

#### Node.js
```javascript
async function updateUserProfile(userData) {
    try {
        const response = await axios.put(
            `${BASE_URL}/users/profile`,
            userData,
            { headers }
        );
        
        if (response.data.success) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
    return null;
}

// Usage
const profileData = {
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
        notifications: true,
        language: 'en'
    }
};

updateUserProfile(profileData)
    .then(updatedProfile => {
        if (updatedProfile) {
            console.log(`Profile updated: ${updatedProfile.name}`);
        }
    });
```

## Advanced Integration Examples

### 1. Batch Processing

#### Python
```python
def process_multiple_images(image_paths):
    results = []
    for image_path in image_paths:
        result = detect_plant_disease(image_path)
        if result:
            results.append({
                'image': image_path,
                'result': result
            })
    return results

# Usage
image_paths = [
    'plant1.jpg',
    'plant2.jpg',
    'plant3.jpg'
]
results = process_multiple_images(image_paths)
for result in results:
    print(f"Image: {result['image']}")
    print(f"Plant: {result['result']['plant_name']}")
    print(f"Disease: {result['result']['disease']}")
    print("---")
```

### 2. Error Handling and Retries

#### Python
```python
import time
from requests.exceptions import RequestException

def api_call_with_retry(func, max_retries=3, delay=1):
    for attempt in range(max_retries):
        try:
            return func()
        except RequestException as e:
            if attempt == max_retries - 1:
                raise e
            time.sleep(delay * (attempt + 1))

# Usage
def get_plant_data(plant_id):
    return requests.get(
        f'{BASE_URL}/plants/{plant_id}',
        headers=headers
    )

try:
    response = api_call_with_retry(lambda: get_plant_data('plant_123'))
    print(response.json())
except RequestException as e:
    print(f"Failed after retries: {e}")
```

### 3. Webhook Integration

#### Python
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    data = request.json
    
    # Verify webhook signature
    signature = request.headers.get('X-PlantPal-Signature')
    if not verify_signature(data, signature):
        return jsonify({'error': 'Invalid signature'}), 401
    
    # Process webhook data
    event_type = data.get('type')
    if event_type == 'plant.disease_detected':
        handle_disease_detection(data)
    elif event_type == 'plant.care_reminder':
        handle_care_reminder(data)
    
    return jsonify({'success': True})

def verify_signature(data, signature):
    # Implement signature verification
    return True

def handle_disease_detection(data):
    # Handle disease detection event
    print(f"Disease detected: {data['plant_name']}")
    print(f"Disease: {data['disease']}")
    print(f"Treatment: {data['treatment']}")

def handle_care_reminder(data):
    # Handle care reminder event
    print(f"Care reminder for: {data['plant_name']}")
    print(f"Task: {data['task']}")
    print(f"Due date: {data['due_date']}")

if __name__ == '__main__':
    app.run(port=5000)
```

## Best Practices

1. **Error Handling**
   - Always check response status codes
   - Implement proper error handling
   - Use retry mechanisms for transient failures

2. **Rate Limiting**
   - Monitor API usage
   - Implement backoff strategies
   - Cache responses when possible

3. **Security**
   - Store API keys securely
   - Use environment variables
   - Implement proper authentication

4. **Performance**
   - Use connection pooling
   - Implement caching
   - Optimize request frequency

## Support

For integration support:
1. Check our documentation
2. Join our developer community
3. Contact support at support@plantpal.com
4. Report issues on GitHub 