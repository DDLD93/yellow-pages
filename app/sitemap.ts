import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // For now, return just the homepage
  // The full sitemap with all businesses should be generated at runtime
  // when DATABASE_URL is available
  // TODO: Add business URLs when database is connected
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // Try to fetch businesses, but don't fail if DB is not available
  try {
    const { db } = await import('@/lib/db');
    const { generateSlug } = await import('@/lib/utils');

    const businesses = await db.business.findMany({
      where: {
        status: {
          in: ['Eligible', 'Disbursed'],
        },
      },
      select: {
        businessName: true,
        businessLGA: true,
        updatedAt: true,
      },
    });

    const businessUrls: MetadataRoute.Sitemap = businesses.map((business) => {
      const slug = generateSlug(business.businessName, business.businessLGA);
      return {
        url: `${baseUrl}/business/${slug}`,
        lastModified: business.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    });

    return [...homepage, ...businessUrls];
  } catch (error) {
    // If database is not available during build, return just homepage
    console.warn('Database not available for sitemap generation:', error);
    return homepage;
  }
}

