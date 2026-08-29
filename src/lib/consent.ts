/**
 * Privola za kolačiće i marketinško praćenje (Google Ads + Meta Pixel).
 *
 * Google Ads i Meta Pixel se VIŠE NE učitavaju automatski u index.html.
 * Umjesto toga, ovaj modul pri pokretanju aplikacije provjerava je li
 * privola već pohranjena:
 *   - "granted" -> skripte za praćenje se odmah učitavaju (bez bannera).
 *   - "denied"  -> ništa se ne učitava (bez bannera).
 *   - odluka još ne postoji -> CookieConsentBanner.tsx prikazuje banner;
 *     korisnica/korisnik odlučuje, loadTrackingScripts() se poziva
 *     odande nakon suglasnosti.
 *
 * Bez ovog zaobilaznog puta, Google Ads i Meta Pixel bi kod svakog
 * posjeta stranici odmah postavili kolačiće za praćenje — čak i prije
 * bilo kakve privole. To je protivno OUZP-u/ePrivacy direktivi. Ova
 * datoteka osigurava da se to ne dogodi.
 */

const CONSENT_KEY = "aa_cookie_consent"; // "granted" | "denied"

// TODO(HR lansiranje): ovdje treba postaviti zaseban HR Google Ads ID
// i zaseban HR Meta Pixel ID — ne smiju se koristiti isti ID-jevi kao
// za apartmentassistant.de, jer bi se inače konverzije miješale
// između tržišta.
const GOOGLE_ADS_ID = "";

const META_PIXEL_ID = "";

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
    // localStorage nije dostupan — banner se prikazuje kod svakog posjeta,
    // ali aplikacija i dalje normalno radi.
  }
}

let scriptsLoaded = false;

/**
 * Učitava osnovne kodove za Google Ads i Meta Pixel.
 * Poziva se samo nakon što je privola stvarno dana.
 */
export function loadTrackingScripts(): void {
  if (scriptsLoaded) return;
  if (!GOOGLE_ADS_ID && !META_PIXEL_ID) return; // ID-jevi još nisu postavljeni za HR
  scriptsLoaded = true;

  // --- Google Ads: učitava se osnovna oznaka. Stvarni konverzijski
  //     događaj pokreće se zasebno, vidi lib/googleAds.ts. ---
  if (GOOGLE_ADS_ID) {
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
  }

  // --- Meta Pixel: osnovni kod, samo init (bez automatskog PageView eventa).
  //     CompleteRegistration se pokreće zasebno, vidi lib/metaPixel.ts.
  //     Službeni Meta snippet, ovdje namjerno s `any` umjesto strogog
  //     tipiziranja, jer se radi o nepromijenjenom boilerplateu
  //     treće strane. ---
  if (META_PIXEL_ID) {
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
}

/**
 * Poziva se jednom pri pokretanju aplikacije (vidi main.tsx). Odmah učitava
 * skripte za praćenje ako je privola već dana kod prethodnog posjeta —
 * bez ponovnog prikazivanja bannera.
 */
export function initConsentOnLoad(): void {
  if (getStoredConsent() === "granted") {
    loadTrackingScripts();
  }
}
