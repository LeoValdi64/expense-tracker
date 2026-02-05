import type { Metadata, Viewport } from 'next';
import './globals.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ExpenseWise',
  url: 'https://expense-tracker-leovaldi64.vercel.app',
  description:
    'Track income and expenses with category breakdowns, monthly summaries, and powerful filtering. Free budget tool.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  browserRequirements: 'Requires a modern web browser',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://expense-tracker-leovaldi64.vercel.app'),
  title: 'ExpenseWise - Smart Expense Tracker',
  description:
    'Track income and expenses with category breakdowns, monthly summaries, and powerful filtering. Free budget tool.',
  keywords: ['expense tracker', 'budget', 'finance', 'money management', 'income', 'expenses'],
  authors: [{ name: 'ExpenseWise' }],
  alternates: {
    canonical: 'https://expense-tracker-leovaldi64.vercel.app',
  },
  openGraph: {
    title: 'ExpenseWise - Smart Expense Tracker',
    description:
      'Track income and expenses with category breakdowns, monthly summaries, and powerful filtering.',
    url: 'https://expense-tracker-leovaldi64.vercel.app',
    siteName: 'ExpenseWise',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ExpenseWise - Smart Expense Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExpenseWise - Smart Expense Tracker',
    description:
      'Track income and expenses with category breakdowns, monthly summaries, and powerful filtering.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
