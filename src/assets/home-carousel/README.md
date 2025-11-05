# Home Carousel Images

This folder contains images for the "Academy Moments" carousel on the home page.

## Usage

1. **Add your images** to this folder
2. **Open `src/pages/Index.tsx`**
3. **Import your images** at the top of the file:
   ```typescript
   import homeImage1 from "@/assets/home-carousel/image1.jpg";
   import homeImage2 from "@/assets/home-carousel/image2.jpg";
   import homeImage3 from "@/assets/home-carousel/image3.jpg";
   // ... add more
   ```

4. **Update the carouselImages array** (around line 26):
   ```typescript
   const carouselImages = [
     { src: homeImage1, alt: "Training Session" },
     { src: homeImage2, alt: "Competition Success" },
     { src: homeImage3, alt: "Community Outreach" },
     { src: homeImage4, alt: "Master Class" }
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

This carousel appears in the "Academy Moments" section on the home page, just before the footer.
