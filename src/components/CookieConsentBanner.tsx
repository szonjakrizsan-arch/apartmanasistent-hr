import { useEffect, useState } from "react";
import { getStoredConsent, storeConsent, loadTrackingScripts } from "../lib/consent";

/**
 * Banner privole za kolačiće za marketinško praćenje (Google Ads, Meta Pixel).
 *
 * Prikazuje se pri svakom posjetu, dok nije pohranjena odluka — i to
 * PRIJE prijave/registracije, jer se upravo tamo mjeri konverzijski
 * događaj registracije. Renderira se u main.tsx neovisno o statusu
 * autentifikacije, kako bi bio vidljiv na svakom zaslonu (AuthScreen,
 * glavna aplikacija, ...).
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
        aria-label="Postavke kolačića"
      >
        <p className="text-[13px] text-text-secondary leading-relaxed flex-1">
          Ova aplikacija koristi nužne kolačiće te, uz vašu suglasnost, i
          marketinške kolačiće (Google Ads, Meta Pixel) za mjerenje
          uspješnosti oglasnih kampanja. Više o tome u{" "}
          <a
            href="https://apartmanasistent.hr/datenschutz"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Izjavi o zaštiti podataka
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
            Samo nužni
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="pressable text-[13px] font-semibold rounded-full px-4 py-2 bg-sage text-surface"
          >
            Prihvati
          </button>
        </div>
      </div>
    </div>
  );
}
