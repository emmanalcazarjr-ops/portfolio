import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-elalcazarjr.vercel.app'),
  title: 'Emmanuel Alcazar Jr. | AI Automation & Solutions Specialist',
  description: 'Licensed Electronics Engineer specializing in AI Automation, Autonomous Agents, and High-ROI Business Workflows with n8n, Python, TypeScript, and Google Gemini AI.',
  keywords: ['AI Automation', 'AI Solutions Specialist', 'Autonomous Agents', 'n8n Automation', 'Electronics Engineer', 'AI/ML Developer', 'Intelligent Systems', 'Python', 'FastAPI', 'TypeScript', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Emmanuel L. Alcazar Jr.' }],
  creator: 'Emmanuel L. Alcazar Jr.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-elalcazarjr.vercel.app',
    siteName: 'Emmanuel Alcazar Jr. Portfolio',
    title: 'Emmanuel Alcazar Jr. | AI Automation & Solutions Specialist',
    description: 'Licensed Electronics Engineer building autonomous AI agents, n8n workflows, and intelligent applications that eliminate manual work.',
    images: [
      {
        url: '/PFP.jpg',
        width: 1200,
        height: 630,
        alt: 'Emmanuel Alcazar Jr.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emmanuel Alcazar Jr. | AI Automation & Solutions Specialist',
    description: 'Licensed Electronics Engineer building autonomous AI agents, n8n workflows, and intelligent applications that eliminate manual work.',
    images: ['/PFP.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://portfolio-elalcazarjr.vercel.app" />
      </head>
      <body className="gradient-bg min-h-screen">{children}</body>
    </html>
  )
}
