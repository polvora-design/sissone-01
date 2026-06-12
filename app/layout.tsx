import type { Metadata } from 'next'

import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Karla, Source_Code_Pro, Karla as V0_Font_Karla, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _karla = V0_Font_Karla({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800"], variable: '--v0-font-karla' })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"], variable: '--v0-font-geist-mono' })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"], variable: '--v0-font-source-serif-4' })
const _v0_fontVariables = `${_karla.variable} ${_geistMono.variable} ${_sourceSerif_4.variable}`

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-sans',
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Sissone',
  description: 'For those who want to learn, teach, and live dance.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${karla.variable} ${sourceCodePro.variable} ${GeistMono.variable} antialiased`}
    >
      <body className={`font-sans bg-background text-foreground ${_v0_fontVariables}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
