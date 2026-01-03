import { PublicBusinessProfile } from '@/types/public-business';
import { SafeBusinessFields } from '@/types/db-business';
import { formatPhoneNumber, generateSlug, getCategoryDescription, calculateYearsActive } from '@/lib/utils';

/**
 * Transforms a raw database Business record into a safe PublicBusinessProfile
 * This function STRIPS all sensitive PII and enforces zero-trust data policy
 */
export function transformBusiness(business: SafeBusinessFields): PublicBusinessProfile {
  const isVerified = business.status === 'Eligible' || business.status === 'Disbursed';
  
  return {
    id: business.id,
    name: business.businessName,
    slug: generateSlug(business.businessName, business.businessLGA),
    category: business.businessRegCatType,
    description: getCategoryDescription(business.businessRegCatType),
    location: {
      address: business.businessAddress || '',
      lga: business.businessLGA,
      ward: business.businessWard || '',
      coordinates: business.latitude && business.longitude
        ? { lat: business.latitude, lng: business.longitude }
        : null,
    },
    contact: {
      phone: formatPhoneNumber(business.phone),
      email: business.email || null,
      website: business.website || null,
    },
    media: {
      heroImage: business.ownerAtBusinessPhotoUrl || '/placeholder-business.jpg',
      logo: null, // Can be extended later
    },
    metadata: {
      isVerified,
      yearsActive: calculateYearsActive(business.createdAt),
      memberSince: business.createdAt.toISOString(),
    },
  };
}

