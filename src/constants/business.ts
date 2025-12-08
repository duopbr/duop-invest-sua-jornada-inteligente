// Business constants and configuration values

// UI Timing (milliseconds)
export const PULSE_ANIMATION_DURATION = 2000;
export const SCROLL_TO_FORM_DELAY = 600;
export const NAVIGATE_DELAY = 100;
export const TOAST_ERROR_DURATION = 5000;

// Form thresholds
export const FORM_VISIBILITY_THRESHOLD = 0.3;

// Scroll thresholds
export const HEADER_SCROLL_THRESHOLD = 20;

// Social media links
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/duop2opiniao/",
  youtube: "https://www.youtube.com/@duop-company/videos",
  whatsapp: "https://wa.me/5511999999999",
} as const;

// Form identifiers
export const FORM_IDS = {
  leadCapture: "lead_capture_form",
} as const;

// CTA locations for tracking
export const CTA_LOCATIONS = {
  header: "header",
  hero: "hero",
  finalCta: "final_cta",
} as const;

// Lead sources
export const LEAD_SOURCES = {
  landingPage: "landing_page",
} as const;
