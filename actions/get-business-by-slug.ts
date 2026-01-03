'use server';

import { db } from '@/lib/db';
import { transformBusiness } from './transform-business';
import { generateSlug } from '@/lib/utils';
import { PublicBusinessProfile } from '@/types/public-business';

export async function getBusinessBySlug(slug: string): Promise<PublicBusinessProfile | null> {
  // Find business by matching the generated slug
  // Since we don't store slugs, we need to query and match
  const businesses = await db.business.findMany({
    where: {
      status: {
        in: ['Eligible', 'Disbursed'],
      },
    },
    select: {
      id: true,
      businessName: true,
      businessRegCatType: true,
      businessLGA: true,
      businessWard: true,
      businessAddress: true,
      ownerAtBusinessPhotoUrl: true,
      status: true,
      phone: true,
      email: true,
      website: true,
      latitude: true,
      longitude: true,
      createdAt: true,
    },
  });

  // Find the business that matches the slug
  const business = businesses.find((b) => {
    const businessSlug = generateSlug(b.businessName, b.businessLGA);
    return businessSlug === slug;
  });

  if (!business) {
    return null;
  }

  return transformBusiness(business);
}

