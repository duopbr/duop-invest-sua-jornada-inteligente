// Types for tracking and analytics

export interface TrackingUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  externalId?: string;
}

export interface TrackingCustomData {
  [key: string]: unknown;
}

export interface TrackingEventParams {
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: number;
  userData?: TrackingUserData;
  customData?: TrackingCustomData;
}

export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

export interface ContextData {
  page_location: string;
  page_title: string;
  page_path: string;
  page_referrer: string;
  user_agent: string;
  viewport_width: number;
  viewport_height: number;
  screen_width: number;
  screen_height: number;
  event_time: number;
  timestamp: string;
}
