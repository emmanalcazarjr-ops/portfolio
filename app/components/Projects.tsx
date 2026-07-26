'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'
import { projects } from '../data'

export default function Projects() {
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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full glass-card rounded-2xl overflow-hidden group"
                >
                  {/* Gradient header */}
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                  
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-0.5`}>
                        <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                          <project.icon size={24} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
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
                      <span className="flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
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
      </div>
    </section>
  )
}
