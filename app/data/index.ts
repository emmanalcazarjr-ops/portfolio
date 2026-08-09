import { 
  FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, 
  FaRocket, FaCode, FaFileAlt,
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
    gradient: 'from-blue-600 to-cyan-500',
    featured: true,
  },
  {
    title: 'Automated Report Generator',
    description: 'Upload CSV data and get a formatted performance report with KPIs, trends, and AI-written insights — automatically.',
    tech: ['Python', 'FastAPI', 'DeepSeek AI', 'Vercel'],
    github: 'https://github.com/emmanalcazarjr-ops/automated-report-generator',
    live: 'https://automated-report-generator.vercel.app',
    icon: FaFileAlt,
    gradient: 'from-cyan-500 via-blue-500 to-violet-500',
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
  { title: 'Workflow Automation with n8n', org: 'DataCamp', icon: '⚙️' },
  { title: 'Python', org: 'DataCamp', icon: '🐍' },
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
  { label: 'Projects', value: 2, suffix: '' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Certifications', value: 7, suffix: '' },
  { label: 'GitHub Repos', value: 15, suffix: '' },
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
      { title: 'Building AI automation projects that solve real business problems', status: 'in-progress' },
      { title: 'Connecting AI APIs (OpenAI, Claude, Gemini, DeepSeek) to automation tools like n8n, Zapier, and Make', status: 'in-progress' },
      { title: 'Producing case studies that show business value (hours saved, manual work reduced)', status: 'in-progress' },
      { title: 'Job search for AI automation and AI/ML roles', status: 'in-progress' },
    ],
  },
  {
    title: 'Short-Term Goals',
    icon: '🎯',
    items: [
      { title: 'Ship the Automated Report Generator with a live demo', status: 'done' },
      { title: 'Wire the full stack: Supabase + Obsidian + Vercel auto-publish', status: 'done' },
      { title: 'Ship the Data Reconciliation & Exception Monitor', status: 'planned' },
      { title: 'Launch the "Automation Audit" tool that turns visitors into leads', status: 'planned', note: 'Free self-serve report that lands straight in my Supabase leads' },
      { title: 'Build an Internal AI Knowledge Assistant', status: 'planned' },
      { title: 'Build a KPI Dashboard (Power BI / Looker Studio) on top of the report pipeline', status: 'planned' },
      { title: 'Publish case studies and screenshots for each project', status: 'planned' },
    ],
  },
  {
    title: 'Long-Term Goals',
    icon: '🚀',
    items: [
      { title: 'Land an AI automation role and progress into AI/ML engineering', status: 'planned' },
      { title: 'Build production-grade AI systems end-to-end', status: 'planned' },
      { title: 'Grow a public technical brand through blog, talks, and open source', status: 'planned' },
    ],
  },
  {
    title: 'Learning Goals',
    icon: '📚',
    items: [
      { title: 'n8n automation', status: 'done', note: 'Workflow automation with n8n' },
      { title: 'DataCamp certifications', status: 'done', note: 'Data Analyst + AI Engineer Associate' },
      { title: 'SQL and Python', status: 'in-progress' },
      { title: 'AI APIs: OpenAI, Claude, Gemini, DeepSeek', status: 'in-progress' },
      { title: 'Zapier, Make, GoHighLevel, Power Automate', status: 'in-progress' },
      { title: 'Excel/Google Sheets automation', status: 'planned' },
      { title: 'Power BI / Looker Studio / Tableau', status: 'planned' },
      { title: 'Basic machine learning', status: 'planned', note: 'Path to AI/ML engineering' },
    ],
  },
]

export interface NavItem {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'stack', label: 'Stack', href: '#stack' },
  { id: 'roadmap', label: 'Roadmap', href: '#roadmap' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'notes', label: 'Notes', href: '/notes' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]
