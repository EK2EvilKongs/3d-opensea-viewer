import type { Metadata } from 'next';
import { Jersey_15 } from 'next/font/google';
import './globals.css';

const genos = Jersey_15({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'Goblin Saga',
  description: 'Embark on an exciting adventure in the NFT DeFi world with Goblin Saga mining, where every click counts and every decision matters. Become a digital mining tycoon as you build and expand your empire and get ready to dive into a world full of challenges, strategies and thrills as you master the art of digital mining.',
  keywords: ['Polygon', 'NFTs', 'Staking'],

  metadataBase: new URL('https://goblinsaga.xyz'),
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Goblin Saga',
    description: 'Embark on an exciting adventure in the NFT DeFi world with Goblin Saga mining, where every click counts and every decision matters. Become a digital mining tycoon as you build and expand your empire and get ready to dive into a world full of challenges, strategies and thrills as you master the art of digital mining.',
    url: 'https://goblinsaga.xyz',
    siteName: 'Goblin Saga',
    images: [
      {
        url: '/social-icon.png',
        width: 1200,
        height: 630,
        alt: 'Goblin Saga',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@goblinsaga_xyz',
    creator: '@OutlawsDev',
    title: 'Goblin Saga',
    description: 'Embark on an exciting adventure in the NFT DeFi world with Goblin Saga mining, where every click counts and every decision matters. Become a digital mining tycoon as you build and expand your empire and get ready to dive into a world full of challenges, strategies and thrills as you master the art of digital mining.',
    images: ['/social-icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${genos.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}