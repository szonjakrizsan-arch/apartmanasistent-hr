import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { initConsentOnLoad } from "./lib/consent";
import "./index.css";

// Lädt Google Ads/Meta Pixel sofort, falls bei einem früheren Besuch schon
// zugestimmt wurde. Ohne gespeicherte Entscheidung passiert hier nichts —
// der Banner (unten) fragt dann danach.
initConsentOnLoad();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <CookieConsentBanner />
  </StrictMode>,
);
