'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, 
  FaArrowUp, FaRocket, FaCode, FaBrain, FaShieldAlt,
  FaChartLine, FaRobot, FaDatabase, FaJava, FaPython
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

const projects = [
  {
    title: 'Core Banking System',
    description: 'CLI-based banking application with transaction processing, role-based access, and ACID compliance.',
    tech: ['Java', 'MySQL', 'Maven', 'JDBC'],
    github: 'https://github.com/emmanalcazarjr-ops/core-banking-system',
    icon: FaDatabase,
    gradient: 'from-orange-500 via-red-500 to-pink-500',
  },
  {
    title: 'Fraud Detection System',
    description: 'ML-based fraud detection using Random Forest with feature engineering and real-time predictions.',
    tech: ['Python', 'scikit-learn', 'pandas', 'NumPy'],
    github: 'https://github.com/emmanalcazarjr-ops/fraud-detection-system',
    icon: FaShieldAlt,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    title: 'Credit Risk Predictor',
    description: 'Deep learning model to predict loan default risk using neural networks with TensorFlow.',
    tech: ['Python', 'TensorFlow', 'pandas', 'NumPy'],
    github: 'https://github.com/emmanalcazarjr-ops/credit-risk-predictor',
    icon: FaChartLine,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
  },
  {
    title: 'Stock Price Predictor',
    description: 'LSTM-based neural network for stock price forecasting with confidence intervals.',
    tech: ['Python', 'PyTorch', 'NumPy', 'pandas'],
    github: 'https://github.com/emmanalcazarjr-ops/stock-price-predictor',
    icon: FaChartLine,
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
  },
  {
    title: 'Customer Churn Predictor',
    description: 'Predict customer churn using Gradient Boosting with SHAP explainability.',
    tech: ['Python', 'scikit-learn', 'SHAP', 'XGBoost'],
    github: 'https://github.com/emmanalcazarjr-ops/customer-churn-predictor',
    icon: FaRobot,
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
  },
  {
    title: 'Sentiment Analysis Tool',
    description: 'NLP-based sentiment analysis for text using TextBlob with preprocessing pipeline.',
    tech: ['Python', 'TextBlob', 'pandas', 'NLP'],
    github: 'https://github.com/emmanalcazarjr-ops/sentiment-analysis-tool',
    icon: FaBrain,
    gradient: 'from-indigo-500 via-violet-500 to-purple-500',
  },
  {
    title: 'Task Management System',
    description: 'Full-stack task management application with CRUD operations, filtering, and real-time status updates.',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/emmanalcazarjr-ops/task-management-system',
    icon: FaCode,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
  },
  {
    title: 'ML API Showcase',
    description: 'Interactive showcase of Machine Learning APIs with live demos and real-time predictions.',
    tech: ['Next.js 14', 'TypeScript', 'Python', 'Tailwind CSS'],
    github: 'https://github.com/emmanalcazarjr-ops/ml-api-showcase',
    icon: FaRocket,
    gradient: 'from-fuchsia-500 via-purple-500 to-indigo-500',
  },
  {
    title: 'RAG Document Q&A API',
    description: 'Retrieval-Augmented Generation system using TF-IDF vector search and DeepSeek AI for intelligent document retrieval.',
    tech: ['Python', 'TF-IDF', 'DeepSeek AI', 'RAG'],
    github: 'https://github.com/emmanalcazarjr-ops/rag-qa-api',
    live: 'https://rag-qa-api.vercel.app',
    icon: FaBrain,
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
  },
  {
    title: 'Semantic Search API',
    description: 'TF-IDF based semantic search with cosine similarity for intelligent document retrieval and information retrieval.',
    tech: ['Python', 'TF-IDF', 'Cosine Similarity', 'NLP'],
    github: 'https://github.com/emmanalcazarjr-ops/semantic-search-api',
    live: 'https://semantic-search-api-xi.vercel.app',
    icon: FaDatabase,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
  },
]

const skills = [
  { name: 'Java', level: 85, color: '#ED8B00', icon: FaJava },
  { name: 'Python', level: 90, color: '#3776AB', icon: FaPython },
  { name: 'TensorFlow', level: 80, color: '#FF6F00', icon: SiTensorflow },
  { name: 'PyTorch', level: 75, color: '#EE4C2C', icon: SiPytorch },
  { name: 'scikit-learn', level: 85, color: '#F7931E', icon: SiScikitlearn },
  { name: 'MySQL', level: 80, color: '#4479A1', icon: SiMysql },
]

const certifications = [
  { title: 'Electronics Engineer License (ECE)', org: 'PRC', icon: '⚡' },
  { title: 'ICT Infrastructure Certification', org: 'Internetworking End Devices', icon: '🌐' },
  { title: 'Electronics Technician License (ECT)', org: 'PRC', icon: '🔧' },
  { title: 'Safety Officer 2', org: 'Occupational Safety', icon: '🛡️' },
  { title: 'PMP Certification Prep', org: '35-hour Training - May 2026', icon: '📊' },
  { title: 'Data Analyst Associate', org: 'DataCamp', icon: '📈' },
  { title: 'AI Engineer for Developers', org: 'DataCamp', icon: '🤖' },
]

type DemoType = 'fraud' | 'credit' | 'stock' | 'churn'

const demos: Record<DemoType, { title: string; endpoint: string; fields: { name: string; label: string; type: string; placeholder: string }[] }> = {
  fraud: {
    title: 'Fraud Detection',
    endpoint: 'https://fraud-api-ten.vercel.app/api',
    fields: [
      { name: 'amount', label: 'Amount ($)', type: 'number', placeholder: '1500' },
      { name: 'num_transactions_24h', label: 'Transactions (24h)', type: 'number', placeholder: '8' },
      { name: 'distance_from_home', label: 'Distance (km)', type: 'number', placeholder: '150' },
      { name: 'is_foreign', label: 'Foreign?', type: 'number', placeholder: '0 or 1' },
      { name: 'is_online', label: 'Online?', type: 'number', placeholder: '0 or 1' },
    ],
  },
  credit: {
    title: 'Credit Risk',
    endpoint: 'https://credit-api-zeta.vercel.app/api',
    fields: [
      { name: 'age', label: 'Age', type: 'number', placeholder: '35' },
      { name: 'income', label: 'Income ($)', type: 'number', placeholder: '75000' },
      { name: 'debt_to_income_ratio', label: 'Debt/Income', type: 'number', placeholder: '0.3' },
      { name: 'credit_score', label: 'Credit Score', type: 'number', placeholder: '720' },
      { name: 'previous_defaults', label: 'Defaults', type: 'number', placeholder: '0' },
    ],
  },
  stock: {
    title: 'Stock Predictor',
    endpoint: 'https://stock-api-phi-jet.vercel.app/api',
    fields: [
      { name: 'prices', label: 'Last 5 Prices', type: 'text', placeholder: '150,152,148,155,153' },
      { name: 'volumes', label: 'Last 5 Volumes', type: 'text', placeholder: '1000000,1200000,900000,1100000,1050000' },
      { name: 'days_to_predict', label: 'Days Ahead', type: 'number', placeholder: '1' },
    ],
  },
  churn: {
    title: 'Churn Predictor',
    endpoint: 'https://churn-api-zeta.vercel.app/api',
    fields: [
      { name: 'age', label: 'Age', type: 'number', placeholder: '45' },
      { name: 'tenure_months', label: 'Tenure (months)', type: 'number', placeholder: '24' },
      { name: 'balance', label: 'Balance ($)', type: 'number', placeholder: '50000' },
      { name: 'satisfaction_score', label: 'Satisfaction (1-5)', type: 'number', placeholder: '3' },
      { name: 'complaints', label: 'Complaints?', type: 'number', placeholder: '0 or 1' },
    ],
  },
}

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('fraud')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
      
      const sections = ['projects', 'skills', 'certifications', 'demos', 'contact']
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const demo = demos[activeDemo]
      const body: Record<string, any> = {}

      demo.fields.forEach((field) => {
        const value = formData[field.name]
        if (field.name === 'prices' || field.name === 'volumes') {
          body[field.name] = value.split(',').map((v: string) => parseFloat(v.trim()))
        } else {
          body[field.name] = parseFloat(value || '0')
        }
      })

      const res = await fetch(demo.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('API request failed')

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('Failed to get prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
              {['projects', 'skills', 'certifications', 'demos', 'contact'].map((item) => (
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
                I turn your business problems into smart, automated solutions. 
                From fraud detection to AI chatbots — let's build something that makes you money while you sleep.
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
                  { label: 'Projects', value: 15, suffix: '+' },
                  { label: 'Technologies', value: 18, suffix: '+' },
                  { label: 'Certifications', value: 7, suffix: '' },
                  { label: 'GitHub Repos', value: 22, suffix: '+' },
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        
                        <div className="mt-6 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-medium">View on GitHub</span>
                          <FaExternalLinkAlt size={12} />
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
                    { icon: FaDatabase, title: 'Databases', desc: 'MySQL, SQL Server, Oracle', color: 'from-green-500 to-emerald-500' },
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

        {/* Interactive Demos Section */}
        <section id="demos" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <motion.span 
                  className="text-blue-500 font-medium text-sm uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Interactive
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                  Live <span className="text-gradient">Demos</span>
                </h2>
                <p className="text-slate-500">
                  Test the ML APIs in real-time with interactive forms
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="glass rounded-2xl overflow-hidden">
                {/* Demo Tabs */}
                <div className="flex border-b border-white/10 overflow-x-auto">
                  {(Object.keys(demos) as DemoType[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveDemo(key)
                        setResult(null)
                        setError('')
                        setFormData({})
                      }}
                      className={`flex-1 min-w-[120px] px-6 py-4 text-sm font-medium transition-all ${
                        activeDemo === key
                          ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-400'
                          : 'text-slate-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {demos[key].title}
                    </button>
                  ))}
                </div>

                {/* Demo Content */}
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {demos[activeDemo].fields.map((field) => (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className="block text-sm font-medium text-slate-400 mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-600 transition-all hover:border-slate-600 focus:border-blue-500"
                            required
                          />
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Processing...
                        </span>
                      ) : (
                        'Get Prediction'
                      )}
                    </motion.button>
                  </form>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
                      >
                        {error}
                      </motion.div>
                    )}

                    {result && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-6"
                      >
                        {/* Fraud Detection Result */}
                        {activeDemo === 'fraud' && (
                          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className={`p-4 ${result.is_fraud ? 'bg-red-500/20 border-b border-red-500/30' : 'bg-green-500/20 border-b border-green-500/30'}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{result.is_fraud ? '🚨' : '✅'}</span>
                                  <div>
                                    <h4 className="font-bold text-lg">{result.is_fraud ? 'Fraud Detected' : 'Transaction Safe'}</h4>
                                    <p className="text-sm text-slate-400">Risk Level: <span className={`font-semibold ${result.risk_level === 'HIGH' ? 'text-red-400' : result.risk_level === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>{result.risk_level}</span></p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-gradient">{(result.fraud_probability * 100).toFixed(1)}%</div>
                                  <p className="text-xs text-slate-500">Fraud Probability</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="text-slate-400">Risk Score</span>
                                  <span className="text-slate-300">{(result.fraud_probability * 100).toFixed(1)}%</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.fraud_probability * 100}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className={`h-full rounded-full ${result.fraud_probability > 0.7 ? 'bg-gradient-to-r from-red-500 to-red-600' : result.fraud_probability > 0.4 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Amount</p>
                                  <p className="font-bold text-white">${result.input?.amount?.toLocaleString() || 'N/A'}</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Transactions (24h)</p>
                                  <p className="font-bold text-white">{result.input?.num_transactions_24h || 'N/A'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Credit Risk Result */}
                        {activeDemo === 'credit' && (
                          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className={`p-4 ${result.recommendation === 'APPROVE' ? 'bg-green-500/20 border-b border-green-500/30' : result.recommendation === 'REVIEW' ? 'bg-yellow-500/20 border-b border-yellow-500/30' : 'bg-red-500/20 border-b border-red-500/30'}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{result.recommendation === 'APPROVE' ? '✅' : result.recommendation === 'REVIEW' ? '⚠️' : '❌'}</span>
                                  <div>
                                    <h4 className="font-bold text-lg">{result.recommendation}</h4>
                                    <p className="text-sm text-slate-400">Risk Level: <span className={`font-semibold ${result.risk_level === 'VERY HIGH' || result.risk_level === 'HIGH' ? 'text-red-400' : result.risk_level === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>{result.risk_level}</span></p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-gradient">{(result.approval_probability * 100).toFixed(1)}%</div>
                                  <p className="text-xs text-slate-500">Approval Rate</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Risk Score</p>
                                  <p className="font-bold text-white">{(result.risk_score * 100).toFixed(1)}%</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Credit Score</p>
                                  <p className="font-bold text-white">{result.input?.credit_score || 'N/A'}</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Income</p>
                                  <p className="font-bold text-white">${result.input?.income?.toLocaleString() || 'N/A'}</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Debt Ratio</p>
                                  <p className="font-bold text-white">{result.input?.debt_to_income_ratio || 'N/A'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Stock Prediction Result */}
                        {activeDemo === 'stock' && (
                          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className={`p-4 ${result.trend === 'UP' ? 'bg-green-500/20 border-b border-green-500/30' : result.trend === 'DOWN' ? 'bg-red-500/20 border-b border-red-500/30' : 'bg-blue-500/20 border-b border-blue-500/30'}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{result.trend === 'UP' ? '📈' : result.trend === 'DOWN' ? '📉' : '📊'}</span>
                                  <div>
                                    <h4 className="font-bold text-lg">{result.trend === 'UP' ? 'Bullish Trend' : result.trend === 'DOWN' ? 'Bearish Trend' : 'Stable'}</h4>
                                    <p className="text-sm text-slate-400">Confidence: <span className="font-semibold text-blue-400">{(result.confidence * 100).toFixed(1)}%</span></p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-gradient">${result.predicted_price?.toFixed(2)}</div>
                                  <p className={`text-sm font-semibold ${result.price_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {result.price_change >= 0 ? '▲' : '▼'} ${Math.abs(result.price_change)?.toFixed(2)} ({result.price_change_percent?.toFixed(2)}%)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Predicted</p>
                                  <p className="font-bold text-green-400">${result.predicted_price?.toFixed(2)}</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Change</p>
                                  <p className={`font-bold ${result.price_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{result.price_change >= 0 ? '+' : ''}{result.price_change_percent?.toFixed(2)}%</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                                  <p className="text-xs text-slate-500 mb-1">Confidence</p>
                                  <p className="font-bold text-blue-400">{(result.confidence * 100).toFixed(1)}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Churn Prediction Result */}
                        {activeDemo === 'churn' && (
                          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl overflow-hidden">
                            <div className={`p-4 ${result.will_churn ? 'bg-red-500/20 border-b border-red-500/30' : 'bg-green-500/20 border-b border-green-500/30'}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{result.will_churn ? '⚠️' : '✅'}</span>
                                  <div>
                                    <h4 className="font-bold text-lg">{result.will_churn ? 'High Churn Risk' : 'Low Churn Risk'}</h4>
                                    <p className="text-sm text-slate-400">Risk Level: <span className={`font-semibold ${result.risk_level === 'HIGH' ? 'text-red-400' : result.risk_level === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>{result.risk_level}</span></p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-bold text-gradient">{(result.churn_probability * 100).toFixed(1)}%</div>
                                  <p className="text-xs text-slate-500">Churn Probability</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              {result.risk_factors && result.risk_factors.length > 0 && (
                                <div className="mb-6">
                                  <h5 className="text-sm font-semibold text-slate-400 mb-3">Risk Factors</h5>
                                  <div className="space-y-2">
                                    {result.risk_factors.map((factor: string, i: number) => (
                                      <div key={i} className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                                        <span>⚠️</span>
                                        <span>{factor}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {result.retention_recommendations && result.retention_recommendations.length > 0 && (
                                <div>
                                  <h5 className="text-sm font-semibold text-slate-400 mb-3">Recommendations</h5>
                                  <div className="space-y-2">
                                    {result.retention_recommendations.map((rec: string, i: number) => (
                                      <div key={i} className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 rounded-lg px-3 py-2">
                                        <span>💡</span>
                                        <span>{rec}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </ScrollReveal>
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
              © {new Date().getFullYear()} Emmanuel L. Alcazar Jr. — Licensed Electronics Engineer
            </motion.p>
          </div>
        </footer>

        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow z-50"
            >
              <FaArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}
