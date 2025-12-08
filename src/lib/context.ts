import type { ContextData } from "@/types/tracking";

/**
 * Get current page context data for analytics
 */
export function getContextData(): ContextData | Record<string, never> {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    page_location: window.location.href,
    page_title: document.title,
    page_path: window.location.pathname,
    page_referrer: document.referrer || "",
    user_agent: navigator.userAgent,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    event_time: Math.floor(Date.now() / 1000),
    timestamp: new Date().toISOString(),
  };
}
