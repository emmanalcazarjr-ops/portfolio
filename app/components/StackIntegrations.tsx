'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLink } from 'react-icons/fa'
import { SiSupabase, SiObsidian, SiVercel } from 'react-icons/si'
import ScrollReveal from './ScrollReveal'
import Link from 'next/link'

const integrations = [
  {
    icon: SiSupabase,
    title: 'Supabase — one backend for everything',
    color: '#3ECF8E',
    gradient: 'from-emerald-500 to-teal-400',
    points: [
      'Rush AI Butler remembers every conversation (persistent chat memory)',
      'Portfolio contact form saves leads into the database',
      'Live views counter runs on real-time data',
    ],
    footer: 'Server-side only — no keys in the browser.',
    href: 'https://github.com/emmanalcazarjr-ops/shared-backend',
    cta: 'See the shared schema',
  },
  {
    icon: SiObsidian,
    title: 'Obsidian — notes that publish themselves',
    color: '#7C3AED',
    gradient: 'from-violet-500 to-purple-400',
    points: [
      'My whole AI workspace is an Obsidian vault',
      'Auto-syncs to GitHub on every save',
      'GitHub Action ships new notes straight to this site',
    ],
    footer: 'Write once, publish automatically.',
    href: '/notes',
    cta: 'Read my notes',
  },
  {
    icon: SiVercel,
    title: 'GitHub + Vercel — push to deploy',
    color: '#FFFFFF',
    gradient: 'from-slate-600 to-slate-400',
    points: [
      'Every project is git-connected — a push to main goes live',
      'Portfolio, Rush AI Butler, and the Report Generator all auto-deploy',
      'One pipeline powers the whole stack',
    ],
    footer: 'Simple, repeatable, always up to date.',
    href: 'https://github.com/emmanalcazarjr-ops',
    cta: 'Browse my GitHub',
  },
]

export default function StackIntegrations() {
  return (
    <section id="stack" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span
              className="text-blue-500 font-medium text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Live Architecture
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Stack &amp; <span className="text-gradient">Integrations</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Everything on this page is wired together and working live — a database,
              a notes pipeline, and an auto-deploy loop.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {integrations.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                      <item.icon size={22} color={item.color} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-slate-600 mb-4">{item.footer}</p>

                {item.href.startsWith('/') ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-cyan-400 text-sm hover:text-white transition-colors"
                  >
                    <FaLink size={12} />
                    {item.cta}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 text-sm hover:text-white transition-colors"
                  >
                    <FaGithub size={12} />
                    {item.cta}
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
