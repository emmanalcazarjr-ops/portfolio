'use client'

import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const aboutItems = [
  { 
    title: 'Education & Licenses', 
    icon: '🎓',
    items: ['BS Electronics Engineering', 'Licensed ECE & ECT (PRC)', 'DataCamp AI & Data Associate']
  },
  { 
    title: 'Core Expertise', 
    icon: '⚙️',
    items: ['AI Automation & n8n Workflows', 'Autonomous Telegram & Web Agents', 'API & Webhook Orchestration']
  },
  { 
    title: 'Business Impact', 
    icon: '🎯',
    items: ['Eliminating Repetitive Manual Work', 'Real-Time KPI & Data Pipelines', 'High-ROI Operational Systems']
  },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span 
              className="text-blue-500 font-medium text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Background
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <p className="text-lg text-slate-400 leading-relaxed">
                I'm a <span className="text-white font-semibold">Licensed Electronics Engineer</span> specializing in 
                <span className="text-white font-semibold"> AI Automation</span>, 
                <span className="text-white font-semibold"> Autonomous Agents</span>, and 
                <span className="text-white font-semibold"> Intelligent Systems</span>. My engineering background 
                grounds my work in systems thinking, telemetry, and fault-tolerant architecture—qualities 
                essential for production-grade AI that businesses can truly depend on.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                With deep expertise in <span className="text-cyan-400">n8n Automation</span>, <span className="text-cyan-400">Python &amp; FastAPI</span>, 
                <span className="text-cyan-400">TypeScript / Node.js</span>, and <span className="text-cyan-400">Google Gemini &amp; LLM APIs</span>, 
                I design and deploy end-to-end automation pipelines that replace slow manual workflows with autonomous, 
                self-healing software.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                My mission is straightforward: turn cutting-edge generative AI models into measurable business ROI—reducing 
                operational overhead, slashing turnaround times, and giving teams valuable hours back every single week.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-6">
              {aboutItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {item.items.map((text) => (
                      <li key={text} className="flex items-center gap-2 text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
