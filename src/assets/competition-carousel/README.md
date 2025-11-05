# Competition Carousel Images

This folder contains images for the "Competition Glimpses" carousel on the Achievements page.

## Usage

1. **Add your images** to this folder
2. **Open `src/pages/Achievements.tsx`**
3. **Import your images** at the top of the file:
   ```typescript
   import comp1 from "@/assets/competition-carousel/competition1.jpg";
   import comp2 from "@/assets/competition-carousel/competition2.jpg";
   import comp3 from "@/assets/competition-carousel/competition3.jpg";
   // ... add more
   ```

4. **Update the competitionImages array** (around line 15):
   ```typescript
   const competitionImages = [
     { src: comp1, alt: "National Championship 2024" },
     { src: comp2, alt: "Regional Tournament 2024" },
     { src: comp3, alt: "Youth Competition" },
     { src: comp4, alt: "Poomsae Championship" },
     { src: comp5, alt: "Team Performance" },
     { src: comp6, alt: "Award Ceremony" }
   ];
   ```

## Features

- Auto-plays every 4 seconds
- Navigation arrows (appear on hover)
- Clickable indicator dots at the bottom
- Supports any number of images

## Recommended Image Specs

- **Format**: JPG, PNG, or WebP
- **Size**: 1920px × 1080px (16:9 aspect ratio)
- **File Size**: Under 500KB for optimal loading
- **Quality**: 80-85% compression for JPGs

## Current Location

This carousel appears in the "Competition Glimpses" section on the Achievements page, under the "Competitions Hosted" tab.
