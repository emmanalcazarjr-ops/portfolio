# Implementing RAG with TF-IDF and DeepSeek AI

*July 2026 · 10 min read*

## Introduction

Retrieval-Augmented Generation (RAG) is a powerful technique that combines the strengths of traditional information retrieval with modern large language models (LLMs). In this article, I'll explain how I built a production-ready RAG system using TF-IDF vectorization and DeepSeek AI.

## What is RAG?

RAG stands for Retrieval-Augmented Generation. It's a technique that:

1. **Retrieves** relevant documents from a knowledge base
2. **Augments** the LLM prompt with retrieved context
3. **Generates** a response grounded in factual information

This approach solves a key problem with LLMs: they can hallucinate or provide outdated information. By grounding responses in retrieved documents, RAG ensures accuracy and relevance.

## Architecture Overview

My RAG system consists of three components:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Document      │     │   TF-IDF        │     │   DeepSeek AI   │
│   Store         │────▶│   Vector Search │────▶│   Generation    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 1. Document Store

Documents are stored as text files and indexed at startup:

```python
documents = [
    {
        "id": "doc1",
        "title": "Machine Learning Basics",
        "content": "Machine learning is a subset of artificial intelligence..."
    },
    {
        "id": "doc2", 
        "title": "Neural Networks",
        "content": "Neural networks are computing systems inspired by..."
    }
]
```

### 2. TF-IDF Vector Search

TF-IDF (Term Frequency-Inverse Document Frequency) is a classic text representation technique:

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Create TF-IDF vectors
vectorizer = TfidfVectorizer(max_features=10000, stop_words='english')
tfidf_matrix = vectorizer.fit_transform([doc['content'] for doc in documents])

# Search for similar documents
query_vector = vectorizer.transform([query])
similarities = cosine_similarity(query_vector, tfidf_matrix)
top_indices = similarities.argsort()[0][-5:][::-1]  # Top 5
```

### 3. DeepSeek AI Generation

The retrieved documents are used as context for the LLM:

```python
system_prompt = """You are a helpful assistant. Answer questions based on the provided context.
If the context doesn't contain relevant information, say so."""

context = "\n\n".join([f"Document: {doc['title']}\n{doc['content']}" 
                       for doc in retrieved_docs])

messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"}
]

response = call_deepseek(messages)
```

## Implementation Details

### Document Chunking

Long documents need to be split into smaller chunks for better retrieval:

```python
def chunk_document(text, chunk_size=500, overlap=50):
    chunks = []
    words = text.split()
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks
```

### TF-IDF Optimization

Key parameters for TF-IDF:

```python
vectorizer = TfidfVectorizer(
    max_features=10000,      # Vocabulary size
    ngram_range=(1, 2),      # Unigrams and bigrams
    stop_words='english',    # Remove common words
    min_df=2,                # Minimum document frequency
    max_df=0.95              # Maximum document frequency
)
```

### Cosine Similarity

Cosine similarity measures the angle between two vectors:

```python
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
```

## API Design

The API accepts a query and returns relevant documents with AI-generated answers:

```json
{
  "query": "What is machine learning?",
  "max_results": 5
}
```

Response:

```json
{
  "answer": "Machine learning is a subset of artificial intelligence...",
  "sources": [
    {
      "title": "Machine Learning Basics",
      "relevance_score": 0.85,
      "excerpt": "Machine learning is a subset of artificial intelligence..."
    }
  ],
  "query": "What is machine learning?"
}
```

## Performance Considerations

### 1. Indexing Speed

TF-IDF vectorization is fast. For 1000 documents:
- Indexing: ~2 seconds
- Search: ~10ms

### 2. Memory Usage

TF-IDF matrices are sparse, so memory usage is manageable:
- 1000 documents: ~50MB
- 10,000 documents: ~500MB

### 3. Accuracy

TF-IDF works well for keyword-based retrieval. For semantic search, consider using:
- Sentence transformers
- FAISS for vector search
- Hybrid approaches (TF-IDF + embeddings)

## Comparison with Other Approaches

| Approach | Pros | Cons |
|----------|------|------|
| TF-IDF | Fast, simple, no GPU required | Limited semantic understanding |
| Dense Embeddings | Better semantic search | Requires GPU, slower |
| Hybrid | Best of both worlds | More complex |

## Try It Live

Test the RAG API at [rag-qa-api.vercel.app](https://rag-qa-api.vercel.app).

```bash
curl -X POST https://rag-qa-api.vercel.app/api \
  -H "Content-Type: application/json" \
  -d '{"query": "What is machine learning?", "max_results": 5}'
```

## Future Improvements

1. **Dense Retrieval**: Replace TF-IDF with sentence transformers
2. **Re-ranking**: Use cross-encoders for better ranking
3. **Caching**: Cache frequent queries
4. **Streaming**: Stream responses for better UX

## Conclusion

RAG is a powerful technique that combines the best of traditional IR and modern LLMs. TF-IDF is a solid starting point for retrieval, especially when you need fast, interpretable results. For production systems, consider hybrid approaches that combine TF-IDF with dense embeddings.

---

*Tags: RAG, NLP, DeepSeek AI, TF-IDF, Machine Learning*
