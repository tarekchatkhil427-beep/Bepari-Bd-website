/**
 * Simple event tracking utility wrapped around Google Analytics 4 (gtag)
 * Provides graceful fallbacks via console.log if analytics are blocked/missing.
 */

const isGtagLoaded = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

export const trackPageView = (page) => {
  if (isGtagLoaded()) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: page
    });
  } else {
    console.log(`[Analytics] Page View: ${page}`);
  }
};

export const trackEvent = (category, action, label = null, value = null) => {
  if (isGtagLoaded()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  } else {
    console.log(`[Analytics] Event: [${category}] ${action} - ${label}`);
  }
};

export const trackDownload = (platform) => {
  trackEvent('app_download', 'click_download', platform);
};

export const trackWhatsApp = (source) => {
  trackEvent('whatsapp_contact', 'click_whatsapp', source);
};

export const trackFormSubmit = (formName, success) => {
  trackEvent('form_submission', success ? 'submit_success' : 'submit_error', formName);
};
