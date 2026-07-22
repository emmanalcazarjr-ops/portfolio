'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa'

const API_URL = 'https://chatbot-api-two-teal.vercel.app/api/chat'

function parseMarkdown(text: string): string {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')
  html = html.replace(/`(.+?)`/g, '<code class="bg-purple-500/15 px-1.5 py-0.5 rounded text-xs">$1</code>')
  html = html.replace(/\n/g, '<br>')
  html = html.replace(/^[\-\*]\s+(.+)$/gm, '<span class="block pl-3">&bull; $1</span>')
  return html
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: 'bot', content: "Hi! I'm Rush, Emman's AI butler. How can I help you today?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).slice(2, 14))
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, session_id: sessionId })
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      const reply = data.response || data.reply || data.message || 'Sorry, I could not process that.'
      setMessages(prev => [...prev, { role: 'bot', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', content: 'Unable to reach the server. Please try again later.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow z-50"
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={22} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-b border-white/10 p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <FaRobot size={16} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Rush AI Butler</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-purple-600 to-violet-600 text-white rounded-br-md'
                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-md'
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.role === 'bot' ? parseMarkdown(msg.content) : msg.content }}
                  />
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500/50 transition-colors"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white flex items-center justify-center disabled:opacity-50 transition-opacity"
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
