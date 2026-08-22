'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaCheck, FaSpinner, FaTimes } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'

const contactLinks = [
  { 
    icon: FaEnvelope, 
    title: 'Email', 
    value: 'EmmanAlcazarJr@gmail.com',
    href: 'mailto:EmmanAlcazarJr@gmail.com',
    gradient: 'from-blue-600 to-cyan-500'
  },
  { 
    icon: FaLinkedin, 
    title: 'LinkedIn', 
    value: 'emmanalcazarjr',
    href: 'https://www.linkedin.com/in/emmanalcazarjr/',
    gradient: 'from-blue-600 to-cyan-500'
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      // 1. Dispatch email directly to EmmanAlcazarJr@gmail.com via Web3Forms
      const emailPromise = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '23af2e12-09f3-4d97-ad9f-a6eb848e8eb2',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: 'Portfolio Contact Form',
        }),
      })

      // 2. Save lead record to Supabase
      const dbPromise = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const [emailRes] = await Promise.allSettled([emailPromise, dbPromise])

      let isSuccess = true
      if (emailRes.status === 'fulfilled') {
        const data = await emailRes.value.json().catch(() => ({}))
        if (data.success === false) isSuccess = false
      }

      if (isSuccess) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
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
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-slate-400 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-slate-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : status === 'sent' ? (
                    <>
                      <FaCheck />
                      Message Sent!
                    </>
                  ) : status === 'error' ? (
                    <>
                      <FaTimes />
                      Failed to Send
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </ScrollReveal>

          {/* Contact Links */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Other Ways to Reach Me</h3>
                <p className="text-slate-400 mb-6">
                  Prefer a different platform? Find me on these channels:
                </p>
                
                <div className="space-y-4">
                  {contactLinks.map((contact, i) => (
                    <motion.a
                      key={contact.title}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 transition-colors group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.gradient} p-0.5 flex-shrink-0`}>
                        <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                          <contact.icon size={20} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {contact.title}
                        </h4>
                        <p className="text-sm text-slate-500">{contact.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Availability</h3>
                <p className="text-slate-400">
                  I'm currently open to freelance opportunities, collaborations, and full-time positions. 
                  Response time is typically within 24 hours.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
