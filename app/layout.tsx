import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Karla as V0_Font_Karla } from 'next/font/google'

// Initialize fonts
const _karla = V0_Font_Karla({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800"], variable: '--v0-font-karla' })
const _v0_fontVariables = `${_karla.variable}`

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable} ${_v0_fontVariables}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
