/*
  ============================================================
  FILE: assets/icons/README.txt
  VERSION: 1.0
  DATE: 2026-06-11
  PURPOSE: Placeholder note — explains the icon requirements
           for PWA installation and provides instructions
           for generating actual icons
  DEPLOYMENT: GitHub Pages + Cloudflare DNS
  AUTHOR: HF Training Module
  ============================================================
*/

============================================================
ICON REQUIREMENTS FOR PWA (PROGRESSIVE WEB APP)
============================================================

The following icon files are required for the PWA manifest.
Current files are empty placeholders. Replace them with actual
.png images before production deployment.

REQUIRED SIZES:
- icon-72.png    (72x72 pixels)
- icon-96.png    (96x96 pixels)
- icon-128.png   (128x128 pixels)
- icon-144.png   (144x144 pixels)
- icon-152.png   (152x152 pixels)
- icon-192.png   (192x192 pixels)
- icon-384.png   (384x384 pixels)
- icon-512.png   (512x512 pixels)
- icon-512-maskable.png (512x512, maskable)

============================================================
HOW TO GENERATE ICONS
============================================================

Option 1: Online Generator (Recommended)
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload a base image (at least 512x512)
3. Download the generated icon set
4. Replace the placeholder files

Option 2: Manual Creation
1. Create a square image for your training logo/brand
2. Resize to each required size using any image editor
3. Save as PNG format
4. Replace placeholder files

Option 3: Use Placeholders (Development Only)
- The app will work without actual icons
- Browser will show default icon
- For production, add real icons

============================================================
RECOMMENDED ICON DESIGN
============================================================

- Background: Dark blue (#0a2a3a) or transparent
- Foreground: Airplane icon + "HF" text
- Color: White + Cyan (#45b3ff) accent
- Simplicity: Keep design clean for small sizes

============================================================
FILE NAMING CONVENTION
============================================================

Do not change the file names. The manifest.json expects:
- assets/icons/icon-72.png
- assets/icons/icon-96.png
- assets/icons/icon-128.png
- assets/icons/icon-144.png
- assets/icons/icon-152.png
- assets/icons/icon-192.png
- assets/icons/icon-384.png
- assets/icons/icon-512.png
- assets/icons/icon-512-maskable.png

============================================================
QUICK PLACEHOLDER CREATION (For Testing)
============================================================

If you need quick test icons, you can use a solid color square:
- Open any image editor
- Create a 512x512 square with color #1b263b
- Add text "HF" in center (#45b3ff)
- Resize to all required sizes
- Save with correct file names

============================================================