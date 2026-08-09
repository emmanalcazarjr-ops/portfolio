'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCalendar, FaTag, FaStickyNote } from 'react-icons/fa'
import Link from 'next/link'

interface Note {
  slug: string
  file: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('/notes/manifest.json')
        if (!res.ok) throw new Error('no manifest')
        const data = await res.json()
        setNotes(Array.isArray(data) ? data : [])
      } catch {
        setNotes([])
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
          >
            <FaArrowLeft size={14} />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Notes from my <span className="text-gradient">Obsidian Vault</span>
          </h1>
          <p className="text-slate-500 mb-12 max-w-2xl">
            Written in Obsidian, synced to GitHub, and published here automatically — no manual deploy.
          </p>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <FaStickyNote size={32} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No notes published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {notes.map((note, i) => (
                <motion.div
                  key={note.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/notes/${note.slug}`} className="block">
                    <div className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1">
                          <FaCalendar size={12} />
                          {note.date || 'Recently updated'}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                        {note.title}
                      </h2>

                      {note.excerpt && (
                        <p className="text-slate-400 mb-4 leading-relaxed">{note.excerpt}</p>
                      )}

                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20 text-sm"
                            >
                              <FaTag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
