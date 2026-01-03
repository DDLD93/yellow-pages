export type PublicBusinessProfile = {
  id: string;
  name: string;
  slug: string; // SEO friendly URL: "mamas-bakery-zaria"
  category: string; // Mapped from businessRegCatType
  description: string; // Generated or truncated businessRegCatType
  location: {
    address: string;
    lga: string;
    ward: string;
    coordinates: {
      lat: number;
      lng: number;
    } | null;
  };
  contact: {
    phone: string; // Formatted +234...
    email: string | null;
    website: string | null; // Placeholder if not in DB
  };
  media: {
    heroImage: string; // business.ownerAtBusinessPhotoUrl
    logo: string | null;
  };
  metadata: {
    isVerified: boolean; // Based on Status
    yearsActive: number;
    memberSince: string; // ISO Date
  };
};

export type SearchParams = {
  q?: string; // Search query
  lga?: string; // Local Government Area filter
  category?: string; // Category filter (single or comma-separated)
  verified?: string; // 'true' or 'false'
  page?: string; // Page number
};

export type BusinessFilters = {
  query?: string;
  lga?: string;
  category?: string[];
  verified?: boolean;
  page?: number;
  limit?: number;
};

