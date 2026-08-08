# Building Rush AI Butler: An AI-Powered Portfolio Assistant

Rush AI Butler is a conversational AI assistant built to answer questions about my projects, skills, and experience — like a 24/7 front desk for my portfolio. In this article, I walk through why I built it, how it works, and the engineering decisions that made it production-ready.

## Why I Built It

Recruiters and clients visit a portfolio and usually have the same questions: *"What do you know how to do?"*, *"What have you shipped?"*, *"How do your skills map to this role?"*. I wanted an always-on assistant that could answer those questions conversationally, without me responding manually.

The goal was a chatbot that could:

- Answer questions about my projects, skills, and experience
- Keep context across a conversation (session memory)
- Integrate with automation platforms like n8n, Zapier, and Make
- Authenticate API access and resist abuse

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Python 3.12 |
| Framework | FastAPI |
| AI Model | DeepSeek AI (`deepseek-chat`) |
| Database | Neon PostgreSQL |
| Deployment | Vercel Serverless Functions |
| Docs | Auto-generated Swagger UI |

## Architecture

Rush is a serverless FastAPI application with a thin shared layer for its cross-cutting concerns:

```
api/
  main.py            # FastAPI app + routes
shared/
  deepseek.py        # DeepSeek AI integration
  database.py        # PostgreSQL connection + schema helpers
  auth.py            # API key authentication
  rate_limit.py      # Per-client rate limiting
  webhooks.py        # Webhook registration + dispatch
public/
  index.html         # Landing page with live chat demo
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send a message to Rush |
| GET | `/api/chat/history/{session_id}` | Get conversation history |
| DELETE | `/api/chat/{session_id}` | Clear a conversation |
| POST | `/api/webhook` | Register a webhook for events |
| GET | `/api/health` | Health check |
| GET | `/docs` | Interactive Swagger UI |

A chat request looks like this:

```bash
curl -X POST https://chatbot-api-two-teal.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{"message": "Tell me about Emmanuel's projects", "session_id": "optional-session-id"}'
```

## Conversation Memory

Each conversation is identified by a `session_id`. When a message arrives, Rush:

1. Loads the recent history for that session from PostgreSQL
2. Builds a prompt that includes the conversation context plus the new message
3. Calls DeepSeek AI and returns the response
4. Persists the exchange so follow-up questions keep their context

This turns a stateless API call into a coherent conversation.

## Webhook Support

Rush can receive messages from automation platforms. A registered webhook lets external tools push conversations into the assistant — useful for connecting a chat widget, an n8n workflow, or a CRM like GoHighLevel. Webhooks are validated and dispatched to the right handler.

## Authentication & Rate Limiting

Two production concerns that often get skipped in demo chatbots:

- **API key authentication** (`X-API-Key`) protects the chat and webhook endpoints from anonymous abuse
- **Rate limiting** caps requests per client so one caller can't flood the model

Both are handled in the shared layer so every route stays thin.

## Deployment on Vercel Serverless

The API runs as Vercel serverless functions with `vercel.json` mapping the routes. FastAPI apps map naturally onto serverless: each function boots, handles the request, and scales to zero. The PostgreSQL database lives outside the function (Neon), so connection state isn't lost between cold starts.

## What I Learned

- **Keep the model integration isolated.** Wrapping DeepSeek behind a small module made it trivial to swap providers or add caching later.
- **Session memory is the feature that makes a chatbot feel useful.** Persisted history beats stateless Q&A by a wide margin.
- **Auth + rate limiting belong in middleware-ish helpers**, not copy-pasted into every route.
- **Swagger UI is free credibility.** Auto-generated docs at `/docs` make the API immediately understandable.

## Try It

- Live API: https://chatbot-api-two-teal.vercel.app
- Swagger Docs: https://chatbot-api-two-teal.vercel.app/docs
- Source: https://github.com/emmanalcazarjr-ops/chatbot-api

Rush is a small example of something I care a lot about: AI systems that are built to be deployed, secured, and maintained — not just demos that work on a laptop.

---

*Emmanuel L. Alcazar Jr. — Electronics Engineer, Software Engineer, AI/ML Developer.*
