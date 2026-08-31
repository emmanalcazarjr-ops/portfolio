# Building Production AI Agents with n8n, FastAPI & Google Gemini

Most AI demos look impressive in a sandbox until they hit the harsh realities of production: unhandled rate limits (`HTTP 429`), silent token truncation, temporal hallucinations, and flaky external webhooks.

In this deep dive, I break down the architectural blueprint I use to engineer resilient, self-healing **Autonomous AI Agents** combining **n8n workflow orchestration**, **FastAPI microservices**, **Google Gemini 3.7 Flash**, and **Supabase persistent memory**.

---

## 1. The Core Problem: Prompt Chains Are Not Production Systems

A common mistake in AI engineering is relying purely on large language models for deterministic tasks like database lookups, state tracking, and error recovery. 

When you ask an LLM to manage workflow execution directly, you encounter three major vulnerabilities:

1. **State Amnesia:** Serverless compute functions are stateless. Without explicit session grounding, conversational context is lost between request cycles.
2. **Quota & Rate Limit Fragility:** External AI APIs experience intermittent rate-limit spikes and preview tier caps. If your backend doesn't implement a graceful multi-model fallback tree, your entire service halts.
3. **Format Corruption:** Standard Markdown produced by LLMs frequently breaks legacy chat parsers (such as Telegram Markdown) when strings contain unescaped underscores, brackets, or code variables.

To solve this, we separate **Deterministic Orchestration** (handled by n8n and FastAPI) from **Probabilistic Reasoning** (handled by Google Gemini).

---

## 2. The Triad Architecture

Our production agent system decouples concerns across four specialized layers:

```
[ Inbound Trigger ] (Telegram / Webhook / Web App)
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ 1. Ingestion & Validation Layer (FastAPI / Next.js)   │
│    • Real-time Temporal Grounding (Asia/Manila time)   │
│    • Regex & Heuristic Intent Pre-filtering            │
│    • Rate Limiting & Auth Guard                        │
└────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ 2. Workflow Orchestration Engine (n8n)                 │
│    • Multi-step Branching & API Dispatch               │
│    • Webhook Retries & Error Catching                  │
│    • Asynchronous Task Queueing                        │
└────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ 3. Multi-Model AI Engine (Google Gemini 3.7 Flash)     │
│    • Structured JSON Extraction (response_mime_type)   │
│    • Resilient Fallback: 3.7 Flash ➔ 3.6 ➔ 3.5 Lite   │
│    • HTML Message Sanitation Engine                    │
└────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ 4. State & Persistent Memory (Supabase PostgreSQL)    │
│    • Multi-turn Session Indexing                       │
│    • Daily Ledger Aggregations                         │
│    • Audit Logs & Real-Time Client Dispatch            │
└────────────────────────────────────────────────────────┘
```

---

## 3. Key Architectural Decisions

### A. Dynamic Real-Time Temporal Grounding
LLMs do not have an internal clock. Without explicit temporal injection, models hallucinate outdated or random calendar dates.

On every inbound message cycle, our ingestion layer dynamically formats the exact timestamp in the user's localized timezone (`Asia/Manila`) and injects it into the system prompt:

```typescript
function getGroundedSystemPrompt(): string {
  const now = new Date();
  const dateStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);

  return `You are Rush, an autonomous executive AI agent.
Current Real-World Date Today: ${dateStr} (Asia/Manila).
When asked what day or date it is, state this exact grounded reference.`;
}
```

### B. Multi-Model Zero-Downtime Fallback Tree
Rather than binding our application to a single model endpoint, we implement a priority-ordered model cascade:

```typescript
const GEMINI_MODELS = [
  'gemini-3.7-flash',     // Primary high-reasoning engine
  'gemini-3.6-flash',     // High-speed secondary engine
  'gemini-3.5-flash-lite',// High-throughput fallback
];

for (const model of GEMINI_MODELS) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
    if (res.status === 429) continue; // Seamless quota failover
  } catch {
    continue;
  }
}
```

If Google's preview tier triggers `HTTP 429 Resource Exhausted`, the pipeline automatically fails over to `gemini-3.6-flash` within milliseconds, ensuring zero dropped user requests.

### C. Safe Telegram HTML Compilation
To prevent message drops caused by special characters like `snake_case_variables` or unclosed brackets, we compile raw Markdown into safe Telegram HTML tags:

```typescript
function markdownToTelegramHtml(md: string): string {
  let str = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  str = str.replace(/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  str = str.replace(/`([^`]+)`/g, '<code>$1</code>');
  str = str.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  str = str.replace(/(?<!\w)\*([^*\n]+)\*(?!\w)/g, '<i>$1</i>');
  str = str.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');

  return str;
}
```

---

## 4. Real-World Applications Shipped

We applied this architecture across multiple live production systems:

1. **Rush AI Butler (`@RushDailyBot`):** An executive assistant that classifies natural inputs, tracks daily nutrition against an 1,850 kcal cap, triages incoming URLs into structured backlog tasks, and executes scheduled briefings.
2. **Water Station Order Automation:** A dual-bot system where residential customers order water refills by building/unit in Telegram, and operators receive instant one-tap dispatch alerts synced with Supabase.
3. **Automated Report Generator:** An autonomous pipeline that ingests raw CSV spreadsheets, executes statistical aggregation with pandas, and generates executive summaries using Gemini AI in under 3 seconds.

---

## 5. Conclusion & Next Steps

Building production-grade AI systems requires engineering discipline over prompt gimmickry:
- **Use n8n and code for what is deterministic.**
- **Use Google Gemini for what requires reasoning and synthesis.**
- **Use Supabase for state persistence and auditing.**

The future of business automation belongs to robust, multi-agent pipelines that run 24/7 without manual intervention.