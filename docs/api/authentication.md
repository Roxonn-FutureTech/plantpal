# Authentication Guide

## Overview
PlantPal API uses JWT (JSON Web Tokens) for authentication. This guide explains how to authenticate your requests and manage your API keys.

## Getting Started

### 1. Obtain API Keys
1. Sign up for a PlantPal account at https://plantpal.com/signup
2. Navigate to your dashboard
3. Go to Settings > API Keys
4. Click "Generate New API Key"
5. Save your API key securely - it won't be shown again

### 2. Using Your API Key
Include your API key in the Authorization header of all requests:

```http
Authorization: Bearer your_api_key_here
```

## Authentication Flow

### 1. Initial Authentication
```http
POST /auth/login
Content-Type: application/json

{
    "email": "your@email.com",
    "password": "your_password"
}
```

Response:
```json
{
    "success": true,
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIs...",
        "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
        "expires_in": 3600
    }
}
```

### 2. Token Refresh
When your access token expires, use the refresh token to get a new one:

```http
POST /auth/refresh
Content-Type: application/json

{
    "refresh_token": "your_refresh_token"
}
```

Response:
```json
{
    "success": true,
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIs...",
        "expires_in": 3600
    }
}
```

## Security Best Practices

1. **Never share your API keys**
   - Keep your API keys secure
   - Don't commit them to version control
   - Use environment variables

2. **Rotate keys regularly**
   - Generate new keys every 90 days
   - Revoke old keys immediately

3. **Use HTTPS**
   - All API requests must use HTTPS
   - Never send API keys over HTTP

4. **Implement rate limiting**
   - Monitor your API usage
   - Stay within rate limits

## Error Handling

### Common Authentication Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `AUTH_INVALID_CREDENTIALS` | Invalid email or password | Check your credentials |
| `AUTH_TOKEN_EXPIRED` | Access token has expired | Use refresh token to get new access token |
| `AUTH_INVALID_TOKEN` | Invalid or malformed token | Check token format |
| `AUTH_MISSING_TOKEN` | No token provided | Add Authorization header |

Example error response:
```json
{
    "success": false,
    "error": {
        "code": "AUTH_INVALID_CREDENTIALS",
        "message": "Invalid email or password",
        "details": {}
    }
}
```

## Code Examples

### Python
```python
import requests

API_KEY = 'your_api_key_here'
BASE_URL = 'https://api.plantpal.com/v1'

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

# Example API call
response = requests.get(f'{BASE_URL}/plants/detect', headers=headers)
```

### JavaScript
```javascript
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.plantpal.com/v1';

const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
};

// Example API call
fetch(`${BASE_URL}/plants/detect`, {
    headers: headers
})
.then(response => response.json())
.then(data => console.log(data));
```

## Rate Limits

| Plan | Requests per minute | Requests per day |
|------|-------------------|-----------------|
| Free | 60 | 1,000 |
| Pro | 300 | 50,000 |
| Enterprise | Custom | Custom |

## Support

If you encounter any authentication issues:
1. Check the error message and code
2. Verify your API key is correct
3. Ensure you're using HTTPS
4. Contact support at support@plantpal.com 