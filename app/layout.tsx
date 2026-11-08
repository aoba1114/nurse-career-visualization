import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Geist_Mono } from 'next/font/google'
import './globals.css'

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nurse-canvas.com'),
  title: {
    default: 'ナースキャンバス | 看護師のキャリアを可視化する',
    template: '%s | ナースキャンバス',
  },
  description:
    'ナースキャンバスは、看護師にはどんなキャリアパスがあるのか、実際に歩んだ人の事例から自分の将来を考えられるサービスです。病院勤務から一般企業、大学院、助産師、海外、行政まで、幅広いキャリアを紹介します。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ナースキャンバス',
    title: 'ナースキャンバス | 看護師のキャリアを可視化する',
    description:
      '看護師の多様なキャリアを、実際に歩んだ人の事例から考えるためのサービスです。',
    url: 'https://www.nurse-canvas.com',
  },
  twitter: {
    card: 'summary',
    title: 'ナースキャンバス | 看護師のキャリアを可視化する',
    description:
      '看護師の多様なキャリアを、実際に歩んだ人の事例から考えるためのサービスです。',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className={`bg-background ${notoSansJp.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
