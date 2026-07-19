'use client'

import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#demos', label: 'Demos' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold text-white hover:text-primary transition-colors">
            EA<span className="text-primary">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/emmanalcazarjr-ops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={22} />
            </a>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/emmanalcazarjr-ops"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={18} /> GitHub
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
