// Tracking module for GTM and Meta Conversion API
// Handles all event tracking with proper data formatting and PII hashing

// Declare global dataLayer for GTM
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

// Types for tracking data
export interface TrackingUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  externalId?: string;
}

export interface TrackingCustomData {
  [key: string]: any;
}

export interface TrackingEventParams {
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: number;
  userData?: TrackingUserData;
  customData?: TrackingCustomData;
}

// Prepare user data for Meta CAPI (normalized, not hashed - server handles hashing)
function prepareUserData(userData: TrackingUserData): Record<string, string> {
  const prepared: Record<string, string> = {
    country: 'br', // Always BR for this project
  };

  if (userData.email) {
    prepared.em = userData.email.toLowerCase().trim();
  }

  if (userData.phone) {
    // Normalize to E.164 BR format
    const cleaned = userData.phone.replace(/\D/g, '');
    prepared.ph = cleaned.startsWith('55') ? `+${cleaned}` : `+55${cleaned}`;
  }

  if (userData.firstName) {
    prepared.fn = userData.firstName.toLowerCase().trim();
  }

  if (userData.lastName) {
    prepared.ln = userData.lastName.toLowerCase().trim();
  }

  if (userData.externalId) {
    prepared.external_id = userData.externalId;
  }

  return prepared;
}

// Get UTM parameters from URL
function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_content: urlParams.get('utm_content') || '',
    utm_term: urlParams.get('utm_term') || '',
  };
}

// Get context data
function getContextData(): Record<string, any> {
  if (typeof window === 'undefined') return {};
  
  return {
    page_location: window.location.href,
    page_title: document.title,
    page_path: window.location.pathname,
    page_referrer: document.referrer || '',
    user_agent: navigator.userAgent,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    event_time: Math.floor(Date.now() / 1000),
    timestamp: new Date().toISOString(),
  };
}


// Main tracking function
export function trackEvent(
  eventName: string,
  params: TrackingEventParams & Record<string, any> = {}
): void {
  if (typeof window === 'undefined') return;

  try {
    const utmParams = getUTMParams();
    const contextData = getContextData();

    // Extract known params
    const { eventCategory, eventAction, eventLabel, eventValue, userData, customData, ...extraParams } = params;

    // Prepare base event data
    const eventData: any = {
      event: eventName,
      eventCategory: eventCategory || 'general',
      eventAction: eventAction || eventName,
      eventLabel: eventLabel || '',
      ...utmParams,
      ...contextData,
      ...extraParams, // Include any extra params passed (like em, ph, fn, ln)
    };

    // Add event value if provided
    if (eventValue !== undefined) {
      eventData.eventValue = eventValue;
    }

    // Add custom data
    if (customData) {
      eventData.custom_data = customData;
    }

    // Push to dataLayer
    window.dataLayer.push(eventData);

    // Log only in development
    if (import.meta.env.DEV) {
      console.log('📊 Event tracked:', eventName, eventData);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Convenience functions for common events

export function trackPageView(): void {
  trackEvent('PageView', {
    eventCategory: 'engagement',
    eventAction: 'PageView',
    eventLabel: window.location.pathname,
  });
}

export function trackFormView(formId: string): void {
  trackEvent('form_view', {
    eventCategory: 'engagement',
    eventAction: 'form_view',
    eventLabel: formId,
    customData: {
      form_id: formId,
    },
  });
}

export function trackFormStart(fieldName: string): void {
  trackEvent('form_start', {
    eventCategory: 'engagement',
    eventAction: 'form_start',
    eventLabel: fieldName,
    customData: {
      first_field: fieldName,
    },
  });
}

export function trackCTAClick(location: string): void {
  trackEvent('cta_click', {
    eventCategory: 'engagement',
    eventAction: 'cta_click',
    eventLabel: location,
    customData: {
      button_location: location,
    },
  });
}

export function trackFormValidationError(errorFields: string[]): void {
  trackEvent('form_validation_error', {
    eventCategory: 'engagement',
    eventAction: 'form_validation_error',
    eventLabel: errorFields.join(', '),
    customData: {
      error_fields: errorFields,
      error_count: errorFields.length,
    },
  });
}

export function trackLeadCaptured(
  userData: TrackingUserData,
  customData: TrackingCustomData = {}
): void {
  // Prepare user data
  const preparedUserData = prepareUserData(userData);
  
  // Generate external_id if not provided (for Meta CAPI)
  if (!preparedUserData.external_id && userData.email) {
    // Create a deterministic ID based on email and timestamp
    preparedUserData.external_id = `lead_${btoa(userData.email).substring(0, 20)}_${Date.now()}`;
  }
  
  trackEvent('Lead', {
    eventCategory: 'conversion',
    eventAction: 'Lead',
    eventLabel: 'landing_page_form',
    eventValue: 1,
    // Send user data in BOTH formats for maximum compatibility:
    // 1. Nested format (Meta CAPI standard)
    user_data: preparedUserData,
    // 2. Root level (Google Enhanced Conversions & easier GTM mapping)
    ...preparedUserData,
    customData: {
      content_name: 'lead_form',
      currency: 'BRL',
      value: 0,
      ...customData,
    },
  });
}

export function trackOutboundClick(url: string, linkType: string): void {
  trackEvent('outbound_click', {
    eventCategory: 'engagement',
    eventAction: 'outbound_click',
    eventLabel: linkType,
    customData: {
      destination_url: url,
      link_type: linkType,
    },
  });
}
