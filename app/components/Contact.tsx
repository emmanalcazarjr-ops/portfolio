'use client'

import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'

const contactLinks = [
  { 
    icon: FaEnvelope, 
    title: 'Email', 
    value: 'EmmanAlcazarJr@gmail.com',
    href: 'mailto:EmmanAlcazarJr@gmail.com',
    gradient: 'from-red-500 to-orange-500'
  },
  { 
    icon: FaLinkedin, 
    title: 'LinkedIn', 
    value: 'emmanalcazarjr',
    href: 'https://www.linkedin.com/in/emmanalcazarjr/',
    gradient: 'from-blue-600 to-blue-400'
  },
  { 
    icon: FaGithub, 
    title: 'GitHub', 
    value: 'emmanalcazarjr-ops',
    href: 'https://github.com/emmanalcazarjr-ops',
    gradient: 'from-gray-700 to-gray-500'
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <motion.span 
            className="text-blue-500 font-medium text-sm uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-slate-500 mb-12 max-w-xl mx-auto">
            Feel free to reach out for opportunities, collaborations, or just to say hello!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid md:grid-cols-3 gap-6">
            {contactLinks.map((contact, i) => (
              <motion.a
                key={contact.title}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-2xl p-8 text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${contact.gradient} p-0.5 mx-auto mb-6`}>
                  <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                    <contact.icon size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-white mb-2">{contact.title}</h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-400 transition-colors">
                  {contact.value}
                </p>
              </motion.a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
