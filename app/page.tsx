'use client'

import { useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  {
    title: 'Core Banking System',
    description: 'CLI-based banking application with transaction processing, role-based access, and ACID compliance.',
    tech: ['Java', 'MySQL', 'Maven', 'JDBC'],
    github: 'https://github.com/emmanalcazarjr-ops/core-banking-system',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Fraud Detection System',
    description: 'ML-based fraud detection using Random Forest with feature engineering and real-time predictions.',
    tech: ['Python', 'scikit-learn', 'pandas', 'NumPy'],
    github: 'https://github.com/emmanalcazarjr-ops/fraud-detection-system',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Credit Risk Predictor',
    description: 'Deep learning model to predict loan default risk using neural networks with TensorFlow.',
    tech: ['Python', 'TensorFlow', 'pandas', 'NumPy'],
    github: 'https://github.com/emmanalcazarjr-ops/credit-risk-predictor',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Stock Price Predictor',
    description: 'LSTM-based neural network for stock price forecasting with confidence intervals.',
    tech: ['Python', 'PyTorch', 'NumPy', 'pandas'],
    github: 'https://github.com/emmanalcazarjr-ops/stock-price-predictor',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Customer Churn Predictor',
    description: 'Predict customer churn using Gradient Boosting with SHAP explainability.',
    tech: ['Python', 'scikit-learn', 'SHAP', 'XGBoost'],
    github: 'https://github.com/emmanalcazarjr-ops/customer-churn-predictor',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Sentiment Analysis Tool',
    description: 'NLP-based sentiment analysis for text using TextBlob with preprocessing pipeline.',
    tech: ['Python', 'TextBlob', 'pandas', 'NLP'],
    github: 'https://github.com/emmanalcazarjr-ops/sentiment-analysis-tool',
    color: 'from-indigo-500 to-violet-500',
  },
]

const techStack = [
  { name: 'Java', color: 'bg-orange-600' },
  { name: 'Python', color: 'bg-blue-600' },
  { name: 'MySQL', color: 'bg-blue-800' },
  { name: 'TensorFlow', color: 'bg-orange-500' },
  { name: 'PyTorch', color: 'bg-red-600' },
  { name: 'scikit-learn', color: 'bg-orange-400' },
  { name: 'pandas', color: 'bg-blue-900' },
  { name: 'NumPy', color: 'bg-blue-700' },
  { name: 'Maven', color: 'bg-red-700' },
  { name: 'SHAP', color: 'bg-purple-600' },
  { name: 'Git', color: 'bg-red-500' },
  { name: 'REST APIs', color: 'bg-green-600' },
]

type DemoType = 'fraud' | 'credit' | 'stock' | 'churn'

interface DemoForm {
  title: string
  endpoint: string
  fields: { name: string; label: string; type: string; placeholder: string }[]
}

const demos: Record<DemoType, DemoForm> = {
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
    <main className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold gradient-text">EA</a>
          <div className="flex gap-6">
            <a href="#projects" className="text-slate-400 hover:text-white transition">Projects</a>
            <a href="#demos" className="text-slate-400 hover:text-white transition">Demos</a>
            <a href="#contact" className="text-slate-400 hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="gradient-text">Emmanuel</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8">
            Licensed Electronics Engineer | Software Engineer | ML Developer
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            I build intelligent systems that solve real-world problems. 
            Passionate about software engineering, machine learning, and data-driven solutions in banking & finance.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-slate-700 hover:border-slate-500 rounded-lg font-medium transition"
            >
              Contact Me
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-10">
            <a href="https://github.com/emmanalcazarjr-ops" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/emmanalcazarjr/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:EmmanAlcazarJr@gmail.com" className="text-slate-500 hover:text-white transition">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-slate-400">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className={`${tech.color} px-4 py-2 rounded-full text-sm font-medium text-white`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses & Certifications */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-400">Licenses & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Electronics Engineer License (ECE)</h3>
                <p className="text-slate-400 text-sm">Licensed Professional - PRC</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🌐</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">ICT Infrastructure Certification</h3>
                <p className="text-slate-400 text-sm">Internetworking End Devices</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔧</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Electronics Technician License (ECT)</h3>
                <p className="text-slate-400 text-sm">Licensed Professional - PRC</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Safety Officer 2</h3>
                <p className="text-slate-400 text-sm">Occupational Safety Certified</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">PMP Certification Prep</h3>
                <p className="text-slate-400 text-sm">Certificate of Completion - 35-hour Training, May 2026</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📈</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Data Analyst Associate Certification</h3>
                <p className="text-slate-400 text-sm">DataCamp Certified</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-start gap-4 md:col-span-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Engineer for Developers Associate Certification</h3>
                <p className="text-slate-400 text-sm">DataCamp Certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
          <p className="text-slate-500 text-center mb-12">Click to view on GitHub</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover block bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-600"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center mb-4`}>
                  <FaExternalLinkAlt size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 bg-slate-800 rounded-full text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section id="demos" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Live Demos</h2>
          <p className="text-slate-500 text-center mb-10">Test the ML APIs in real-time</p>

          {/* Demo Tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {(Object.keys(demos) as DemoType[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveDemo(key)
                  setResult(null)
                  setError('')
                  setFormData({})
                }}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeDemo === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {demos[key].title}
              </button>
            ))}
          </div>

          {/* Demo Form */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {demos[activeDemo].fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      required
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-lg font-medium transition"
              >
                {loading ? 'Predicting...' : 'Get Prediction'}
              </button>
            </form>

            {/* Result */}
            {error && (
              <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400">
                {error}
              </div>
            )}
            {result && (
              <div className="mt-6 p-6 bg-slate-800/50 border border-slate-700 rounded-lg animate-fade-in">
                <h4 className="text-lg font-bold mb-4 text-blue-400">Result</h4>
                <pre className="text-sm text-slate-300 overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-slate-500 mb-10">Feel free to reach out for opportunities or collaborations</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:EmmanAlcazarJr@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-600 transition"
            >
              <FaEnvelope size={20} className="text-blue-400" />
              <span>EmmanAlcazarJr@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/emmanalcazarjr/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-600 transition"
            >
              <FaLinkedin size={20} className="text-blue-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/emmanalcazarjr-ops"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-600 transition"
            >
              <FaGithub size={20} className="text-blue-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-600 text-sm">
          <p>Built with Next.js & Vercel</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Emmanuel L. Alcazar Jr.</p>
        </div>
      </footer>
    </main>
  )
}
