// Tracking module for GTM and Meta Conversion API
// Handles all event tracking with proper data formatting

import type { TrackingUserData, TrackingCustomData, TrackingEventParams } from "@/types/tracking";
import { getUTMParams } from "./url";
import { getContextData } from "./context";

// Declare global dataLayer for GTM
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== "undefined" && !window.dataLayer) {
  window.dataLayer = [];
}

/**
 * Prepare user data for Meta CAPI (normalized, not hashed - server handles hashing)
 */
function prepareUserData(userData: TrackingUserData): Record<string, string> {
  const prepared: Record<string, string> = {
    country: "br",
  };

  if (userData.email) {
    prepared.em = userData.email.toLowerCase().trim();
  }

  if (userData.phone) {
    const cleaned = userData.phone.replace(/\D/g, "");
    prepared.ph = cleaned.startsWith("55") ? `+${cleaned}` : `+55${cleaned}`;
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

/**
 * Main tracking function - pushes events to GTM dataLayer
 */
export function trackEvent(
  eventName: string,
  params: TrackingEventParams & Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  try {
    const utmParams = getUTMParams();
    const contextData = getContextData();

    const { eventCategory, eventAction, eventLabel, eventValue, userData, customData, ...extraParams } = params;

    const eventData: Record<string, unknown> = {
      event: eventName,
      eventCategory: eventCategory || "general",
      eventAction: eventAction || eventName,
      eventLabel: eventLabel || "",
      ...utmParams,
      ...contextData,
      ...extraParams,
    };

    if (eventValue !== undefined) {
      eventData.eventValue = eventValue;
    }

    if (customData) {
      eventData.custom_data = customData;
    }

    window.dataLayer.push(eventData);

    if (import.meta.env.DEV) {
      console.log("📊 Event tracked:", eventName, eventData);
    }
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}

// Convenience functions for common events

export function trackPageView(): void {
  trackEvent("PageView", {
    eventCategory: "engagement",
    eventAction: "PageView",
    eventLabel: window.location.pathname,
  });
}

export function trackFormView(formId: string): void {
  trackEvent("form_view", {
    eventCategory: "engagement",
    eventAction: "form_view",
    eventLabel: formId,
    customData: { form_id: formId },
  });
}

export function trackFormStart(fieldName: string): void {
  trackEvent("form_start", {
    eventCategory: "engagement",
    eventAction: "form_start",
    eventLabel: fieldName,
    customData: { first_field: fieldName },
  });
}

export function trackCTAClick(location: string): void {
  trackEvent("cta_click", {
    eventCategory: "engagement",
    eventAction: "cta_click",
    eventLabel: location,
    customData: { button_location: location },
  });
}

export function trackFormSubmitAttempt(formId: string): void {
  trackEvent("form_submit_attempt", {
    eventCategory: "conversion",
    eventAction: "form_submit_attempt",
    eventLabel: formId,
    customData: { form_id: formId },
  });
}

export function trackFormValidationError(errorFields: string[]): void {
  trackEvent("form_validation_error", {
    eventCategory: "engagement",
    eventAction: "form_validation_error",
    eventLabel: errorFields.join(", "),
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
  const preparedUserData = prepareUserData(userData);

  trackEvent("Lead", {
    eventCategory: "conversion",
    eventAction: "Lead",
    eventLabel: "landing_page_form",
    eventValue: 1,
    ...preparedUserData,
    customData: {
      content_name: "lead_form",
      currency: "BRL",
      value: 0,
      ...customData,
    },
  });
}

export function trackOutboundClick(url: string, linkType: string): void {
  trackEvent("outbound_click", {
    eventCategory: "engagement",
    eventAction: "outbound_click",
    eventLabel: linkType,
    customData: {
      destination_url: url,
      link_type: linkType,
    },
  });
}
