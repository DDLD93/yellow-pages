# Favicon and Social Media Image Generation Guide

This guide explains how to generate all required favicon files and social media preview images from the existing `public/logo.png` file.

## Required Files

### Favicon Files (to be placed in `public/` directory)
- `favicon-16x16.png` (16x16 pixels)
- `favicon-32x32.png` (32x32 pixels)
- `android-chrome-192x192.png` (192x192 pixels)
- `android-chrome-512x512.png` (512x512 pixels)

### Next.js App Router Icons (to be placed in `app/` directory)
- `icon.png` (512x512 pixels) - Next.js will automatically use this
- `apple-icon.png` (180x180 pixels) - Apple touch icon

### Social Media Images (to be placed in `public/` directory)
- `og-image.png` (1200x630 pixels) - Open Graph preview image
- `twitter-image.png` (1200x1200 pixels) - Twitter Card image

### Optional Files
- `safari-pinned-tab.svg` - Safari pinned tab icon (SVG format)
- `mstile-70x70.png` - Windows tile (70x70)
- `mstile-150x150.png` - Windows tile (150x150)
- `mstile-310x150.png` - Windows wide tile (310x150)
- `mstile-310x310.png` - Windows large tile (310x310)

## Generation Methods

### Method 1: Using Online Tools (Easiest)

1. **Favicon Generator:**
   - Visit https://realfavicongenerator.net/
   - Upload `public/logo.png`
   - Configure options:
     - iOS: Enable "Apple touch icon" (180x180)
     - Android Chrome: Enable "Android Chrome icon" (192x192 and 512x512)
     - Windows Metro: Enable "Windows Metro tile" (optional)
     - Safari: Enable "Safari pinned tab" (optional, requires SVG)
   - Generate and download the package
   - Extract files to appropriate directories:
     - Favicon files → `public/`
     - Apple icon → `app/apple-icon.png`
     - Create `app/icon.png` by copying `android-chrome-512x512.png` and renaming

2. **Social Media Images:**
   - Visit https://www.canva.com/ or https://www.figma.com/
   - Create new designs:
     - **Open Graph Image (1200x630):**
       - Create a design with the logo centered
       - Add text: "Kaduna Business Connect"
       - Subtitle: "Official Kaduna State Business Directory"
       - Export as `og-image.png`
     - **Twitter Image (1200x1200):**
       - Create a square design with the logo
       - Add branding text
       - Export as `twitter-image.png`

### Method 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Navigate to project root
cd /path/to/yellow-pages

# Create favicon files
magick public/logo.png -resize 16x16 public/favicon-16x16.png
magick public/logo.png -resize 32x32 public/favicon-32x32.png
magick public/logo.png -resize 192x192 public/android-chrome-192x192.png
magick public/logo.png -resize 512x512 public/android-chrome-512x512.png

# Create Next.js App Router icons
magick public/logo.png -resize 512x512 app/icon.png
magick public/logo.png -resize 180x180 app/apple-icon.png

# Create social media images
# For Open Graph (1200x630), you may want to create a canvas with logo centered
magick -size 1200x630 xc:white public/logo.png -gravity center -composite public/og-image.png

# For Twitter (1200x1200), center logo on square canvas
magick -size 1200x1200 xc:white public/logo.png -gravity center -composite public/twitter-image.png
```

### Method 3: Using Node.js Script

Create a script `scripts/generate-favicons.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/logo.png');
const sizes = {
  'public/favicon-16x16.png': 16,
  'public/favicon-32x32.png': 32,
  'public/android-chrome-192x192.png': 192,
  'public/android-chrome-512x512.png': 512,
  'app/icon.png': 512,
  'app/apple-icon.png': 180,
};

async function generateFavicons() {
  for (const [outputPath, size] of Object.entries(sizes)) {
    const fullPath = path.join(__dirname, '..', outputPath);
    await sharp(logoPath)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(fullPath);
    console.log(`Generated ${outputPath}`);
  }
}

generateFavicons().catch(console.error);
```

Run with: `node scripts/generate-favicons.js`

## Verification Checklist

After generating all files, verify:

- [ ] All favicon files exist in `public/` directory
- [ ] `app/icon.png` exists (512x512)
- [ ] `app/apple-icon.png` exists (180x180)
- [ ] `public/og-image.png` exists (1200x630)
- [ ] `public/twitter-image.png` exists (1200x1200)
- [ ] All images are properly sized and not distorted
- [ ] Images have transparent backgrounds where appropriate
- [ ] Test favicon in browser (should appear in tab)
- [ ] Test Open Graph preview using https://www.opengraph.xyz/
- [ ] Test Twitter Card preview using https://cards-dev.twitter.com/validator

## Notes

- The existing `app/favicon.ico` will be automatically used by Next.js if no other icons are specified
- Next.js App Router automatically detects `app/icon.png` and `app/apple-icon.png`
- The manifest files (`site.webmanifest`, `browserconfig.xml`) are already configured
- All metadata references are already set up in `app/layout.tsx` and `lib/metadata.ts`

## Quick Start (Recommended)

1. Use https://realfavicongenerator.net/ for favicons
2. Use Canva or Figma for social media images
3. Place files in correct directories as specified above
4. Test using the verification checklist

