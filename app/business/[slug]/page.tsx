import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBusinessBySlug } from '@/actions/get-business-by-slug';
import BusinessDetail from '@/components/business-detail';

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
    };
  }

  return {
    title: `${business.name} in ${business.location.lga} - Kaduna Business Connect`,
    description: `Contact ${business.name} for ${business.category} services in Kaduna State.`,
    openGraph: {
      title: `${business.name} in ${business.location.lga}`,
      description: `Contact ${business.name} for ${business.category} services in Kaduna State.`,
    },
  };
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return <BusinessDetail business={business} />;
}

