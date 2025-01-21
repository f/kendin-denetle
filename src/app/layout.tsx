import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kendin Denetle',
  description: 'Hayatınızdaki önemli şeyler için kontrol listeleri',
  manifest: '/manifest.json',
  themeColor: '#0F172A',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-primary antialiased`}>
        <main className="min-h-screen max-w-2xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center py-8 text-sm text-secondary">
          <p>
            <a href="https://github.com/f/kendindenetle" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github mr-1"></i>
              github.com/f/kendindenetle
            </a>
          </p>
          <p className="mt-1">
            <a href="https://creativecommons.org/publicdomain/zero/1.0/" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
              CC0 Lisansı ile lisanslanmış özgür bir projedir.
            </a>
          </p>
        </footer>
      </body>
    </html>
  )
}