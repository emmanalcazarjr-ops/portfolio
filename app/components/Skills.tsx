'use client'

import { motion } from 'framer-motion'
import { FaCode, FaBrain, FaDatabase, FaRocket } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'
import { techStack } from '../data'

const skillCategories = [
  { icon: FaCode, title: 'Languages & Apps', desc: 'Python, Java, Node.js, TypeScript', color: 'from-blue-500 to-cyan-500' },
  { icon: FaBrain, title: 'Machine Learning', desc: 'scikit-learn, TensorFlow, PyTorch, pandas', color: 'from-cyan-500 to-blue-500' },
  { icon: FaDatabase, title: 'Databases & Backend', desc: 'FastAPI, PostgreSQL, MySQL, Supabase', color: 'from-green-500 to-emerald-500' },
  { icon: FaRocket, title: 'Deployment & Workflow', desc: 'Git, GitHub, Vercel, GitHub Actions', color: 'from-blue-500 to-indigo-500' },
]

export default function Skills() {
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
                The technologies I&apos;ve actually used to build real projects — AI chatbots,
                ML models, Telegram bots, and automation workflows.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full glass text-sm text-slate-200 border border-slate-700/50 hover:border-cyan-400/50 hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
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
