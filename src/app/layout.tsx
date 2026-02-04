import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  title: 'ExpenseWise - Smart Expense Tracker',
  description:
    'Track your income and expenses with ExpenseWise. A clean, modern expense tracker with category breakdowns, monthly summaries, and powerful filtering.',
  keywords: ['expense tracker', 'budget', 'finance', 'money management', 'income', 'expenses'],
  authors: [{ name: 'ExpenseWise' }],
  openGraph: {
    title: 'ExpenseWise - Smart Expense Tracker',
    description:
      'Track your income and expenses with ExpenseWise. Category breakdowns, monthly summaries, and more.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExpenseWise - Smart Expense Tracker',
    description:
      'Track your income and expenses with ExpenseWise. Category breakdowns, monthly summaries, and more.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a]">{children}</body>
    </html>
  );
}
