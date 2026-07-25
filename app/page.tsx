'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, 
  FaArrowUp, FaRocket, FaCode, FaBrain, FaShieldAlt,
  FaChartLine, FaRobot, FaDatabase, FaJava, FaPython,
  FaCalendar, FaClock, FaTag
} from 'react-icons/fa'
import { 
  SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, 
  SiNumpy, SiMysql, SiApache, SiVercel
} from 'react-icons/si'
import AnimatedBackground from './components/AnimatedBackground'
import TypeWriter from './components/TypeWriter'
import ScrollReveal from './components/ScrollReveal'
import TiltCard from './components/TiltCard'
import SkillBar from './components/SkillBar'
import Counter from './components/Counter'
import ChatWidget from './components/ChatWidget'

const projects = [
  {
    title: 'Fraud Detection System',
    description: 'Real-time fraud detection using scikit-learn Random Forest model with 98.6% accuracy. Features include transaction analysis, risk scoring, and detailed risk factor breakdown.',
    tech: ['Python', 'scikit-learn', 'joblib', 'Vercel'],
    github: 'https://github.com/emmanalcazarjr-ops/fraud-api',
    live: 'https://fraud-api-ten.vercel.app',
    icon: FaShieldAlt,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    badge: '98.6% Accuracy',
  },
  {
    title: 'RAG Document Q&A API',
    description: 'Retrieval-Augmented Generation system using TF-IDF vector search and DeepSeek AI for intelligent document retrieval and context-aware answers.',
    tech: ['Python', 'TF-IDF', 'DeepSeek AI', 'RAG'],
    github: 'https://github.com/emmanalcazarjr-ops/rag-qa-api',
    live: 'https://rag-qa-api.vercel.app',
    icon: FaBrain,
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
  },
  {
    title: 'Rush AI Butler',
    description: 'AI-powered customer support chatbot with conversation memory, webhook support, and rate limiting. Powered by DeepSeek AI for intelligent responses.',
    tech: ['Python', 'DeepSeek AI', 'FastAPI', 'Chatbot'],
    github: 'https://github.com/emmanalcazarjr-ops/chatbot-api',
    live: 'https://chatbot-api-two-teal.vercel.app',
    icon: FaRobot,
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
  },
  {
    title: 'Task Management System',
    description: 'Full-stack task management application with CRUD operations, filtering, real-time status updates, and PostgreSQL database integration.',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/emmanalcazarjr-ops/task-management-system',
    live: 'https://task-management-system-umber-three.vercel.app',
    icon: FaCode,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
  },
]

const skills = [
  { name: 'Java', level: 85, color: '#ED8B00', icon: FaJava },
  { name: 'Python', level: 90, color: '#3776AB', icon: FaPython },
  { name: 'TensorFlow', level: 80, color: '#FF6F00', icon: SiTensorflow },
  { name: 'PyTorch', level: 75, color: '#EE4C2C', icon: SiPytorch },
  { name: 'scikit-learn', level: 85, color: '#F7931E', icon: SiScikitlearn },
  { name: 'MySQL', level: 80, color: '#4479A1', icon: SiMysql },
  { name: 'Next.js/TypeScript', level: 75, color: '#000000', icon: FaCode },
  { name: 'FastAPI', level: 70, color: '#009688', icon: FaRocket },
  { name: 'PostgreSQL', level: 75, color: '#336791', icon: FaDatabase },
  { name: 'Git/GitHub', level: 85, color: '#F05032', icon: FaGithub },
]

const certifications = [
  { title: 'Electronics Engineer License (ECE)', org: 'PRC', icon: '⚡' },
  { title: 'Electronics Technician License (ECT)', org: 'PRC', icon: '🔧' },
  { title: 'ICT Infrastructure Certification', org: 'Internetworking End Devices', icon: '🌐' },
  { title: 'Data Analyst Associate', org: 'DataCamp', icon: '📈' },
  { title: 'AI Engineer for Developers', org: 'DataCamp', icon: '🤖' },
]

const blogPosts = [
  {
    title: 'Building a Fraud Detection System with scikit-learn',
    excerpt: 'How I built a real-time fraud detection API using Random Forest classifier, achieving 98.6% accuracy on synthetic transaction data.',
    date: 'July 2026',
    readTime: '8 min read',
    tags: ['Machine Learning', 'Python', 'scikit-learn'],
    slug: 'fraud-detection-scikit-learn',
  },
  {
    title: 'Implementing RAG with TF-IDF and DeepSeek AI',
    excerpt: 'A deep dive into building a Retrieval-Augmented Generation system that combines TF-IDF vector search with LLM-powered responses.',
    date: 'July 2026',
    readTime: '10 min read',
    tags: ['RAG', 'NLP', 'DeepSeek AI'],
    slug: 'rag-tfidf-deepseek',
  },
  {
    title: 'Deploying ML Models on Vercel Serverless',
    excerpt: 'Lessons learned from deploying scikit-learn models as serverless functions, including cold start optimization and model serialization.',
    date: 'July 2026',
    readTime: '6 min read',
    tags: ['DevOps', 'Vercel', 'Serverless'],
    slug: 'ml-vercel-serverless',
  },
]

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
      
      const sections = ['projects', 'skills', 'certifications', 'blog', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
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
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#" className="text-2xl font-bold text-gradient-animate">EA</a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center gap-8"
            >
              {['projects', 'skills', 'certifications', 'blog', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`text-sm font-medium transition-all duration-300 capitalize ${
                    activeSection === item 
                      ? 'text-blue-400' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="h-0.5 bg-blue-400 mt-1"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <ScrollReveal>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1 animate-pulse-glow">
                  <img 
                    src="/PFP.jpg" 
                    alt="Engr. Emman" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="text-white">Hi, I'm </span>
                <span className="text-gradient-animate">Engr. Emman</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="text-xl md:text-2xl text-slate-400 mb-4 h-8">
                <TypeWriter 
                  texts={[
                    'Licensed Electronics Engineer',
                    'Software Engineer',
                    'Data Science & ML Developer',
                    'Banking & Finance Systems'
                  ]}
                  speed={80}
                  deleteSpeed={40}
                  pauseTime={2500}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
                I build intelligent systems that solve real-world problems. 
                Specializing in machine learning, NLP, and AI-powered applications 
                for banking, finance, and enterprise solutions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.8}>
              <div className="flex justify-center gap-4 mb-12">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass rounded-xl font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Contact Me
                </motion.a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div className="flex justify-center gap-6">
                {[
                  { icon: FaGithub, href: 'https://github.com/emmanalcazarjr-ops', label: 'GitHub' },
                  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/emmanalcazarjr/', label: 'LinkedIn' },
                  { icon: FaEnvelope, href: 'mailto:EmmanAlcazarJr@gmail.com', label: 'Email' },
                  { icon: SiVercel, href: 'https://portfolio-elalcazarjr.vercel.app', label: 'Portfolio' },
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={1.2}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
                {[
                  { label: 'Projects', value: 4, suffix: '+' },
                  { label: 'Technologies', value: 15, suffix: '+' },
                  { label: 'Certifications', value: 5, suffix: '' },
                  { label: 'GitHub Repos', value: 10, suffix: '+' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                      <Counter to={stat.value} suffix={stat.suffix} duration={2} />
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects Section */}
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
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-sm font-medium">View on GitHub</span>
                            <FaExternalLinkAlt size={12} />
                          </a>
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-sm font-medium">Live Demo</span>
                              <FaExternalLinkAlt size={12} />
                            </a>
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

        {/* Skills Section */}
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
                  {[
                    { icon: FaCode, title: 'Software Engineering', desc: 'Java, Python, REST APIs', color: 'from-blue-500 to-cyan-500' },
                    { icon: FaBrain, title: 'Machine Learning', desc: 'TensorFlow, PyTorch, scikit-learn', color: 'from-purple-500 to-pink-500' },
                    { icon: FaDatabase, title: 'Databases', desc: 'MySQL, PostgreSQL, Oracle', color: 'from-green-500 to-emerald-500' },
                    { icon: FaRocket, title: 'DevOps', desc: 'Git, GitHub, Vercel, CI/CD', color: 'from-orange-500 to-red-500' },
                  ].map((item, i) => (
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

        {/* Certifications Section */}
        <section id="certifications" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <motion.span 
                  className="text-blue-500 font-medium text-sm uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Credentials
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                  Licenses & <span className="text-gradient">Certifications</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <ScrollReveal key={cert.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass-card rounded-2xl p-6 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 text-2xl">
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{cert.title}</h3>
                      <p className="text-sm text-slate-500">{cert.org}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
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
                      <span className="text-blue-400 text-sm font-medium hover:underline cursor-pointer">
                        Read Article →
                      </span>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
                {[
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
                ].map((contact, i) => (
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

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-600 text-sm"
            >
              Built with Next.js, Tailwind CSS, Framer Motion & Vercel
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-700 text-xs mt-4"
            >
              © {new Date().getFullYear()} Emmanuel L. Alcazar Jr. - Licensed Electronics Engineer
            </motion.p>
          </div>
        </footer>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow z-50"
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
