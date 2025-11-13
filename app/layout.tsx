import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MBTI Personality Quiz',
  description: 'Discover your personality type in 2 minutes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
