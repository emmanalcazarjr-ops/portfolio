# Building a Fraud Detection System with scikit-learn

*July 2026 · 8 min read*

## Introduction

Fraud detection is one of the most practical applications of machine learning in the financial industry. In this article, I'll walk you through how I built a real-time fraud detection API using scikit-learn's Random Forest classifier, achieving 98.6% accuracy on synthetic transaction data.

## The Problem

Financial institutions process millions of transactions daily. Identifying fraudulent transactions in real-time is critical to preventing financial losses. Traditional rule-based systems are brittle and can't adapt to new fraud patterns. Machine learning offers a more robust solution.

## Data Generation

Since real fraud datasets are heavily regulated and difficult to obtain, I created a synthetic dataset that mimics real-world fraud patterns:

```python
import numpy as np

np.random.seed(42)
n_samples = 5000

# Generate features
amount = np.random.exponential(200, n_samples)
num_transactions_24h = np.random.poisson(3, n_samples)
distance_from_home = np.random.exponential(30, n_samples)
is_foreign = np.random.binomial(1, 0.1, n_samples)
is_online = np.random.binomial(1, 0.3, n_samples)
```

The key insight is that fraud patterns are often correlated with specific feature combinations. For example:
- High transaction amounts
- Multiple transactions in a short time
- Transactions far from home
- Foreign transactions
- Online transactions

## Model Selection

I chose Random Forest for several reasons:

1. **Interpretability**: Easy to understand feature importance
2. **Robustness**: Handles outliers well
3. **Performance**: Fast training and inference
4. **No scaling required**: Works with raw features

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)
```

## Training and Evaluation

The model achieved impressive results:

- **Accuracy**: 98.6%
- **Precision (Fraud)**: 73%
- **Recall (Fraud)**: 73%
- **F1-Score (Fraud)**: 73%

The lower precision/recall for fraud cases is expected due to class imbalance (only 3.2% fraud rate). In production, you'd use techniques like SMOTE or class weighting to improve this.

## Deployment on Vercel

The biggest challenge was deploying a scikit-learn model as a serverless function. Here's how I solved it:

### Model Serialization

```python
import joblib

# Save model
joblib.dump(model, 'models/fraud_model.joblib')
```

### Vercel Configuration

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
  ]
}
```

### API Implementation

```python
import joblib
import numpy as np

model = joblib.load('models/fraud_model.joblib')

features = np.array([[amount, num_transactions_24h, 
                       distance_from_home, is_foreign, is_online]])

fraud_probability = model.predict_proba(features)[0][1]
```

## Key Learnings

1. **Cold starts**: The first request after deployment takes ~2-3 seconds to load the model. Subsequent requests are fast (~50ms).

2. **Model size**: Keep your model under 1MB for Vercel deployment. My Random Forest model is ~985KB.

3. **Feature engineering**: Simple features work well for fraud detection. Don't over-engineer.

4. **Class imbalance**: Real-world fraud datasets are highly imbalanced. Consider using `class_weight='balanced'` in production.

## Try It Live

You can test the fraud detection API at [fraud-api-ten.vercel.app](https://fraud-api-ten.vercel.app).

```bash
curl -X POST https://fraud-api-ten.vercel.app/api \
  -H "Content-Type: application/json" \
  -d '{"amount": 1500, "num_transactions_24h": 8, "distance_from_home": 150, "is_foreign": 1, "is_online": 0}'
```

## Conclusion

Building a fraud detection system with scikit-learn is straightforward. The real challenge is deploying it as a production-ready API. Vercel's serverless functions make this possible, but you need to be mindful of model size and cold start times.

---

*Tags: Machine Learning, Python, scikit-learn, Fraud Detection, Vercel*
