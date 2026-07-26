'use client'

import { motion } from 'framer-motion'
import { FaCalendar, FaClock, FaTag } from 'react-icons/fa'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { blogPosts } from '../data'

export default function Blog() {
  return (
    <section id="blog" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span 
              className="text-blue-500 font-medium text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Insights
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Technical <span className="text-gradient">Blog</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Thoughts on machine learning, software engineering, and building production-ready systems
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl overflow-hidden h-full flex flex-col"
              >
                <div className="p-8 flex-1">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FaCalendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="px-8 pb-6">
                  <Link href={`/blog/${post.slug}`} className="text-blue-400 text-sm font-medium hover:underline">
                    Read Article →
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
