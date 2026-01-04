'use server';

import { db } from '@/lib/db';
import { transformBusiness } from './transform-business';
import { BusinessFilters, PublicBusinessProfile } from '@/types/public-business';
import { logSearch } from './log-search';

export async function getBusinesses(filters: BusinessFilters = {}): Promise<{
  businesses: PublicBusinessProfile[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const {
    query,
    lga,
    category = [],
    verified,
    page = 1,
    limit = 12,
  } = filters;

  // Build where clause with zero-trust filtering
  const where: any = {
    // STRICT: Only show Eligible or Disbursed businesses
    status: {
      in: ['Eligible', 'Disbursed'],
    },
  };

  // Apply filters
  if (lga) {
    where.businessLGA = lga;
  }

  if (category.length > 0) {
    where.businessRegCatType = {
      in: category,
    };
  }

  if (verified !== undefined) {
    // If verified=true, only show Eligible/Disbursed (already filtered above)
    // If verified=false, show all statuses (but we only show Eligible/Disbursed anyway)
    // This filter is mainly for UI consistency
  }

  // Text search using PostgreSQL full-text search
  if (query && query.trim()) {
    where.OR = [
      {
        businessName: {
          contains: query,
          mode: 'insensitive' as const,
        },
      },
      {
        businessRegCatType: {
          contains: query,
          mode: 'insensitive' as const,
        },
      },
    ];
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Execute query with explicit field selection (exclude sensitive fields)
  const [businesses, total] = await Promise.all([
    db.business.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      // Explicitly select only safe fields (defense in depth)
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
        // Explicitly exclude: bvn, dob, bankAccountNumber, bankName, ownerPersonalPhoto
      },
    }),
    db.business.count({ where }),
  ]);

  // Transform all businesses through the DTL (Data Transformation Layer)
  const transformedBusinesses = businesses.map(transformBusiness);

  const totalPages = Math.ceil(total / limit);

  // Log search asynchronously (don't await to avoid blocking)
  if (query || lga || (category && category.length > 0)) {
    logSearch({
      query,
      lga,
      category: Array.isArray(category) ? category.join(',') : category,
      verified,
      resultsCount: total,
    });
  }

  return {
    businesses: transformedBusinesses,
    total,
    page,
    totalPages,
  };
}

