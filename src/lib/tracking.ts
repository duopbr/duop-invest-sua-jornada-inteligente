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

// SHA256 hashing function for PII (Meta CAPI requirement)
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Normalize and hash email
async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim();
  return sha256(normalized);
}

// Normalize and hash phone (Brazilian E.164 format)
async function hashPhone(phone: string): Promise<string> {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  // Add +55 if not present
  const normalized = cleaned.startsWith('55') ? `+${cleaned}` : `+55${cleaned}`;
  return sha256(normalized);
}

// Normalize and hash name
async function hashName(name: string): Promise<string> {
  const normalized = name.toLowerCase().trim();
  return sha256(normalized);
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

// Hash user data for Meta CAPI
async function hashUserData(userData: TrackingUserData): Promise<Record<string, string[]>> {
  const hashed: Record<string, string[]> = {
    country: ['br'], // Always BR for this project
  };

  if (userData.email) {
    hashed.em = [await hashEmail(userData.email)];
  }

  if (userData.phone) {
    hashed.ph = [await hashPhone(userData.phone)];
  }

  if (userData.firstName) {
    hashed.fn = [await hashName(userData.firstName)];
  }

  if (userData.lastName) {
    hashed.ln = [await hashName(userData.lastName)];
  }

  if (userData.externalId) {
    hashed.external_id = [userData.externalId];
  }

  return hashed;
}

// Main tracking function
export async function trackEvent(
  eventName: string,
  params: TrackingEventParams = {}
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const utmParams = getUTMParams();
    const contextData = getContextData();

    // Prepare base event data
    const eventData: any = {
      event: eventName,
      eventCategory: params.eventCategory || 'general',
      eventAction: params.eventAction || eventName,
      eventLabel: params.eventLabel || '',
      ...utmParams,
      ...contextData,
    };

    // Add event value if provided
    if (params.eventValue !== undefined) {
      eventData.eventValue = params.eventValue;
    }

    // Hash user data for Meta CAPI if provided
    if (params.userData) {
      const hashedUserData = await hashUserData(params.userData);
      eventData.user_data = hashedUserData;
      
      // Also include original field names for GTM variables (non-hashed for internal tracking)
      eventData.user_email = params.userData.email || '';
      eventData.user_phone = params.userData.phone || '';
    }

    // Add custom data
    if (params.customData) {
      eventData.custom_data = params.customData;
    }

    // Push to dataLayer
    window.dataLayer.push(eventData);

    console.log('📊 Event tracked:', eventName, eventData);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Convenience functions for common events

export function trackPageView(): void {
  trackEvent('page_view', {
    eventCategory: 'engagement',
    eventAction: 'page_view',
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

export function trackFormSubmitAttempt(formId: string): void {
  trackEvent('form_submit_attempt', {
    eventCategory: 'conversion',
    eventAction: 'form_submit_attempt',
    eventLabel: formId,
    customData: {
      form_id: formId,
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

export async function trackLeadCaptured(
  userData: TrackingUserData,
  customData: TrackingCustomData = {}
): Promise<void> {
  await trackEvent('lead_captured', {
    eventCategory: 'conversion',
    eventAction: 'lead_submit',
    eventLabel: 'landing_page_form',
    eventValue: 1,
    userData,
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
