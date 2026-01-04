import { Metadata } from 'next';
import { PublicBusinessProfile } from '@/types/public-business';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const siteName = 'Kaduna Business Connect';
const defaultDescription = 'Discover verified businesses in Kaduna State, Nigeria. Official Kaduna State business directory connecting customers with trusted local businesses.';
const defaultKeywords = [
  'Kaduna',
  'Nigeria',
  'business directory',
  'local businesses',
  'Kaduna State',
  'business finder',
  'verified businesses',
  'LGA',
  'local government',
];

export interface BaseMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noindex?: boolean;
}

/**
 * Generate base metadata for pages
 */
export function generateMetadata(options: BaseMetadataOptions = {}): Metadata {
  const {
    title,
    description = defaultDescription,
    keywords = defaultKeywords,
    image = `${siteUrl}/og-image.png`,
    url = siteUrl,
    noindex = false,
  } = options;

  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Kaduna State Government' }],
    creator: 'Kaduna State Government',
    publisher: 'Kaduna State Government',
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#0D7B5D' },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: 'en_NG',
      url,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@kdsg',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'geo.region': 'NG-KD',
      'geo.placename': 'Kaduna State',
      'geo.position': '10.5105;7.4165',
      'ICBM': '10.5105, 7.4165',
    },
  };
}

/**
 * Generate metadata for business detail pages
 */
export function generateBusinessMetadata(business: PublicBusinessProfile): Metadata {
  const businessUrl = `${siteUrl}/business/${business.slug}`;
  const businessImage = business.media.heroImage || `${siteUrl}/og-image.png`;
  const businessTitle = `${business.name} in ${business.location.lga} - ${siteName}`;
  const businessDescription = `${business.name} offers ${business.category} services in ${business.location.lga}, Kaduna State. ${business.description || ''} Contact: ${business.contact.phone}${business.contact.email ? ` | ${business.contact.email}` : ''}`;

  return {
    ...generateMetadata({
      title: `${business.name} in ${business.location.lga}`,
      description: businessDescription,
      keywords: [
        business.name,
        business.category,
        business.location.lga,
        'Kaduna',
        'Nigeria',
        'business directory',
        'local business',
      ],
      image: businessImage,
      url: businessUrl,
    }),
    openGraph: {
      type: 'website',
      locale: 'en_NG',
      url: businessUrl,
      siteName,
      title: `${business.name} in ${business.location.lga}`,
      description: businessDescription,
      images: [
        {
          url: businessImage,
          width: 1200,
          height: 630,
          alt: `${business.name} - ${business.category}`,
        },
      ],
    },
  };
}

/**
 * Generate LocalBusiness structured data (JSON-LD)
 */
export function generateLocalBusinessStructuredData(business: PublicBusinessProfile): object {
  const baseUrl = siteUrl;
  const businessUrl = `${baseUrl}/business/${business.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description || `${business.category} services in ${business.location.lga}, Kaduna State`,
    image: business.media.heroImage || `${baseUrl}/logo.png`,
    url: businessUrl,
    telephone: business.contact.phone,
    email: business.contact.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.location.address || undefined,
      addressLocality: business.location.ward || business.location.lga,
      addressRegion: 'Kaduna State',
      addressCountry: 'NG',
    },
    geo: business.location.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: business.location.coordinates.lat,
      longitude: business.location.coordinates.lng,
    } : undefined,
    areaServed: {
      '@type': 'City',
      name: business.location.lga,
      addressRegion: 'Kaduna State',
      addressCountry: 'NG',
    },
    ...(business.contact.website ? { sameAs: [business.contact.website] } : {}),
  };
}

/**
 * Generate Organization structured data (JSON-LD)
 */
export function generateOrganizationStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Kaduna State',
      addressCountry: 'NG',
    },
    sameAs: [
      'https://kdsg.gov.ng',
    ],
  };
}

/**
 * Generate WebSite structured data (JSON-LD)
 */
export function generateWebSiteStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

