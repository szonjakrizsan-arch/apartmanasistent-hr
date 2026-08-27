/**
 * Google Ads — conversion tracking.
 *
 * The gtag.js base code is loaded statically in index.html's <head>
 * (gtag('config', 'AW-18334546190')), matching Google's expected
 * installation pattern.
 *
 * This file only fires the one meaningful conversion event: a
 * successful registration. No passive/automatic tracking happens.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire the "Registrierung (DE)" conversion event.
 * Call this once, right after supabase.auth.signUp() succeeds.
 *
 * Uses the same Google Ads account as the Hungarian site (AW-18334546190),
 * but its own dedicated conversion action for the German site, so HU and
 * DE registrations are reported separately.
 */
export function trackRegistrationConversion(): void {
  try {
    window.gtag?.("event", "conversion", {
      send_to: "AW-18334546190/a3VVCKr68dwcEI7yy6ZE",
      value: 1.0,
      currency: "EUR",
    });
  } catch {
    // Tracking must never break the actual signup flow.
  }
}
