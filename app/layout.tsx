import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-elalcazarjr.vercel.app'),
  title: 'Emmanuel Alcazar Jr. | Software Engineer & ML Developer',
  description: 'Licensed Electronics Engineer specializing in Software Engineering, Machine Learning, and AI-powered applications for banking, finance, and enterprise solutions.',
  keywords: ['Software Engineer', 'Machine Learning', 'Python', 'Java', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Emmanuel L. Alcazar Jr.' }],
  creator: 'Emmanuel L. Alcazar Jr.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-elalcazarjr.vercel.app',
    siteName: 'Emmanuel Alcazar Jr. Portfolio',
    title: 'Emmanuel Alcazar Jr. | Software Engineer & ML Developer',
    description: 'Licensed Electronics Engineer specializing in Software Engineering, Machine Learning, and AI-powered applications.',
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
    title: 'Emmanuel Alcazar Jr. | Software Engineer & ML Developer',
    description: 'Licensed Electronics Engineer specializing in Software Engineering, Machine Learning, and AI-powered applications.',
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
