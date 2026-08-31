'use client'

import { motion } from 'framer-motion'
import { FaCalendar, FaClock, FaTag, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import { blogPosts } from '@/app/data'

export default function BlogPage() {
  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
          >
            <FaArrowLeft size={14} />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-slate-500 mb-12 max-w-2xl">
            Thoughts on machine learning, software engineering, and building production-ready systems
          </p>

          <div className="space-y-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors">
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

                    <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-slate-400 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20 text-sm"
                        >
                          <FaTag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
