import { 
  FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, 
  FaRocket, FaCode, FaShieldAlt,
  FaRobot, FaDatabase, FaJava, FaPython,
  FaCalendar, FaClock, FaTag
} from 'react-icons/fa'
import { 
  SiTensorflow, SiPytorch, SiScikitlearn, SiMysql, SiVercel
} from 'react-icons/si'
import { IconType } from 'react-icons'

export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  live?: string
  icon: IconType
  gradient: string
  badge?: string
  featured?: boolean
}

export interface Skill {
  name: string
  level: number
  color: string
  icon: IconType
}

export interface Certification {
  title: string
  org: string
  icon: string
}

export interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  slug: string
}

export interface SocialLink {
  icon: IconType
  href: string
  label: string
}

export const projects: Project[] = [
  {
    title: 'Rush AI Butler',
    description: 'AI-powered customer support chatbot with conversation memory, webhook support, and rate limiting. Powered by DeepSeek AI for intelligent responses.',
    tech: ['Python', 'DeepSeek AI', 'FastAPI', 'Chatbot'],
    github: 'https://github.com/emmanalcazarjr-ops/chatbot-api',
    live: 'https://chatbot-api-two-teal.vercel.app',
    icon: FaRobot,
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    featured: true,
  },
  {
    title: 'Iris Classifier',
    description: 'Classic machine learning classification model using scikit-learn to classify iris flower species. Features include data visualization and model evaluation.',
    tech: ['Python', 'scikit-learn', 'pandas', 'matplotlib'],
    github: 'https://github.com/emmanalcazarjr-ops/iris-classifier',
    icon: FaCode,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
  },
  {
    title: 'Spam Email Detector',
    description: 'Natural language processing model to detect spam emails using scikit-learn. Features include text preprocessing, TF-IDF vectorization, and classification.',
    tech: ['Python', 'scikit-learn', 'NLP', 'TF-IDF'],
    github: 'https://github.com/emmanalcazarjr-ops/spam-email-detector',
    icon: FaShieldAlt,
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
  },
  {
    title: 'Core Banking System',
    description: 'Java CLI banking application with account management, transaction processing, and financial reporting. Built with Maven and MySQL.',
    tech: ['Java', 'Maven', 'MySQL', 'JDBC'],
    github: 'https://github.com/emmanalcazarjr-ops/core-banking-system',
    icon: FaDatabase,
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    featured: true,
  },
]

export const skills: Skill[] = [
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

export const certifications: Certification[] = [
  { title: 'Electronics Engineer License (ECE)', org: 'PRC', icon: '⚡' },
  { title: 'Electronics Technician License (ECT)', org: 'PRC', icon: '🔧' },
  { title: 'ICT Infrastructure Certification', org: 'Internetworking End Devices', icon: '🌐' },
  { title: 'Data Analyst Associate', org: 'DataCamp', icon: '📈' },
  { title: 'AI Engineer for Developers', org: 'DataCamp', icon: '🤖' },
]

export const blogPosts: BlogPost[] = [
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

export const socialLinks: SocialLink[] = [
  { icon: FaGithub, href: 'https://github.com/emmanalcazarjr-ops', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/emmanalcazarjr/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:EmmanAlcazarJr@gmail.com', label: 'Email' },
  { icon: SiVercel, href: 'https://portfolio-elalcazarjr.vercel.app', label: 'Portfolio' },
]

export const stats = [
  { label: 'Projects', value: 4, suffix: '' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Certifications', value: 5, suffix: '' },
  { label: 'GitHub Repos', value: 15, suffix: '+' },
]

export const navItems = ['about', 'projects', 'skills', 'certifications', 'blog', 'contact']
