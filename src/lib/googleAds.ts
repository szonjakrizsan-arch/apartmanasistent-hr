/**
 * Google Ads — conversion tracking.
 *
 * TODO(HR launch): this file currently has no conversion ID configured.
 * Once a Google Ads account/conversion action exists for the HR market,
 * set CONVERSION_SEND_TO below. Until then, trackRegistrationConversion()
 * is a safe no-op.
 *
 * Do NOT reuse the DE conversion ID (AW-18334546190/...) here — that
 * would attribute Croatian registrations to the German campaign and
 * corrupt both markets' reporting.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONVERSION_SEND_TO = ""; // e.g. "AW-XXXXXXXXXX/YYYYYYYYYYYYYYYY" once set up for HR

/**
 * Fire the registration conversion event for the HR market.
 * Call this once, right after supabase.auth.signUp() succeeds.
 */
export function trackRegistrationConversion(): void {
  if (!CONVERSION_SEND_TO) return;
  try {
    window.gtag?.("event", "conversion", {
      send_to: CONVERSION_SEND_TO,
      value: 1.0,
      currency: "EUR",
    });
  } catch {
    // Tracking must never break the actual signup flow.
  }
}
