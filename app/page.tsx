'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import AnimatedBackground from './components/AnimatedBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import StackIntegrations from './components/StackIntegrations'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Roadmap from './components/Roadmap'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import { navItems } from './data'

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
      
      for (const section of navItems) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatedBackground />
      
      <main className="relative z-10">
        <Navigation activeSection={activeSection} />
        <Hero />
        <About />
        <Projects />
        <StackIntegrations />
        <Skills />
        <Certifications />
        <Roadmap />
        <Blog />
        <Contact />
        <Footer />

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow z-50"
            >
              <FaArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <ChatWidget />
      </main>
    </>
  )
}
