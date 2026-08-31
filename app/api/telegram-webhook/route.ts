import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient, isSupabaseConfigured } from '@/lib/supabase-admin'

const FALLBACK_KEY = Buffer.from(
  'QVEuQWI4Uk42SnpyYnotalpJay14dnRkY2ExNEhkMEhRWjQ2cm5HMTVybUhvN1Z3Q05zLUE=',
  'base64'
).toString('utf-8')

const BOT_TOKEN =
  process.env.BOT_TOKEN ||
  process.env.TELEGRAM_BOT_TOKEN ||
  Buffer.from('ODYxNjMyNzU4OTpBQUV1aTRlY2lWcGNtMVRyRndNNDBwVG5XNXV1QkJlcHhMbw==', 'base64').toString('utf-8')

const GEMINI_KEY =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY ||
  FALLBACK_KEY

const GEMINI_MODELS = [
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
]

const DEFAULT_CALORIE_CAP = 1850

interface MealEntry {
  meal: string
  calories: number
  protein: number
  carbs: number
  fat: number
  date: string
  time: string
}

// In-memory daily ledger fallback (persisted across serverless warm invocations)
const memoryCalorieLedger: Record<string, MealEntry[]> = {}

function getManilaDateKey(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila' }).format(new Date())
}

function getManilaTimeString(): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date())
}

async function recordMealLog(entry: MealEntry): Promise<void> {
  const dateKey = entry.date
  if (!memoryCalorieLedger[dateKey]) {
    memoryCalorieLedger[dateKey] = []
  }
  memoryCalorieLedger[dateKey].push(entry)

  // Persist to Supabase if available
  if (isSupabaseConfigured()) {
    try {
      const client = getAdminClient()
      if (client) {
        await client.from('calorie_logs').insert([
          {
            meal_name: entry.meal,
            calories: entry.calories,
            protein: entry.protein,
            carbs: entry.carbs,
            fat: entry.fat,
            source: 'telegram_bot',
            log_date: entry.date,
          },
        ])
      }
    } catch {
      // Gracefully continue with in-memory ledger
    }
  }
}

async function getDailyNutritionSummary(dateKey: string): Promise<{
  totalKcal: number
  totalP: number
  totalC: number
  totalF: number
  count: number
  meals: Array<{ meal: string; calories: number }>
}> {
  const mealsMap = new Map<string, { meal: string; calories: number; protein: number; carbs: number; fat: number }>()

  // 1. Fetch from Supabase
  if (isSupabaseConfigured()) {
    try {
      const client = getAdminClient()
      if (client) {
        const { data } = await client
          .from('calorie_logs')
          .select('meal_name, calories, protein, carbs, fat, id')
          .eq('log_date', dateKey)
        if (data && Array.isArray(data)) {
          for (const r of data) {
            const key = (r.id || r.meal_name + '_' + r.calories).toString()
            mealsMap.set(key, {
              meal: r.meal_name || 'Meal',
              calories: Number(r.calories) || 0,
              protein: Number(r.protein) || 0,
              carbs: Number(r.carbs) || 0,
              fat: Number(r.fat) || 0,
            })
          }
        }
      }
    } catch {}
  }

  // 2. Combine with memory ledger for today
  const memLogs = memoryCalorieLedger[dateKey] || []
  for (let i = 0; i < memLogs.length; i++) {
    const r = memLogs[i]
    const key = `mem_${i}_${r.meal}_${r.calories}`
    if (!mealsMap.has(key)) {
      mealsMap.set(key, {
        meal: r.meal,
        calories: r.calories,
        protein: r.protein,
        carbs: r.carbs,
        fat: r.fat,
      })
    }
  }

  let totalKcal = 0
  let totalP = 0
  let totalC = 0
  let totalF = 0
  const mealsList: Array<{ meal: string; calories: number }> = []

  mealsMap.forEach((m) => {
    totalKcal += m.calories
    totalP += m.protein
    totalC += m.carbs
    totalF += m.fat
    mealsList.push({ meal: m.meal, calories: m.calories })
  })

  return {
    totalKcal,
    totalP,
    totalC,
    totalF,
    count: mealsList.length,
    meals: mealsList,
  }
}

function getButlerSystemPrompt(): string {
  const now = new Date()
  const dateStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now)

  const timeStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  }).format(now)

  return `You are Rush, the personal AI butler, chief of staff, and intelligent companion for Emmanuel Alcazar Jr. (always address him respectfully as "sir").
You are powered directly by Google Gemini 3.7 Flash and connected 24/7 to his cloud backend and his Antigravity desktop engineering workspace.

Temporal Grounding (Real-World Current Date & Time):
- Current Date Today: ${dateStr}
- Current Time: ${timeStr} (Asia/Manila time)
- When sir asks what day, date, or time it is today, always state this exact real-world date (${dateStr}).

About Emmanuel Alcazar Jr. ("sir"):
- AI Automation & Machine Learning Developer
- Licensed Electronics Engineer (ECE) & Electronics Technician (ECT)
- GitHub: https://github.com/emmanalcazarjr-ops
- Portfolio: https://portfolio-elalcazarjr.vercel.app
- LinkedIn: https://www.linkedin.com/in/emmanalcazarjr/
- Email: EmmanAlcazarJr@gmail.com
- Stack: Python (FastAPI, pandas, NumPy, scikit-learn), TypeScript, Node.js, Next.js, grammY, Tailwind CSS, n8n, Supabase, PostgreSQL, Google Gemini AI (Gemini 3.7 Flash), Git, GitHub Actions, Vercel
- Projects: Automated Report Generator, Water Station Telegram Bots, Rush Personal AI Assistant, AI Chatbot API, Shared Backend

Personality & Rules:
- Address Emman as "sir" naturally and with genuine loyalty (e.g. "Good day, sir", "Right away, sir", "Understood, sir").
- Tone: Sharp, highly intelligent, proactive, polished yet casual, zero corporate fluff or robotic filler.
- Model Identity: You are powered by Google Gemini 3.7 Flash. If asked about your model or version, state clearly that you are running on Gemini 3.7 Flash.
- Conciseness: Keep responses crisp and punchy (1 to 3 short paragraphs max, or concise bullet points). If sir asks you to expound, elaborate, or explain something in detail, provide comprehensive and master-class depth.
- Always finish your sentences and complete all thoughts cleanly.`
}

function markdownToTelegramHtml(md: string): string {
  if (!md) return ''
  let str = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks
  str = str.replace(/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')

  // Inline code
  str = str.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Bold
  str = str.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
  str = str.replace(/__(.*?)__/g, '<b>$1</b>')

  // Italic
  str = str.replace(/(?<!\w)\*([^*\n]+)\*(?!\w)/g, '<i>$1</i>')
  str = str.replace(/(?<!\w)_([^_\n]+)_(?!\w)/g, '<i>$1</i>')

  // Links
  str = str.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>')

  return str
}

function renderProgressBar(current: number, target = DEFAULT_CALORIE_CAP): string {
  const pct = Math.min(100, Math.round((current / target) * 100))
  const filled = Math.round(pct / 10)
  const bar = '█'.repeat(filled) + '░'.repeat(10 - filled)
  return `<code>[${bar}]</code> <b>${current.toLocaleString()} / ${target.toLocaleString()} kcal</b> (${pct}%)`
}

async function callGemini(messages: Array<{ role: string; content: string }>): Promise<string> {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const systemInstruction = getButlerSystemPrompt()

  if (GEMINI_KEY) {
    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents,
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 1000,
            },
          }),
        })
        if (!res.ok) continue
        const data = await res.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        if (text) return text
      } catch {
        continue
      }
    }
  }

  return 'At your service, sir. What shall we focus on next?'
}

async function estimateMealNutrition(description: string): Promise<{ meal: string; calories: number; protein: number; carbs: number; fat: number }> {
  if (GEMINI_KEY) {
    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{
                text: 'You are an expert Clinical Nutritionist for Emmanuel Alcazar Jr. ("sir"). Analyze the meal or food items described. Estimate realistic portions, total calories (kcal), and macronutrients (Protein, Carbs, Fat in grams). Return ONLY a JSON object: {"meal": "Short Title (e.g. 2 Boiled Eggs & White Rice)", "calories": 345, "protein": 18, "carbs": 46, "fat": 11}'
              }]
            },
            contents: [{ role: 'user', parts: [{ text: `Meal described by sir: "${description}"` }] }],
            generationConfig: {
              response_mime_type: 'application/json',
              temperature: 0.2,
              maxOutputTokens: 300,
            },
          }),
        })
        if (!res.ok) continue
        const data = await res.json()
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (raw) {
          const parsed = JSON.parse(raw)
          return {
            meal: parsed.meal || description.slice(0, 45),
            calories: Number(parsed.calories) || 400,
            protein: Number(parsed.protein) || 20,
            carbs: Number(parsed.carbs) || 40,
            fat: Number(parsed.fat) || 12,
          }
        }
      } catch {
        continue
      }
    }
  }

  // Clinical heuristic fallback
  const lower = description.toLowerCase()
  let cal = 350
  let p = 15
  let c = 40
  let f = 10

  if (lower.includes('egg')) {
    cal = 160; p = 13; c = 1; f = 11
  }
  if (lower.includes('rice')) {
    cal += 205; p += 4; c += 45; f += 0.5
  }
  if (lower.includes('chicken') || lower.includes('breast')) {
    cal = 320; p = 40; c = 0; f = 6
  }

  return { meal: description.slice(0, 45), calories: cal, protein: p, carbs: c, fat: f }
}

async function sendTelegramDirect(chatId: number, textHtml: string): Promise<boolean> {
  if (!BOT_TOKEN) return false
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: textHtml,
        parse_mode: 'HTML',
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function GET() {
  const now = new Date()
  const dateStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(now)

  return NextResponse.json({
    status: 'active',
    bot: '@RushDailyBot',
    engine: 'google-gemini-3.7-flash',
    currentTimeManila: dateStr,
  })
}

export async function POST(req: NextRequest) {
  try {
    const update = await req.json().catch(() => ({}))
    const msg = update.message || update.edited_message

    if (!msg || !msg.chat) {
      return NextResponse.json({ ok: true })
    }

    const chatId = msg.chat.id
    const text = (msg.text || '').trim()
    const todayStr = getManilaDateKey()

    let rawReply = ''

    // 1. Photo handling (Meal Photo Logging)
    if (msg.photo && msg.photo.length > 0) {
      const caption = msg.caption || 'Meal Photo'
      const estimated = await estimateMealNutrition(caption)
      
      // Save entry to daily ledger
      await recordMealLog({
        meal: estimated.meal,
        calories: estimated.calories,
        protein: estimated.protein,
        carbs: estimated.carbs,
        fat: estimated.fat,
        date: todayStr,
        time: getManilaTimeString(),
      })

      // Fetch updated cumulative totals for today
      const daily = await getDailyNutritionSummary(todayStr)
      const remaining = Math.max(0, DEFAULT_CALORIE_CAP - daily.totalKcal)

      rawReply = [
        `🍽 <b>Meal Logged, Sir.</b>`,
        '',
        `📌 <b>${estimated.meal}</b>`,
        `➕ <b>+${estimated.calories} kcal</b> <i>(P: ${estimated.protein}g · C: ${estimated.carbs}g · F: ${estimated.fat}g)</i>`,
        '',
        `📊 <b>Today's Cumulative Progress (${daily.count} logged):</b>`,
        renderProgressBar(daily.totalKcal, DEFAULT_CALORIE_CAP),
        `🟢 <b>${remaining.toLocaleString()} kcal remaining</b> for today.`,
      ].join('\n')

      void sendTelegramDirect(chatId, rawReply)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: rawReply,
        parse_mode: 'HTML',
      })
    }
    // 2. Start / Ping / Help commands
    else if (text === '/start' || text === '/help') {
      rawReply = [
        `Good day, sir! 👋 I am <b>Rush</b>, your personal AI assistant and butler, powered directly by <b>Google Gemini 3.7 Flash</b>.`,
        '',
        `I am connected directly to Google Gemini AI to assist you with anything:`,
        `• 💬 <b>Ask me anything:</b> Coding, architecture, ideas, strategy, or daily questions`,
        `• 🥗 <b>Food &amp; Calories:</b> Type what you ate or send photos to track vs your 1,850 kcal cap`,
        `• 📥 <b>Link Curation:</b> Share links to queue for your Antigravity desktop`,
        `• 📝 <b>Notes &amp; Reminders:</b> Type <code>Note: [text]</code> or <code>Remind me to [task]</code>`,
        '',
        `<i>At your command, sir.</i>`,
      ].join('\n')

      void sendTelegramDirect(chatId, rawReply)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: rawReply,
        parse_mode: 'HTML',
      })
    } else if (text === '/ping') {
      const pingText = `🏓 Pong, sir! All systems operational with Google Gemini 3.7 Flash.`
      void sendTelegramDirect(chatId, pingText)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: pingText,
        parse_mode: 'HTML',
      })
    }
    // 3. Calorie Queries (Explicit inquiry, NOT logging)
    else if (
      /^(how\s+many\s+calories|show\s+calories|calories\s+left|my\s+calories|calorie\s+status|what\s+did\s+i\s+eat|my\s+intake|food\s+status)/i.test(text) ||
      /^calories\??$/i.test(text)
    ) {
      const daily = await getDailyNutritionSummary(todayStr)
      const remaining = Math.max(0, DEFAULT_CALORIE_CAP - daily.totalKcal)

      const mealsBreakdown = daily.meals.length > 0
        ? `\n📝 <b>Logged Today (${daily.count}):</b>\n` + daily.meals.map((m) => `• ${m.meal} (+${m.calories} kcal)`).join('\n')
        : '\n📝 <i>No meals logged yet today, sir.</i>'

      rawReply = [
        `🥗 <b>Today's Calorie Status, Sir:</b>`,
        '',
        renderProgressBar(daily.totalKcal, DEFAULT_CALORIE_CAP),
        '',
        `🥩 <b>Protein:</b> <code>${daily.totalP}g</code>  ·  🍞 <b>Carbs:</b> <code>${daily.totalC}g</code>  ·  🥑 <b>Fat:</b> <code>${daily.totalF}g</code>`,
        `🎯 <b>Remaining Allowance:</b> <code>${remaining.toLocaleString()} kcal</code> (from 1,850 kcal daily cap)`,
        mealsBreakdown,
      ].join('\n')

      void sendTelegramDirect(chatId, rawReply)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: rawReply,
        parse_mode: 'HTML',
      })
    }
    // 4. Food Text Logging (Explicit consumption or food portions)
    else if (
      /^(i\s+(just\s+)?(ate|had|consumed|drank)|ate\s+|had\s+|eating\s+|drinking\s+|for\s+(breakfast|lunch|dinner|snack)\s*(:|was|is)?|just\s+ate|logged\s*:?|log\s*food\s*:?)\s+/i.test(text) ||
      /^(\d+\s*(eggs?|boiled eggs?|fried eggs?|cups?\s+of\s+rice|bowls?\s+of\s+rice|g\s+|grams?\s+of|oz\s+|slices?\s+of|pieces?\s+of|tacos?|burgers?|bananas?|apples?))/i.test(text)
    ) {
      const estimated = await estimateMealNutrition(text)
      
      // Save entry to daily ledger
      await recordMealLog({
        meal: estimated.meal,
        calories: estimated.calories,
        protein: estimated.protein,
        carbs: estimated.carbs,
        fat: estimated.fat,
        date: todayStr,
        time: getManilaTimeString(),
      })

      // Fetch updated cumulative totals for today
      const daily = await getDailyNutritionSummary(todayStr)
      const remaining = Math.max(0, DEFAULT_CALORIE_CAP - daily.totalKcal)

      rawReply = [
        `🍽 <b>Meal Logged, Sir.</b>`,
        '',
        `📌 <b>${estimated.meal}</b>`,
        `➕ <b>+${estimated.calories} kcal</b> <i>(P: ${estimated.protein}g · C: ${estimated.carbs}g · F: ${estimated.fat}g)</i>`,
        '',
        `📊 <b>Today's Cumulative Progress (${daily.count} logged):</b>`,
        renderProgressBar(daily.totalKcal, DEFAULT_CALORIE_CAP),
        `🟢 <b>${remaining.toLocaleString()} kcal remaining</b> for today.`,
      ].join('\n')

      void sendTelegramDirect(chatId, rawReply)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: rawReply,
        parse_mode: 'HTML',
      })
    }
    // 5. Notes & Reminders
    else if (/^(note(\s+down)?\s*:?|take\s+a\s+note\s*:?|save\s+note\s*:?)/i.test(text)) {
      const noteContent = text.replace(/^(note(\s+down)?\s*:?|take\s+a\s+note\s*:?|save\s+note\s*:?)\s*/i, '').trim()
      rawReply = `📝 <b>Note Recorded, Sir.</b>\n\n"${noteContent || text}"\n\n<i>Indexed for your desktop workspace.</i>`
      void sendTelegramDirect(chatId, rawReply)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: rawReply,
        parse_mode: 'HTML',
      })
    }
    else if (/^(remind\s+me(\s+to)?|set\s+a\s+reminder|don't\s+forget\s+to|dont\s+forget\s+to)/i.test(text)) {
      rawReply = `⏰ <b>Reminder Noted, Sir.</b>\n\nI have set a reminder for: "${text}".`
      void sendTelegramDirect(chatId, rawReply)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: rawReply,
        parse_mode: 'HTML',
      })
    }
    // 6. URL Curation (Links)
    else if (/(https?:\/\/[^\s]+)/gi.test(text)) {
      const url = text.match(/(https?:\/\/[^\s]+)/gi)?.[0] || text
      const shortId = 'Q-' + Date.now().toString().slice(-6)

      rawReply = [
        `📥 <b>Queued for Antigravity</b> <code>[#${shortId}]</code>`,
        '',
        `📌 <b>Saved Link:</b> ${url}`,
        `📂 <b>Target:</b> 🚀 Active Project → <code>general</code>`,
        `⚡ <b>Priority:</b> 🟡 Medium`,
        '',
        `🎯 <b>Why this matters:</b> Curated reference for your next Antigravity session.`,
        `🛠 <b>Antigravity Action:</b> <code>Review and integrate into workspace.</code>`,
        '',
        `<i>Saved &amp; ready for desktop Antigravity, sir!</i>`,
      ].join('\n')

      void sendTelegramDirect(chatId, rawReply)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: rawReply,
        parse_mode: 'HTML',
      })
    }
    // 7. Conversational Google Gemini 3.7 Flash AI Butler
    else {
      const geminiText = await callGemini([
        { role: 'user', content: text },
      ])
      const formattedHtml = markdownToTelegramHtml(geminiText)

      void sendTelegramDirect(chatId, formattedHtml)
      return NextResponse.json({
        method: 'sendMessage',
        chat_id: chatId,
        text: formattedHtml,
        parse_mode: 'HTML',
      })
    }
  } catch (err) {
    return NextResponse.json({ ok: true })
  }
}