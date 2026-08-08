import { 
  FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, 
  FaRocket, FaCode,
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
    title: 'Building Rush AI Butler: An AI-Powered Portfolio Assistant',
    excerpt: 'How I built a production-ready conversational AI assistant with FastAPI, DeepSeek AI, session memory, webhooks, and rate limiting — deployed on Vercel serverless.',
    date: 'August 2026',
    readTime: '8 min read',
    tags: ['Python', 'FastAPI', 'DeepSeek AI', 'AI'],
    slug: 'rush-ai-butler',
  },
]

export const socialLinks: SocialLink[] = [
  { icon: FaGithub, href: 'https://github.com/emmanalcazarjr-ops', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/emmanalcazarjr/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:EmmanAlcazarJr@gmail.com', label: 'Email' },
  { icon: SiVercel, href: 'https://portfolio-elalcazarjr.vercel.app', label: 'Portfolio' },
]

export const stats = [
  { label: 'Projects', value: 1, suffix: '' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Certifications', value: 5, suffix: '' },
  { label: 'GitHub Repos', value: 11, suffix: '' },
]

export type RoadmapStatus = 'planned' | 'in-progress' | 'done'

export interface RoadmapItem {
  title: string
  status: RoadmapStatus
  note?: string
}

export interface RoadmapGroup {
  title: string
  icon: string
  items: RoadmapItem[]
}

export const roadmap: RoadmapGroup[] = [
  {
    title: 'Currently Working On',
    icon: '⚡',
    items: [
      { title: 'Expanding the AI/ML portfolio with new banking & finance projects', status: 'in-progress' },
      { title: 'Producing portfolio case studies and screenshots for GitHub repos', status: 'in-progress' },
      { title: 'Job search for AI/ML and software engineering roles', status: 'in-progress' },
      { title: 'Improving Rush AI Butler with more automation integrations', status: 'planned' },
    ],
  },
  {
    title: 'Short-Term Goals',
    icon: '🎯',
    items: [
      { title: 'Publish at least 3 polished case studies with business value', status: 'planned' },
      { title: 'Add screenshots and demo media to all public repositories', status: 'planned' },
      { title: 'Complete 1–2 new end-to-end machine learning projects', status: 'planned' },
      { title: 'Redeploy a flagship ML API as a live demo', status: 'planned' },
    ],
  },
  {
    title: 'Long-Term Goals',
    icon: '🚀',
    items: [
      { title: 'Land an AI/ML engineer role in banking or fintech', status: 'planned' },
      { title: 'Build production-grade intelligent systems end-to-end', status: 'planned' },
      { title: 'Specialize in deep learning for financial applications', status: 'planned' },
      { title: 'Grow a public technical brand through blog, talks, and open source', status: 'planned' },
    ],
  },
  {
    title: 'Learning Goals',
    icon: '📚',
    items: [
      { title: 'Deepen TensorFlow and PyTorch (advanced architectures)', status: 'in-progress' },
      { title: 'Advanced deep learning architectures (transformers, LLMs)', status: 'in-progress' },
      { title: 'MLOps: model serving, CI/CD for ML, monitoring', status: 'planned' },
      { title: 'n8n automation basics', status: 'done', note: 'Workflow automation with n8n' },
      { title: 'Complete DataCamp certifications', status: 'done', note: 'Data Analyst + AI Engineer Associate' },
    ],
  },
]

export const navItems = ['about', 'projects', 'roadmap', 'skills', 'certifications', 'blog', 'contact']
