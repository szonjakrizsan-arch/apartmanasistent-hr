import { useEffect, useState } from "react";
import { getStoredConsent, storeConsent, loadTrackingScripts } from "../lib/consent";

/**
 * Cookie-Einwilligungsbanner für Marketing-Tracking (Google Ads, Meta Pixel).
 *
 * Erscheint bei jedem Besuch, solange noch keine Entscheidung gespeichert
 * ist — auch VOR dem Login/der Registrierung, denn genau dort soll das
 * Registrierungs-Konversionsereignis gemessen werden. Wird in main.tsx
 * unabhängig vom Auth-Status gerendert, damit sie auf jedem Bildschirm
 * (AuthScreen, Hauptapp, ...) sichtbar ist.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function handleAccept() {
    storeConsent("granted");
    loadTrackingScripts();
    setVisible(false);
  }

  function handleReject() {
    storeConsent("denied");
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 pointer-events-none">
      <div
        className="pointer-events-auto w-full max-w-2xl rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 bg-surface-raised"
        style={{
          outline: "1px solid rgb(255 255 255 / 0.08)",
          boxShadow: "0 8px 30px rgb(0 0 0 / 0.35)",
        }}
        role="dialog"
        aria-label="Cookie-Einstellungen"
      >
        <p className="text-[13px] text-text-secondary leading-relaxed flex-1">
          Diese App verwendet notwendige und — bei Ihrer Zustimmung — auch
          Marketing-Cookies (Google Ads, Meta Pixel) zur Erfolgsmessung von
          Werbekampagnen. Mehr dazu in der{" "}
          <a
            href="https://apartmentassistant.de/datenschutz"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleReject}
            className="pressable text-[13px] font-semibold rounded-full px-4 py-2 text-text-secondary"
            style={{ outline: "1px solid rgb(255 255 255 / 0.15)" }}
          >
            Nur Notwendige
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="pressable text-[13px] font-semibold rounded-full px-4 py-2 bg-sage text-surface"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
