import { useEffect } from 'react';

export default function SEOHead({ 
  title = "বেপারি-বিডি | বাংলাদেশের পাইকারি মার্কেটপ্লেস", 
  description = "নোয়াখালী, ফেনী, চাঁদপুর ও লক্ষ্মীপুরের দোকানদারদের জন্য পাইকারি মার্কেটপ্লেস। ঢাকা না গিয়েই পাইকারি দামে কিনুন।", 
  keywords = "পাইকারি, পাইকার, বেপারি, নোয়াখালী, ফেনী, চাঁদপুর, B2B, wholesale Bangladesh", 
  ogImage = "https://bepari-bd.com/og-image.jpg", 
  url = "https://bepari-bd.com" 
}) {
  useEffect(() => {
    // Set Title
    document.title = title;
    
    // Set Language
    document.documentElement.lang = "bn";

    // Helper to set meta tags safely
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // Open Graph (Facebook/LinkedIn)
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', 'website');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical
    setLinkTag('canonical', url);

  }, [title, description, keywords, ogImage, url]);

  // This is a headless component, it manipulates the DOM directly and returns nothing to render
  return null; 
}
