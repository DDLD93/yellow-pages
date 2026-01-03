'use server';

import { db } from '@/lib/db';
import { transformBusiness } from './transform-business';
import { PublicBusinessProfile } from '@/types/public-business';

export async function getBusinessById(id: string): Promise<PublicBusinessProfile | null> {
  const business = await db.business.findUnique({
    where: { id },
    // Explicitly select only safe fields
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
      // Explicitly exclude sensitive fields
    },
  });

  if (!business) {
    return null;
  }

  // Additional security: reject if status is not Eligible/Disbursed
  if (business.status !== 'Eligible' && business.status !== 'Disbursed') {
    return null;
  }

  return transformBusiness(business);
}

