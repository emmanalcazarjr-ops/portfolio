'use client'

import { motion } from 'framer-motion'

export default function Footer() {
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
