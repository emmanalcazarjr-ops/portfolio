'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FaCode, FaBrain, FaDatabase, FaRocket,
  FaPython, FaNodeJs, FaGitAlt, FaGithub,
} from 'react-icons/fa'
import {
  SiScikitlearn, SiTypescript, SiFastapi,
  SiNextdotjs, SiTelegram, SiPandas, SiNumpy, SiPostgresql,
  SiSupabase, SiVercel, SiN8N, SiTailwindcss,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import ScrollReveal from './ScrollReveal'
import { techStack } from '../data'

const stackIcons: Record<string, { icon: IconType; color: string }> = {
  Python: { icon: FaPython, color: '#3776AB' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'Node.js': { icon: FaNodeJs, color: '#6CC24A' },
  FastAPI: { icon: SiFastapi, color: '#009688' },
  'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  grammY: { icon: SiTelegram, color: '#26A5E4' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38BDF8' },
  n8n: { icon: SiN8N, color: '#EA4B71' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  pandas: { icon: SiPandas, color: '#B8C4D9' },
  NumPy: { icon: SiNumpy, color: '#4DABCF' },
  PostgreSQL: { icon: SiPostgresql, color: '#699ECA' },
  Supabase: { icon: SiSupabase, color: '#3ECF8E' },
  Git: { icon: FaGitAlt, color: '#F05032' },
  GitHub: { icon: FaGithub, color: '#FFFFFF' },
  Vercel: { icon: SiVercel, color: '#FFFFFF' },
  'GitHub Actions': { icon: FaGithub, color: '#2088FF' },
}

const skillCategories = [
  { icon: FaCode, title: 'Languages & Web', desc: 'Python, TypeScript, Node.js, Next.js, Tailwind CSS', color: 'from-blue-500 to-cyan-500' },
  { icon: FaBrain, title: 'AI & Data Science', desc: 'FastAPI, pandas, NumPy, scikit-learn, LLM APIs', color: 'from-cyan-500 to-blue-500' },
  { icon: FaDatabase, title: 'Automation & Backend', desc: 'n8n, grammY, Supabase, PostgreSQL', color: 'from-green-500 to-emerald-500' },
  { icon: FaRocket, title: 'DevOps & Tooling', desc: 'Git, GitHub, Vercel, GitHub Actions', color: 'from-blue-500 to-indigo-500' },
]

// even scatter across the cloud (golden-angle spiral), as % of container
function scatter(i: number, n: number) {
  const angle = i * 2.399963229728653
  const r = Math.sqrt((i + 0.5) / n) * 0.9
  return {
    px: 50 + Math.cos(angle) * r * 46,
    py: 50 + Math.sin(angle) * r * 46,
  }
}

export default function Skills() {
  const cloudRef = useRef<HTMLDivElement>(null)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const cloud = cloudRef.current
    if (!cloud) return
    const tiles = Array.from(cloud.querySelectorAll<HTMLElement>('[data-skill]'))
    if (!tiles.length) return

    let raf = 0
    let mx = -9999
    let my = -9999
    const onMove = (e: MouseEvent) => {
      const r = cloud.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
    }
    const onLeave = () => {
      mx = -9999
      my = -9999
    }
    cloud.addEventListener('mousemove', onMove, { passive: true })
    cloud.addEventListener('mouseleave', onLeave)

    const t0 = performance.now()
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      const dt = (t - t0) / 1000
      const rect = cloud.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      tiles.forEach((tile, i) => {
        const px = parseFloat(tile.dataset.px || '50')
        const py = parseFloat(tile.dataset.py || '50')
        const bx = (px / 100) * rect.width
        const by = (py / 100) * rect.height
        const dx = Math.sin(dt * 0.55 + i * 1.7) * 9
        const dy = Math.cos(dt * 0.45 + i * 2.3) * 7
        const cx = bx + dx + tile.offsetWidth / 2
        const cy = by + dy + tile.offsetHeight / 2
        const rx = cx - mx
        const ry = cy - my
        const dist = Math.hypot(rx, ry)
        let pushX = 0
        let pushY = 0
        if (dist < 150 && dist > 0.001) {
          const f = Math.pow((150 - dist) / 150, 1.4)
          pushX = (rx / dist) * f * 30
          pushY = (ry / dist) * f * 30
        }
        tile.style.transform = `translate3d(${bx + dx + pushX}px, ${by + dy + pushY}px, 0)`
      })
    }
    if (!reduced) raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      cloud.removeEventListener('mousemove', onMove)
      cloud.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <motion.span
                className="text-blue-500 font-medium text-sm uppercase tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Expertise
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Technical <span className="text-gradient">Skills</span>
              </h2>
              <p className="text-slate-500 mb-10">
                The technologies I&apos;ve actually used to build real projects —
                move your cursor through the icons, they float and dodge.
              </p>

              <div
                ref={cloudRef}
                className="relative h-[460px] md:h-[540px] w-full"
              >
                {techStack.map((tech, i) => {
                  const entry = stackIcons[tech]
                  const pos = scatter(i, techStack.length)
                  return (
                    <div
                      key={tech}
                      data-skill
                      data-px={pos.px.toFixed(1)}
                      data-py={pos.py.toFixed(1)}
                      aria-label={tech}
                      className="absolute left-0 top-0 will-change-transform"
                    >
                      <div className="skill-tile glass rounded-2xl w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center gap-1.5 shadow-lg select-none">
                        <entry.icon size={26} style={{ color: entry.color }} />
                        <span className="text-[10px] text-slate-400 font-medium text-center leading-tight px-1">
                          {tech}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {skillCategories.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} p-0.5 mx-auto mb-4`}>
                    <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                      <item.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
