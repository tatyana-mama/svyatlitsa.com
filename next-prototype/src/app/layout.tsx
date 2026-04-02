import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'svyatlitsa — aesthetic dentistry',
  description: 'Прастора, дзе тэхналогіі сустракаюць чалавечнасць. Стаматалогія новага пакалення.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="be" className={mono.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
