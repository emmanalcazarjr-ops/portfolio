'use client'

import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import TypeWriter from './TypeWriter'
import Counter from './Counter'
import { socialLinks, stats } from '../data'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1 animate-pulse-glow">
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
          <div className="text-xl md:text-2xl text-slate-400 mb-4 h-8">
            <TypeWriter 
              texts={[
                'Licensed Electronics Engineer',
                'Software Engineer',
                'Data Science & ML Developer',
                'Banking & Finance Systems'
              ]}
              speed={80}
              deleteSpeed={40}
              pauseTime={2500}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            I build intelligent systems that solve real-world problems. 
            Specializing in machine learning, NLP, and AI-powered applications 
            for banking, finance, and enterprise solutions.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <div className="flex justify-center gap-4 mb-12">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-xl font-medium text-white hover:bg-white/10 transition-colors"
            >
              Contact Me
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
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={1.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
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
