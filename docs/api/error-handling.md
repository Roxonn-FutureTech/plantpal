# Error Handling Guide

## Overview
This guide explains how to handle errors in the PlantPal API. All API responses follow a consistent error format to help you identify and handle issues effectively.

## Error Response Format

All error responses follow this structure:

```json
{
    "success": false,
    "error": {
        "code": "ERROR_CODE",
        "message": "Human readable error message",
        "details": {
            // Additional error details specific to the error type
        }
    }
}
```

## Common Error Codes

### Authentication Errors (1xx)

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `AUTH_INVALID_CREDENTIALS` | Invalid email or password | 401 |
| `AUTH_TOKEN_EXPIRED` | Access token has expired | 401 |
| `AUTH_INVALID_TOKEN` | Invalid or malformed token | 401 |
| `AUTH_MISSING_TOKEN` | No token provided | 401 |
| `AUTH_INSUFFICIENT_PERMISSIONS` | User lacks required permissions | 403 |

### Validation Errors (2xx)

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `VALIDATION_REQUIRED_FIELD` | Required field is missing | 400 |
| `VALIDATION_INVALID_FORMAT` | Field format is invalid | 400 |
| `VALIDATION_INVALID_VALUE` | Field value is invalid | 400 |
| `VALIDATION_FILE_TOO_LARGE` | Uploaded file exceeds size limit | 400 |
| `VALIDATION_INVALID_FILE_TYPE` | Invalid file type | 400 |

### Resource Errors (3xx)

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `RESOURCE_NOT_FOUND` | Requested resource not found | 404 |
| `RESOURCE_ALREADY_EXISTS` | Resource already exists | 409 |
| `RESOURCE_LOCKED` | Resource is locked | 423 |
| `RESOURCE_DELETED` | Resource has been deleted | 410 |

### Rate Limit Errors (4xx)

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `RATE_LIMIT_RESET` | Rate limit reset time | 429 |

### Server Errors (5xx)

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `SERVER_ERROR` | Internal server error | 500 |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable | 503 |
| `GATEWAY_TIMEOUT` | Gateway timeout | 504 |

## Error Handling Examples

### 1. Authentication Error
```json
{
    "success": false,
    "error": {
        "code": "AUTH_INVALID_CREDENTIALS",
        "message": "Invalid email or password",
        "details": {
            "attempts_remaining": 4
        }
    }
}
```

### 2. Validation Error
```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_INVALID_FORMAT",
        "message": "Invalid input format",
        "details": {
            "field": "email",
            "expected": "valid email address",
            "received": "invalid-email"
        }
    }
}
```

### 3. Resource Error
```json
{
    "success": false,
    "error": {
        "code": "RESOURCE_NOT_FOUND",
        "message": "Plant not found",
        "details": {
            "plant_id": "123",
            "suggestion": "Check if the plant ID is correct"
        }
    }
}
```

## Best Practices

1. **Always Check Success Flag**
   ```javascript
   if (!response.success) {
       // Handle error
   }
   ```

2. **Handle Specific Error Codes**
   ```javascript
   switch (error.code) {
       case 'AUTH_TOKEN_EXPIRED':
           // Refresh token
           break;
       case 'RATE_LIMIT_EXCEEDED':
           // Implement backoff
           break;
       default:
           // Handle unknown errors
   }
   ```

3. **Implement Retry Logic**
   ```javascript
   const maxRetries = 3;
   let retryCount = 0;

   while (retryCount < maxRetries) {
       try {
           const response = await apiCall();
           if (response.success) break;
           
           if (response.error.code === 'RATE_LIMIT_EXCEEDED') {
               retryCount++;
               await delay(1000 * retryCount);
               continue;
           }
           
           throw new Error(response.error.message);
       } catch (error) {
           if (retryCount === maxRetries) throw error;
           retryCount++;
       }
   }
   ```

4. **Log Errors Appropriately**
   ```javascript
   function handleError(error) {
       console.error({
           code: error.code,
           message: error.message,
           details: error.details,
           timestamp: new Date().toISOString()
       });
   }
   ```

## Rate Limiting

When you receive a rate limit error:

1. Check the `Retry-After` header
2. Implement exponential backoff
3. Monitor your rate limit usage

Example response with rate limit headers:
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1617123456
```

## Support

If you encounter unexpected errors:

1. Check the error code and message
2. Review the error details
3. Check our status page: https://status.plantpal.com
4. Contact support with:
   - Error code
   - Error message
   - Request details
   - Timestamp
   - Your API key (masked) 