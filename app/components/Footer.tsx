'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'

export default function Footer() {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setViews(data.total ?? null))
      .catch(() => setViews(null))
  }, [])

  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-600 text-sm"
        >
          Built with Next.js, Tailwind CSS, Framer Motion & Vercel
        </motion.p>
        {views !== null && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-xs mt-4 inline-flex items-center gap-2"
          >
            <FaEye size={12} className="text-cyan-400" />
            {views.toLocaleString()} visits · live from Supabase
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-700 text-xs mt-4"
        >
          © {new Date().getFullYear()} Emmanuel L. Alcazar Jr. - Licensed Electronics Engineer
        </motion.p>
      </div>
    </footer>
  )
}
