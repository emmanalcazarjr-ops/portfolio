# Deploying ML Models on Vercel Serverless

*July 2026 · 6 min read*

## Introduction

Deploying machine learning models as serverless functions is a cost-effective way to serve predictions without managing infrastructure. In this article, I'll share lessons learned from deploying scikit-learn models on Vercel, including cold start optimization and model serialization.

## Why Serverless ML?

Traditional ML deployment requires:
- Server management
- Scaling configuration
- Cost monitoring
- High availability setup

Serverless deployment offers:
- **Zero infrastructure management**: Vercel handles everything
- **Pay-per-request pricing**: Only pay for actual usage
- **Automatic scaling**: Handles traffic spikes automatically
- **Global distribution**: Deploy to edge locations worldwide

## Challenges of Serverless ML

### 1. Cold Starts

The first request after deployment takes longer because the model needs to load:

```
First request:  2-3 seconds (cold start)
Subsequent:     50-100ms (warm)
```

### 2. Model Size

Vercel has a 50MB limit for serverless functions. Keep your model under 1MB for best results.

### 3. Dependencies

Large dependencies (TensorFlow, PyTorch) can cause deployment issues. Use lightweight alternatives when possible.

## Model Serialization

### joblib (Recommended for scikit-learn)

```python
import joblib

# Save model
joblib.dump(model, 'model.joblib')

# Load model
model = joblib.load('model.joblib')
```

### pickle (Alternative)

```python
import pickle

# Save model
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Load model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
```

### Comparison

| Format | Pros | Cons |
|--------|------|------|
| joblib | Efficient for large arrays, Handles circular references | scikit-learn specific |
| pickle | Universal, Standard library | Less efficient for numpy |

## Vercel Configuration

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python",
      "config": {
        "includeFiles": "models/**"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.py"
    }
  ]
}
```

Key points:
- `includeFiles`: Tells Vercel to include the model files in the deployment
- `@vercel/python`: Uses Python runtime for serverless functions

### requirements.txt

```
numpy>=1.24.0
scikit-learn>=1.3.0
joblib>=1.3.0
```

Keep dependencies minimal to reduce cold start time.

## Cold Start Optimization

### 1. Global Model Loading

Load the model once at module level, not per request:

```python
import joblib

# Load once at module level
model = joblib.load('models/model.joblib')

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Use the pre-loaded model
        prediction = model.predict(features)
```

### 2. Smaller Models

Use fewer estimators or shallower trees:

```python
model = RandomForestClassifier(
    n_estimators=50,    # Instead of 100
    max_depth=8,        # Instead of 10
    n_jobs=-1
)
```

### 3. Model Quantization

Reduce model size by removing unnecessary precision:

```python
import numpy as np

# Convert float64 to float32
model_data = {k: v.astype(np.float32) if isinstance(v, np.ndarray) else v 
              for k, v in model.__dict__.items()}
```

## API Implementation

### Basic Structure

```python
from http.server import BaseHTTPRequestHandler
import json
import joblib
import numpy as np

model = joblib.load('models/model.joblib')

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Parse request
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        # Extract features
        features = np.array([[
            data['amount'],
            data['num_transactions_24h'],
            data['distance_from_home'],
            data['is_foreign'],
            data['is_online']
        ]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]
        
        # Return response
        response = {
            'prediction': int(prediction),
            'probability': float(probability)
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())
```

### Error Handling

Always include error handling:

```python
try:
    prediction = model.predict(features)
except Exception as e:
    self.send_response(500)
    self.send_header('Content-type', 'application/json')
    self.end_headers()
    error = {'error': str(e)}
    self.wfile.write(json.dumps(error).encode())
```

## Deployment Checklist

1. **Model size**: Under 1MB
2. **Dependencies**: Minimal requirements.txt
3. **Global loading**: Load model at module level
4. **Error handling**: Handle invalid inputs
5. **CORS headers**: Enable cross-origin requests
6. **Testing**: Test locally before deploying

## Monitoring

Vercel provides built-in monitoring:
- **Function logs**: View in Vercel dashboard
- **Analytics**: Track request volume and latency
- **Alerts**: Set up error notifications

## Cost Considerations

Vercel pricing for serverless functions:
- **Free tier**: 100GB-hours/month
- **Pro tier**: 1000GB-hours/month
- **Enterprise**: Custom pricing

For ML APIs with low traffic, the free tier is usually sufficient.

## Alternative Platforms

| Platform | Pros | Cons |
|----------|------|------|
| Vercel | Easy setup, Great DX | Python support limited |
| AWS Lambda | Mature, Flexible | Complex configuration |
| Google Cloud Functions | Good ML integration | Vendor lock-in |
| Railway | Simple, Docker support | More expensive |

## Conclusion

Deploying ML models on Vercel is a great option for prototyping and small-scale production. The key challenges are cold starts and model size, but these can be optimized with careful model selection and serialization.

For production workloads with high traffic, consider dedicated ML serving platforms like:
- TensorFlow Serving
- TorchServe
- BentoML
- Seldon

---

*Tags: DevOps, Vercel, Serverless, Machine Learning, Deployment*
