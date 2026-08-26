import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aydan-sharifova-portfolio.nadyy777.chatgpt.site'),
  title: 'Aydan Şərifova | Full-Stack Developer',
  description: 'Full-Stack Developer specializing in modern web applications, scalable backend systems, real-time technologies and AI-powered products.',
  openGraph: {
    title: 'Aydan Şərifova | Full-Stack Developer',
    description: 'I architect fast, thoughtful digital products where precise engineering meets a distinct visual point of view.',
    type: 'website',
    images: [{ url: 'https://aydan-sharifova-portfolio.nadyy777.chatgpt.site/og.png', width: 1731, height: 909, alt: 'Aydan Şərifova — Full-Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aydan Şərifova | Full-Stack Developer',
    description: 'Premium full-stack product engineering and digital experiences.',
    images: ['https://aydan-sharifova-portfolio.nadyy777.chatgpt.site/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
