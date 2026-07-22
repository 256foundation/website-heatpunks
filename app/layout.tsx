import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/data/site';
import { pages } from '@/data/pages';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const home = pages.home;

export const metadata: Metadata = {
  title: {
    default: home.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: home.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: home.title,
    description: home.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/api/og?card=home',
        width: 1200,
        height: 630,
        alt: home.og.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@HashHeatpunks',
    creator: '@HashHeatpunks',
    title: home.title,
    description: home.description,
    images: ['/api/og?card=home'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Hashrate Heatpunks',
              alternateName: 'Heatpunks',
              url: 'https://heatpunks.org',
              logo: 'https://heatpunks.org/images/logo.png',
              foundingDate: '2024',
              description: 'A community of bitcoiners and heating industry specialists advancing the hashrate heating industry.',
              parentOrganization: {
                '@type': 'Organization',
                name: '256 Foundation',
                url: 'https://256foundation.org',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Denver',
                addressRegion: 'CO',
                addressCountry: 'US',
              },
              sameAs: [
                'https://x.com/HashHeatpunks',
                'https://forum.heatpunks.org',
                'https://t.me/heatpunks',
                'https://primal.net/heatpunks',
              ],
            }),
          }}
        />
        {/* Umami Analytics - only if configured */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
