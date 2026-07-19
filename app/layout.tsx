import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Emmanuel Alcazar Jr. | Software Engineer & ML Developer',
  description: 'Licensed Electronics Engineer | Software Engineer | Data Science & ML Developer',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="gradient-bg min-h-screen">{children}</body>
    </html>
  )
}
