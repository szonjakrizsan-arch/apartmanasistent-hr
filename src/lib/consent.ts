/**
 * Cookie-Einwilligung und Marketing-Tracking (Google Ads + Meta Pixel).
 *
 * Google Ads und Meta Pixel werden NICHT mehr automatisch in index.html
 * geladen. Stattdessen prüft dieses Modul beim App-Start, ob bereits eine
 * Einwilligung gespeichert ist:
 *   - "granted" -> Tracking-Skripte werden sofort geladen (kein Banner).
 *   - "denied"  -> nichts wird geladen (kein Banner).
 *   - noch keine Entscheidung -> CookieConsentBanner.tsx zeigt den Banner an;
 *     die Nutzerin/der Nutzer entscheidet, loadTrackingScripts() wird bei
 *     Zustimmung von dort aufgerufen.
 *
 * Ohne diesen Umweg würden Google Ads und Meta Pixel bei jedem Seitenaufruf
 * sofort Tracking-Cookies setzen — auch vor jeder Einwilligung. Das verstößt
 * gegen DSGVO/ePrivacy. Diese Datei stellt sicher, dass das nicht passiert.
 */

const CONSENT_KEY = "aa_cookie_consent"; // "granted" | "denied"

const GOOGLE_ADS_ID = "AW-18334546190";

// Eigener Meta Pixel für apartmentassistant.de ("Apartment Assistant DE"),
// getrennt vom ungarischen Pixel — Conversions mischen sich dadurch nicht.
const META_PIXEL_ID = "1381708490589694";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: unknown;
  }
}

export type ConsentValue = "granted" | "denied";

export function getStoredConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function storeConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage nicht verfügbar — Banner erscheint bei jedem Besuch,
    // aber die App funktioniert weiterhin normal.
  }
}

let scriptsLoaded = false;

/**
 * Lädt die Google-Ads- und Meta-Pixel-Basiscodes.
 * Nur aufrufen, nachdem die Einwilligung tatsächlich erteilt wurde.
 */
export function loadTrackingScripts(): void {
  if (scriptsLoaded) return;
  scriptsLoaded = true;

  // --- Google Ads: Basis-Tag laden. Das eigentliche Konversionsereignis
  //     wird separat ausgelöst, siehe lib/googleAds.ts. ---
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);

  // --- Meta Pixel: Basiscode, nur init (kein automatisches PageView-Event).
  //     CompleteRegistration wird separat ausgelöst, siehe lib/metaPixel.ts.
  //     Offizielles Meta-Snippet, hier bewusst mit `any` statt strikter
  //     Typisierung, da es sich um unverändertes Drittanbieter-Boilerplate
  //     handelt. ---
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (function (f: any, b: any, e: string, v: string) {
    if (f.fbq) return;
    const n: any = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    };
    f.fbq = n;
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable @typescript-eslint/no-explicit-any */

  window.fbq?.("init", META_PIXEL_ID);
}

/**
 * Beim App-Start einmal aufrufen (siehe main.tsx). Lädt die Tracking-Skripte
 * sofort, falls bei einem früheren Besuch bereits Zustimmung erteilt wurde —
 * ohne den Banner erneut anzuzeigen.
 */
export function initConsentOnLoad(): void {
  if (getStoredConsent() === "granted") {
    loadTrackingScripts();
  }
}
