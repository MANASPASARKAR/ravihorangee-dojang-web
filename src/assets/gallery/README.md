# Gallery Images

This folder contains images organized into 4 sections for the Gallery page.

## Folder Structure

```
gallery/
├── section1/    # Images for Section 1
├── section2/    # Images for Section 2
├── section3/    # Images for Section 3
└── section4/    # Images for Section 4
```

## How to Add Images

1. **Place your images** in the appropriate section folders (section1, section2, section3, or section4)
   
2. **Open `src/pages/Gallery.tsx`** and update the image imports at the top:
   ```typescript
   // Example imports
   import image1_1 from "@/assets/gallery/section1/photo1.jpg";
   import image1_2 from "@/assets/gallery/section1/photo2.jpg";
   // ... add more imports
   ```

3. **Update the galleryCategories object** in Gallery.tsx:
   ```typescript
   const galleryCategories = {
     section1: {
       name: "Training Sessions", // Change the section name
       images: [
         { src: image1_1, alt: "Description of photo 1" },
         { src: image1_2, alt: "Description of photo 2" },
         // Add more images here
       ]
     },
     // ... repeat for other sections
   };
   ```

4. **Rename the section names** (currently "Section 1", "Section 2", etc.) to meaningful names like:
   - "Training Sessions"
   - "Competitions"
   - "Belt Ceremonies"
   - "Community Events"
   - etc.

## Supported Image Formats

- .jpg / .jpeg
- .png
- .webp
- .gif

## Recommended Image Sizes

- Width: 1200px - 1920px
- Height: 675px - 1080px
- Aspect Ratio: 16:9 (preferred for consistency)
- File Size: Keep under 500KB for optimal performance

## Notes

- Images will be displayed in a 3-column grid on desktop
- Each image is clickable and opens in a modal for full-size viewing
- The gallery uses lazy loading for better performance
