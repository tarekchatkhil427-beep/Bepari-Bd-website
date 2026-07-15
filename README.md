# Bepari-BD (বেপারি-বিডি) 🇧🇩

**The Digital Distribution Network for Bangladeshi Shop Owners**

Bepari-BD is a premium B2B wholesale marketplace designed specifically for retailers and wholesalers in district and upazila towns across Bangladesh (starting with Noakhali, Feni, Chandpur, and Lakshmipur). This frontend application provides a stunning, mobile-first, app-like experience for business owners to discover products, connect with verified wholesalers, and order directly from their shops.

---

## 🚀 প্রযুক্তিগত বিবরণ (Tech Stack)

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (with arbitrary values & custom presets)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **Typography**: Inter (English/Numbers) + Tiro Bangla (Bengali)

## 📁 প্রজেক্ট স্ট্রাকচার (Folder Structure)

```text
src/
├── components/
│   ├── sections/     # Large, page-specific layout blocks (Hero, Grids)
│   ├── shared/       # Global components (Navbar, Footer, SEOHead, PageLayout)
│   └── ui/           # Reusable micro-components (Buttons, Modals, Cards, Skeletons)
├── data/             # Static mock data (Categories, Testimonials, FAQs)
├── hooks/            # Custom React Hooks (useScrollPosition, usePullToRefresh)
├── pages/            # Core route components (Home, Retailers, Products, etc.)
├── store/            # Zustand global state (useUIStore, useContentStore, useContactStore)
└── utils/            # Helper functions (analytics, haptics)
```

## 🛠️ সেটআপ নির্দেশনা (Setup Instructions)

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```

## ⚙️ কনফিগারেশন (Configuration)

### Adding Real Images
Currently, the application uses an optimized `LazyImage.jsx` component that displays a CSS-styled blurred placeholder with an emoji. 
To add real images:
1. Upload your product/category images to your backend or a CDN (e.g., AWS S3, Cloudinary).
2. Update the `src/data/categories.js` file and replace the `icon` property with a valid image URL passed into a `src` property.
3. Update `ProductCard.jsx` to pass the `src` to the `<LazyImage />` component. The blur-up effect will automatically trigger when the image loads.

### Connecting WhatsApp & App Store Links
- **WhatsApp**: Search the codebase for `8801234567890` and replace it with your official Bepari-BD WhatsApp business number. The `wa.me` links will automatically format the messages correctly.
- **App Stores**: Open `src/components/ui/AppDownloadButtons.jsx` and replace the `href` attributes with your actual Google Play Store and Apple App Store links.

### Environment Variables (.env)
Create a `.env` file in the root directory for production deployments:
```env
# Google Analytics 4 Measurement ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# API Base URL (When backend is connected)
VITE_API_BASE_URL=https://api.bepari-bd.com
```

## 🌐 ডেপ্লয়মেন্ট (Deployment)

This project is optimized for modern edge networks like Vercel, Netlify, or Cloudflare Pages.

**For Vercel:**
1. Connect your GitHub repository to Vercel.
2. The Build Command will automatically be detected as `npm run build`.
3. The Output Directory will automatically be detected as `dist`.
4. Add your Environment Variables in the Vercel dashboard.
5. Deploy!

*Note: As this is an SPA (Single Page Application) using React Router, ensure your hosting provider is configured to rewrite all traffic to `index.html` (Vercel does this automatically for Vite apps).*
