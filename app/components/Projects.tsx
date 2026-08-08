'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'
import { projects } from '../data'

export default function Projects() {
  const [showMore, setShowMore] = useState(false)
  const featured = projects.filter((p) => p.featured)
  const more = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span 
              className="text-blue-500 font-medium text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Portfolio
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Click on any project to view the source code on GitHub
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Projects — full cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {featured.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full glass-card rounded-2xl overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                  
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-0.5`}>
                        <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                          <project.icon size={24} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        {project.badge && (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                            {project.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span 
                          key={t} 
                          className="text-xs px-3 py-1.5 rounded-full bg-slate-800/50 text-slate-300 border border-slate-700/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <span className="flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-medium">View on GitHub</span>
                        <FaExternalLinkAlt size={12} />
                      </span>
                      {project.live && (
                        <span className="flex items-center gap-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-medium">Live Demo</span>
                          <FaExternalLinkAlt size={12} />
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* More Projects — expandable section */}
        {more.length > 0 && (
        <div className="mt-16">
          <button
            onClick={() => setShowMore(!showMore)}
            className="mx-auto flex items-center gap-3 px-8 py-4 glass rounded-xl font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <span>{showMore ? 'Hide' : 'Show'} More Projects ({more.length})</span>
            <motion.span
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown size={14} />
            </motion.span>
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  {more.map((project, i) => (
                    <motion.a
                      key={project.title}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-card rounded-xl p-5 group hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient} p-0.5`}>
                          <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
                            <project.icon size={16} className="text-white" />
                          </div>
                        </div>
                        <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.slice(0, 3).map((t) => (
                          <span 
                            key={t} 
                            className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          GitHub <FaExternalLinkAlt size={10} />
                        </span>
                        {project.live && (
                          <span className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Demo <FaExternalLinkAlt size={10} />
                          </span>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        )}
      </div>
    </section>
  )
}
