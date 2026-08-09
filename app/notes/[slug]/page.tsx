'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCalendar, FaTag } from 'react-icons/fa'
import Link from 'next/link'
import { marked } from 'marked'

interface Note {
  slug: string
  file: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

export default function NotePage({ params }: { params: { slug: string } }) {
  const [note, setNote] = useState<Note | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const manifestRes = await fetch('/notes/manifest.json')
        if (!manifestRes.ok) throw new Error('no manifest')
        const manifest: Note[] = await manifestRes.json()
        const match = manifest.find((n) => n.slug === params.slug)

        if (!match) throw new Error('not found')

        const res = await fetch(`/notes/${encodeURIComponent(match.file)}.md`)
        if (!res.ok) throw new Error('no content')
        const text = await res.text()
        const html = marked(text)

        setNote(match)
        setContent(html as string)
      } catch {
        setNote(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.slug])

  if (!loading && !note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Note Not Found</h1>
          <Link href="/notes" className="text-cyan-400 hover:underline">
            Back to Notes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
          >
            <FaArrowLeft size={14} />
            Back to Notes
          </Link>

          {note && (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{note.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8">
                {note.date && (
                  <span className="flex items-center gap-1">
                    <FaCalendar size={12} />
                    {note.date}
                  </span>
                )}
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20"
                  >
                    <FaTag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="glass-card rounded-2xl p-8 md:p-12">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-slate-800 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div
                className="prose prose-invert prose-blue max-w-none
                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-6
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4
                  [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:text-slate-400 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_a]:text-cyan-400 [&_a]:hover:underline
                  [&_strong]:text-white [&_strong]:font-semibold
                  [&_em]:text-slate-300
                  [&_code]:bg-slate-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-cyan-400 [&_code]:text-sm
                  [&_pre]:bg-slate-900 [&_pre]:rounded-xl [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:mb-6 [&_pre]:border [&_pre]:border-slate-700
                  [&_pre_code]:bg-transparent [&_pre_code]:p-0
                  [&_ul]:text-slate-400 [&_ul]:mb-4 [&_ul]:ml-6
                  [&_ol]:text-slate-400 [&_ol]:mb-4 [&_ol]:ml-6
                  [&_li]:mb-2
                  [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-400 [&_blockquote]:mb-4
                  [&_table]:w-full [&_table]:mb-6
                  [&_th]:bg-slate-800 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:text-white [&_th]:font-semibold
                  [&_td]:border-t [&_td]:border-slate-700 [&_td]:px-4 [&_td]:py-2 [&_td]:text-slate-400
                  [&_hr]:border-slate-700 [&_hr]:my-8"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
