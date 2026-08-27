import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { initConsentOnLoad } from "./lib/consent";
import "./index.css";

// Odmah učitava Google Ads/Meta Pixel ako je privola već dana kod
// prethodnog posjeta. Ako nema pohranjene odluke, ovdje se ništa ne
// događa — banner (ispod) tada pita za privolu.
initConsentOnLoad();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <CookieConsentBanner />
  </StrictMode>,
);
