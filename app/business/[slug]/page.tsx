import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBusinessBySlug } from '@/actions/get-business-by-slug';
import BusinessDetail from '@/components/business-detail';
import { generateBusinessMetadata, generateLocalBusinessStructuredData } from '@/lib/metadata';

export const dynamic = 'force-dynamic';

interface BusinessPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    return {
      title: 'Business Not Found - Kaduna Business Connect',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return generateBusinessMetadata(business);
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const structuredData = generateLocalBusinessStructuredData(business);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BusinessDetail business={business} />
    </>
  );
}

