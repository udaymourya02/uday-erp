import { Metadata } from 'next'

export const metadata = {
  title: 'ERP System | Your Company Name',
  description: 'Enterprise Resource Planning system for managing inventory, sales, production, finance, and HR',
  keywords: 'ERP, inventory management, sales management, production management, finance management, HR management',
  openGraph: {
    title: 'ERP System | Your Company Name',
    description: 'Enterprise Resource Planning system for managing inventory, sales, production, finance, and HR',
    url: 'https://your-domain.com',
    siteName: 'ERP System',
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}