'use client'

import { motion } from 'framer-motion'
import { FaCheckCircle, FaRegCircle, FaSpinner, FaExternalLinkAlt, FaNewspaper } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'
import { roadmap, type RoadmapStatus } from '../data'
import aiNews from '../data/ai-news.json'

const statusStyles: Record<RoadmapStatus, { badge: string; icon: React.ReactNode }> = {
  done: {
    badge: 'bg-green-500/20 text-green-400 border-green-500/30',
    icon: <FaCheckCircle size={16} className="text-green-400" />,
  },
  'in-progress': {
    badge: 'bg-blue-500/20 text-cyan-400 border-blue-500/30',
    icon: <FaSpinner size={16} className="text-cyan-400 animate-spin" />,
  },
  planned: {
    badge: 'bg-slate-800/50 text-slate-400 border-slate-700/50',
    icon: <FaRegCircle size={16} className="text-slate-500" />,
  },
}

const statusLabel: Record<RoadmapStatus, string> = {
  done: 'Done',
  'in-progress': 'In Progress',
  planned: 'Planned',
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span
              className="text-blue-500 font-medium text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What&apos;s Next
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Roadmap &amp; <span className="text-gradient">Goals</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A live view of what I&apos;m building right now and where I&apos;m headed.
              Updated as work progresses.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {roadmap.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 text-2xl">
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{group.title}</h3>
                </div>

                <ul className="space-y-3">
                  {group.items.map((item) => {
                    const style = statusStyles[item.status]
                    return (
                      <li
                        key={item.title}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors hover:bg-white/10"
                      >
                        <span className="mt-0.5 flex-shrink-0">{style.icon}</span>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium ${item.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                            {item.title}
                          </p>
                          {item.note && <p className="text-xs text-slate-500 mt-0.5">{item.note}</p>}
                          <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border mt-1.5 ${style.badge}`}>
                            {statusLabel[item.status]}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* AI News */}
        <ScrollReveal>
          <div className="mt-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <FaNewspaper size={20} className="text-cyan-400" />
              <h3 className="text-2xl md:text-3xl font-bold">
                AI News <span className="text-gradient">Now</span>
              </h3>
            </div>
            <p className="text-center text-slate-500 text-sm mb-2">
              5 latest significant stories · updated daily by an automated agent
            </p>
            <p className="text-center text-slate-600 text-xs mb-8">
              Last updated: {new Date(aiNews.updatedAt).toLocaleDateString()}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiNews.news.slice(0, 5).map((item, i) => (
                <motion.a
                  key={item.url + i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-xl p-5 group hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-400 border border-blue-500/30 uppercase tracking-wide">
                      {item.source}
                    </span>
                    <span className="text-xs text-slate-500">{item.publishedAt}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors mb-2">
                    {item.title}
                  </h4>
                  {item.summary && <p className="text-xs text-slate-500 leading-relaxed">{item.summary}</p>}
                  <span className="inline-flex items-center gap-1 text-cyan-400 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read story <FaExternalLinkAlt size={10} />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
