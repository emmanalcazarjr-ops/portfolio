// AI News Agent
// Fetches the 5 most significant recent AI/ML stories from Hacker News (Algolia API)
// and Google News RSS, dedupes them, and writes app/data/ai-news.json.
// Runs daily via GitHub Actions (.github/workflows/ai-news.yml).

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'app', 'data', 'ai-news.json')

const HN_TOPICS = ['AI', 'LLM', 'artificial intelligence', 'machine learning', 'AI agents', 'deep learning', 'OpenAI']

const GNEWS_URL =
  'https://news.google.com/rss/search?q=' +
  encodeURIComponent('artificial intelligence OR machine learning OR AI') +
  '&hl=en-US&gl=US&ceid=US:en'

const MAX_AGE_HOURS = 7 * 24 // only stories from the last 7 days
const TARGET = 5

const stripHtml = (s = '') =>
  s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()

const decodeEntities = (s = '') =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))

const cleanText = (s = '') => decodeEntities(s).replace(/[\uFFFD]/g, "'")

const cleanSummary = (s = '') => stripHtml(cleanText(s)).slice(0, 180)

const dedupeKey = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

async function fetchHN() {
  const now = Date.now()
  const since = Math.floor(now / 1000) - MAX_AGE_HOURS * 3600
  const results = []

  for (const topic of HN_TOPICS) {
    const url =
      'https://hn.algolia.com/api/v1/search?query=' +
      encodeURIComponent(topic) +
      '&tags=story&hitsPerPage=20&numericFilters=created_at_i>' +
      since
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 portfolio-news-agent' } })
      if (!res.ok) continue
      const data = await res.json()
      for (const h of data.hits || []) {
        if (!h.title || !h.points) continue
        const created = h.created_at ? new Date(h.created_at).getTime() : now
        results.push({
          title: h.title,
          url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
          source: 'Hacker News',
          publishedAt: new Date(created).toISOString().slice(0, 10),
          summary: `${h.points} points | ${h.num_comments || 0} comments on Hacker News`,
          score: h.points,
          ageHours: (now - created) / 3600000,
        })
      }
    } catch {
      // ignore per-topic failures; other topics still contribute
    }
  }

  // Dedupe within Hacker News, keeping the highest-scoring version of each story.
  const seen = new Set()
  const out = []
  for (const item of results.sort((a, b) => b.score - a.score)) {
    const key = dedupeKey(item.title)
    if (!seen.has(key)) {
      seen.add(key)
      out.push(item)
    }
  }
  return out
}

async function fetchGoogleNews() {
  const res = await fetch(GNEWS_URL, { headers: { 'User-Agent': 'Mozilla/5.0 portfolio-news-agent' } })
  if (!res.ok) throw new Error(`Google News request failed: ${res.status}`)
  const xml = await res.text()
  const now = Date.now()
  const out = []
  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const body = match[1]
    const title = stripHtml(cleanText(body.match(/<title>([\s\S]*?)<\/title>/)?.[1]))
    const link = body.match(/<link>([\s\S]*?)<\/link>/)?.[1]
    const desc = body.match(/<description>([\s\S]*?)<\/description>/)?.[1]
    const pub = body.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]
    if (!title || !link) continue
    const created = pub ? new Date(pub).getTime() : now
    out.push({
      title,
      url: link,
      source: 'Google News',
      publishedAt: new Date(created).toISOString().slice(0, 10),
      summary: cleanSummary(desc) || 'Latest AI/ML development',
      score: 1,
      ageHours: (now - created) / 3600000,
    })
  }
  return out
}

async function main() {
  const [hn, gn] = await Promise.all([fetchHN(), fetchGoogleNews()])

  // Hacker News is the primary source: recent stories ranked by points, so
  // significant engineering stories win. Google News fills any remaining slots.
  const picked = hn.slice(0, TARGET)
  const seen = new Set(picked.map((i) => dedupeKey(i.title)))

  const significance = (item) => {
    const ageFactor = Math.max(0, 1 - item.ageHours / MAX_AGE_HOURS)
    return item.score * ageFactor
  }

  for (const item of [...gn].sort((a, b) => significance(b) - significance(a))) {
    if (picked.length >= TARGET) break
    const key = dedupeKey(item.title)
    if (!seen.has(key)) {
      seen.add(key)
      picked.push(item)
    }
  }

  // Fall back to most recent available items if the feeds return little.
  if (picked.length === 0) {
    for (const item of [...hn, ...gn].sort((a, b) => a.ageHours - b.ageHours).slice(0, TARGET)) {
      const key = dedupeKey(item.title)
      if (!seen.has(key) && picked.length < TARGET) {
        seen.add(key)
        picked.push(item)
      }
    }
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    news: picked.slice(0, TARGET).map(({ title, url, source, publishedAt, summary }) => ({ title, url, source, publishedAt, summary })),
  }

  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n')
  console.log(`Updated ${OUT} with ${picked.length} stories`)
}

main().catch((err) => {
  console.error('Failed to fetch AI news:', err.message)
  // Keep the last known-good news file on failure so the site never breaks.
  process.exit(0)
})
