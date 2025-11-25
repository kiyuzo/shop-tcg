import './globals.css'
import type { Metadata } from 'next'
import { Inter, Noto_Serif_JP } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatBot from '@/components/ChatBot'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KON - Japanese TCG Marketplace',
  description: 'Discover rare trading cards with Japanese minimalist elegance',
  keywords: 'trading cards, TCG, Japanese marketplace, collectibles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerifJP.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatBot />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#171717',
              color: '#fafafa',
              border: '1px solid #404040',
              padding: '16px',
              borderRadius: '0',
            },
          }}
        />
      </body>
    </html>
  )
}
