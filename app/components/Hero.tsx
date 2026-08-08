'use client'

import { motion } from 'framer-motion'
import {
  FaRobot, FaBrain, FaCode, FaDatabase, FaJava, FaPython
} from 'react-icons/fa'
import { SiTensorflow, SiPytorch, SiVercel } from 'react-icons/si'
import ScrollReveal from './ScrollReveal'
import TypeWriter from './TypeWriter'
import Counter from './Counter'
import { socialLinks, stats } from '../data'

const floatingIcons = [
  { icon: FaRobot, className: 'top-[24%] left-[7%] text-cyan-400', size: 22 },
  { icon: SiTensorflow, className: 'top-[18%] right-[9%] text-blue-400', size: 22 },
  { icon: FaPython, className: 'top-[58%] left-[5%] text-cyan-300', size: 24 },
  { icon: SiPytorch, className: 'top-[62%] right-[7%] text-blue-300', size: 22 },
  { icon: FaCode, className: 'top-[40%] right-[22%] text-sky-300', size: 20 },
  { icon: FaDatabase, className: 'top-[46%] left-[17%] text-blue-400', size: 20 },
  { icon: FaBrain, className: 'top-[30%] left-[32%] text-sky-300', size: 22 },
  { icon: SiVercel, className: 'top-[34%] right-[34%] text-slate-300', size: 20 },
  { icon: FaJava, className: 'top-[14%] left-[22%] text-blue-400', size: 22 },
]

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Floating moving icons (n8n-style) */}
      <div className="absolute inset-0 z-0">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -22, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            className={`absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl glass border border-white/10 ${item.className} shadow-lg`}
          >
            <item.icon size={item.size} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Sliding up & down hero content */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-cyan-400 text-[11px] uppercase tracking-widest font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              AI Automation &amp; Intelligent Systems
            </motion.div>
          </ScrollReveal>

          <ScrollReveal>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 p-1 animate-pulse-glow">
                <img
                  src="/PFP.jpg"
                  alt="Engr. Emman"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white">Hi, I'm </span>
              <span className="text-gradient-animate">Engr. Emman</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="text-xl md:text-2xl text-slate-400 mb-6 h-8">
              <TypeWriter
                texts={[
                  'Licensed Electronics Engineer',
                  'AI/ML Developer',
                  'Data Science & ML Developer'
                ]}
                speed={80}
                deleteSpeed={40}
                pauseTime={2500}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              I build AI automation and intelligent systems that help people
              and businesses work smarter and faster.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.8}>
            <div className="flex justify-center gap-4 mb-12">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#roadmap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass rounded-xl font-medium text-white hover:bg-white/10 transition-colors"
              >
                My Roadmap
              </motion.a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Stats */}
        <ScrollReveal delay={1.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  <Counter to={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
