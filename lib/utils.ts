/**
 * Utility function to merge class names
 * Combines multiple class name inputs into a single string
 */
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}

/**
 * Formats Nigerian phone number by replacing leading 0 with +234
 */
export function formatPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return '';
  return phone.replace(/^0/, '+234');
}

/**
 * Generates SEO-friendly slug from business name and LGA
 */
export function generateSlug(name: string, lga: string): string {
  const nameSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const lgaSlug = lga
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  return `${nameSlug}-${lgaSlug}`;
}

/**
 * Gets a human-readable description from category type
 */
export function getCategoryDescription(category: string): string {
  // Map common category types to descriptions
  const categoryMap: Record<string, string> = {
    'Agriculture': 'Agricultural services and products',
    'Retail': 'Retail services and products',
    'Food & Beverage': 'Food and beverage services',
    'Manufacturing': 'Manufacturing and production',
    'Services': 'Professional and business services',
    'Construction': 'Construction and building services',
    'Technology': 'Technology and IT services',
    'Healthcare': 'Healthcare and medical services',
    'Education': 'Educational services',
    'Transport': 'Transportation and logistics',
  };

  return categoryMap[category] || `${category} services in Kaduna State`;
}

/**
 * Calculates years active from creation date
 */
export function calculateYearsActive(createdAt: Date): number {
  const now = new Date();
  const created = new Date(createdAt);
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  return diffYears;
}

