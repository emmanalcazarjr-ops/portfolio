'use client'

import { motion } from 'framer-motion'
import { FaCode, FaBrain, FaDatabase, FaRocket } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'
import SkillBar from './SkillBar'
import { skills } from '../data'

const skillCategories = [
  { icon: FaCode, title: 'Software Engineering', desc: 'Java, Python, REST APIs', color: 'from-blue-500 to-cyan-500' },
  { icon: FaBrain, title: 'Machine Learning', desc: 'TensorFlow, PyTorch, scikit-learn', color: 'from-cyan-500 to-blue-500' },
  { icon: FaDatabase, title: 'Databases', desc: 'MySQL, PostgreSQL, Oracle', color: 'from-green-500 to-emerald-500' },
  { icon: FaRocket, title: 'DevOps', desc: 'Git, GitHub, Vercel, CI/CD', color: 'from-blue-500 to-indigo-500' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <motion.span 
                className="text-blue-500 font-medium text-sm uppercase tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Expertise
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Technical <span className="text-gradient">Skills</span>
              </h2>
              <p className="text-slate-500 mb-10">
                Proficient in software engineering and machine learning technologies,
                with expertise in building enterprise-grade applications.
              </p>
              
              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={skill.color}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {skillCategories.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} p-0.5 mx-auto mb-4`}>
                    <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                      <item.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
