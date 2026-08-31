import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient, isSupabaseConfigured } from '@/lib/supabase-admin'

const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''

const GEMINI_MODELS = [
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash-lite',
]

const RUSH_SYSTEM_PROMPT = `You are Rush, Emmanuel Alcazar Jr.'s AI butler and portfolio assistant. You are professional, courteous, and knowledgeable about Emmanuel's work as an AI Automation & ML Developer.

About Emmanuel:
- AI Automation & Machine Learning Developer
- Licensed Electronics Engineer (ECE) & Electronics Technician (ECT)
- GitHub: https://github.com/emmanalcazarjr-ops
- Portfolio: https://portfolio-elalcazarjr.vercel.app
- LinkedIn: https://www.linkedin.com/in/emmanalcazarjr/
- Email: EmmanAlcazarJr@gmail.com

Skills: Python (FastAPI, pandas, NumPy, scikit-learn), TypeScript, Node.js, Next.js, grammY, Tailwind CSS, n8n, Supabase, PostgreSQL, Google Gemini AI, Git, GitHub Actions, Vercel
Projects: Automated Report Generator, Water Station Telegram Bots, Rush Personal AI Assistant, AI Chatbot API, Shared Backend

Guidelines:
- Keep answers crisp, warm, and helpful (1-3 short paragraphs maximum).
- Address the user respectfully (can use "sir" or polite professional tone).
- Emphasize his real-world AI automation and software engineering capabilities.
- Encourage visitors to reach out via the contact form or email (EmmanAlcazarJr@gmail.com).`

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase()
  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('built')) {
    return "Emmanuel has built several notable projects including:\n\n• **Automated Report Generator** (FastAPI + Google Gemini AI)\n• **Water Station Telegram Ordering Bots** (Node.js + grammY + Supabase)\n• **Rush Personal AI Assistant** (@RushDailyBot on Telegram)\n• **AI Chatbot API** with conversation memory\n\nYou can explore all of these right here on his portfolio!"
  }
  if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tech')) {
    return "Emmanuel specializes in AI Automation & ML development with:\n\n• **Languages & Frameworks:** Python (FastAPI, pandas, scikit-learn), TypeScript, Node.js, Next.js, Tailwind CSS\n• **Automation & AI:** n8n, Google Gemini AI, grammY, Supabase, PostgreSQL\n• **Credentials:** Licensed Electronics Engineer (ECE), ECT, and DataCamp Certified Associate AI Engineer."
  }
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
    return "You can reach Emmanuel directly at **EmmanAlcazarJr@gmail.com** or send a message using the Contact section below. He is open to AI automation, ML engineering, and developer opportunities!"
  }
  return "Good day! I am Rush, Emmanuel's AI butler. Emmanuel is an AI Automation & ML Developer and Licensed Electronics Engineer. How can I assist you with his skills, projects, or background today?"
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const userMessage = String(body.message || '').trim()
    const sessionId = String(body.session_id || 'sess_' + Math.random().toString(36).slice(2, 14))

    if (!userMessage) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 })
    }

    // Load history from Supabase if configured
    let history: Array<{ role: string; content: string }> = []
    const client = isSupabaseConfigured() ? getAdminClient() : null

    if (client) {
      try {
        const { data } = await client
          .from('chatbot_messages')
          .select('role, content')
          .eq('session_id', sessionId)
          .order('created_at', { ascending: true })
          .limit(8)
        if (data && Array.isArray(data)) {
          history = data
        }
      } catch {
        // Continue gracefully if database fetch fails
      }
    }

    // Build Gemini contents
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = []
    for (const msg of history) {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })
    }
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    })

    let assistantResponse = ''

    // Call Google Gemini API with fallback models
    if (GEMINI_KEY) {
      for (const model of GEMINI_MODELS) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: RUSH_SYSTEM_PROMPT }],
              },
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          })

          if (!res.ok) continue
          const data = await res.json()
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
          if (text) {
            assistantResponse = text
            break
          }
        } catch {
          continue
        }
      }
    }

    // Graceful fallback if external AI call was unavailable
    if (!assistantResponse) {
      assistantResponse = getFallbackResponse(userMessage)
    }

    // Save to Supabase in background
    if (client) {
      try {
        await client.from('chatbot_messages').insert([
          { session_id: sessionId, role: 'user', content: userMessage },
          { session_id: sessionId, role: 'assistant', content: assistantResponse },
        ])
      } catch {
        // Silently ignore storage errors
      }
    }

    return NextResponse.json({
      response: assistantResponse,
      session_id: sessionId,
      done: true,
    })
  } catch (err) {
    return NextResponse.json({
      response: getFallbackResponse(''),
      session_id: 'fallback',
      done: true,
    })
  }
}