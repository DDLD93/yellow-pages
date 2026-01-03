/**
 * Partial Business type with only safe fields that can be selected
 * This ensures we never accidentally include sensitive fields
 */
export type SafeBusinessFields = {
  id: string;
  businessName: string;
  businessRegCatType: string;
  businessLGA: string;
  businessWard: string | null;
  businessAddress: string | null;
  ownerAtBusinessPhotoUrl: string | null;
  status: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
};

