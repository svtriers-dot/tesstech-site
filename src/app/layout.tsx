import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});

const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tess Technology — Анализ рынков и экономическое моделирование',
    template: '%s | Tess Technology',
  },
  description:
    'Tess Technology — анализ рынков, социальное и экономическое моделирование. 300+ успешных кейсов, 20+ экспертов, 10+ лет на рынке.',
  keywords: [
    'анализ рынков',
    'экономическое моделирование',
    'машинное обучение',
    'базы данных',
    'форсайт',
    'стратегические сессии',
  ],
  authors: [{ name: 'Tess Technology' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://tesstech.ru',
    siteName: 'Tess Technology',
    title: 'Tess Technology — Анализ рынков и экономическое моделирование',
    description:
      'Анализ рынков, социальное и экономическое моделирование. 300+ успешных кейсов.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0A0F] text-[#F0F0F5] min-h-screen`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
