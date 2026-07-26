'use client'

import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { certifications } from '../data'

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span 
              className="text-blue-500 font-medium text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Credentials
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Licenses & <span className="text-gradient">Certifications</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 text-2xl">
                  {cert.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{cert.title}</h3>
                  <p className="text-sm text-slate-500">{cert.org}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
