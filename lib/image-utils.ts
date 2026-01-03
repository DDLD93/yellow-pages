/**
 * Gets placeholder image URL for missing/broken images
 */
export function getPlaceholderImage(category?: string): string {
  // Category-specific placeholders (can be extended with actual images)
  const categoryPlaceholders: Record<string, string> = {
    Agriculture: '/placeholders/agriculture.jpg',
    Retail: '/placeholders/retail.jpg',
    'Food & Beverage': '/placeholders/food.jpg',
    Manufacturing: '/placeholders/manufacturing.jpg',
    Services: '/placeholders/services.jpg',
    Construction: '/placeholders/construction.jpg',
    Technology: '/placeholders/technology.jpg',
    Healthcare: '/placeholders/healthcare.jpg',
    Education: '/placeholders/education.jpg',
    Transport: '/placeholders/transport.jpg',
  };

  return categoryPlaceholders[category || ''] || '/placeholders/default.jpg';
}

/**
 * Generates a blur data URL for image optimization
 * Simple gray placeholder - can be replaced with actual blur data URLs
 */
export function generateBlurDataURL(width = 16, height = 16): string {
  const canvas = typeof window !== 'undefined' 
    ? document.createElement('canvas')
    : null;
  
  if (!canvas) {
    // Server-side: return a simple gray data URL
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+';
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
    return canvas.toDataURL();
  }

  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+';
}

