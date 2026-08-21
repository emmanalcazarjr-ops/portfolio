'use client'

import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const aboutItems = [
  { 
    title: 'Education', 
    icon: '🎓',
    items: ['BS Electronics Engineering', 'Licensed ECE & ECT', 'DataCamp Certifications']
  },
  { 
    title: 'Experience', 
    icon: '💼',
    items: ['Software Engineering', 'Machine Learning Development', 'AI Automation & Workflows']
  },
  { 
    title: 'Focus Areas', 
    icon: '🎯',
    items: ['AI-Powered Applications', 'Intelligent Chatbots & Bots', 'Enterprise Automation']
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
                I'm a <span className="text-white font-semibold">Licensed Electronics Engineer</span> turned 
                <span className="text-white font-semibold"> AI/ML Developer</span> and 
                <span className="text-white font-semibold"> Software Engineer</span>. My journey 
                started in electronics and telecommunications, but my passion for building intelligent 
                systems led me to the world of AI and software engineering.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                With expertise in <span className="text-cyan-400">Python</span>, <span className="text-cyan-400">Node.js / TypeScript</span>, 
                and modern AI APIs, I specialize in building production-ready applications that solve 
                real-world business problems through intelligent automation and custom AI systems.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                My goal is to bridge the gap between cutting-edge AI capabilities and practical business workflows, 
                creating systems that are both intelligent and reliable.
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
