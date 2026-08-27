import { useState } from "react";
import { X } from "lucide-react";

/* ─── Design tokens ─────────────────────────────────────────────── */
const T = {
  primary:   "#F4F0E8",
  secondary: "#C8D4D0",
} as const;

const TEAL = {
  line:   "rgb(86 176 187 / 0.35)",
  border: "rgb(86 176 187 / 0.22)",
  dim:    "rgb(86 176 187 / 0.12)",
} as const;

const CORAL = {
  bg:   "rgb(220 132 96 / 0.16)",
  text: "#F0D4C0",
  glow: "0 0 0 1px rgb(220 132 96 / 0.35), 0 0 8px rgb(220 132 96 / 0.12)",
} as const;

/* ─── Tab definitions ───────────────────────────────────────────── */
interface Tab {
  id: string;
  label: string;
  emoji: string;
  color: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
}

const TABS: Tab[] = [
  {
    id: "start",
    label: "Erste Schritte",
    emoji: "🚀",
    color: "#7dd4dd",
    activeBg: "rgb(86 176 187 / 0.18)",
    activeBorder: "rgb(86 176 187 / 0.55)",
    activeText: "#7dd4dd",
  },
  {
    id: "airbnb",
    label: "Airbnb",
    emoji: "🟢",
    color: "#ff5a5f",
    activeBg: "rgb(255 90 95 / 0.14)",
    activeBorder: "rgb(255 90 95 / 0.50)",
    activeText: "#ff8a8e",
  },
  {
    id: "booking",
    label: "Booking.com",
    emoji: "🔵",
    color: "#003580",
    activeBg: "rgb(0 130 200 / 0.14)",
    activeBorder: "rgb(0 130 200 / 0.50)",
    activeText: "#5ab4f0",
  },
  {
    id: "google",
    label: "Google Kalender",
    emoji: "🔴",
    color: "#ea4335",
    activeBg: "rgb(234 67 53 / 0.14)",
    activeBorder: "rgb(234 67 53 / 0.50)",
    activeText: "#f87171",
  },
  {
    id: "vrbo",
    label: "VRBO",
    emoji: "🟣",
    color: "#7c3aed",
    activeBg: "rgb(124 58 237 / 0.14)",
    activeBorder: "rgb(124 58 237 / 0.50)",
    activeText: "#a78bfa",
  },
  {
    id: "tripadvisor",
    label: "TripAdvisor",
    emoji: "⚫",
    color: "#34d399",
    activeBg: "rgb(52 211 153 / 0.12)",
    activeBorder: "rgb(52 211 153 / 0.45)",
    activeText: "#34d399",
  },
  {
    id: "expedia",
    label: "Expedia",
    emoji: "🟨",
    color: "#fbbf24",
    activeBg: "rgb(251 191 36 / 0.12)",
    activeBorder: "rgb(251 191 36 / 0.45)",
    activeText: "#fbbf24",
  },
];

/* ─── Step component ────────────────────────────────────────────── */
function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex gap-3 items-start">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold mt-0.5"
        style={{ background: "rgb(86 176 187 / 0.20)", color: "#7dd4dd", outline: "1px solid rgb(86 176 187 / 0.35)" }}
      >
        {number}
      </span>
      <p className="text-[13px] leading-relaxed" style={{ color: T.primary }}>{text}</p>
    </div>
  );
}

/* ─── InfoBox component ─────────────────────────────────────────── */
function InfoBox({ children, type = "tip" }: { children: React.ReactNode; type?: "tip" | "warn" }) {
  const isTip = type === "tip";
  return (
    <div
      className="rounded-xl px-4 py-3 flex gap-3 items-start"
      style={{
        background: isTip ? "rgb(86 176 187 / 0.08)" : "rgb(249 115 22 / 0.10)",
        border: `1px solid ${isTip ? "rgb(86 176 187 / 0.25)" : "rgb(249 115 22 / 0.30)"}`,
      }}
    >
      <span className="text-base shrink-0">{isTip ? "💡" : "⚠️"}</span>
      <p className="text-[12px] leading-relaxed" style={{ color: isTip ? "#7dd4dd" : "#fb923c" }}>
        {children}
      </p>
    </div>
  );
}

/* ─── Tab content ───────────────────────────────────────────────── */
function ErsteSchritteContent() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-[15px] font-semibold mb-1" style={{ color: T.primary }}>Willkommen!</h3>
        <p className="text-[13px] leading-relaxed" style={{ color: T.secondary }}>
          Dieses Hilfe-Center führt Sie durch die ersten Einstellungen von Apartment Assistant. Die Anleitungen sind für Einsteiger gedacht und erklären daher jeden wichtigen Schritt im Detail.
        </p>
      </div>

      <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgb(38 46 44 / 0.50)", border: `1px solid ${TEAL.border}` }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: T.secondary }}>Was ist iCal?</p>
        <p className="text-[13px] leading-relaxed" style={{ color: T.primary }}>
          iCal ist eine internetbasierte Kalenderverbindung. Damit können verschiedene Buchungsplattformen (z. B. Booking.com oder Airbnb) ihren Buchungskalender automatisch mit Apartment Assistant teilen — Sie müssen die Gästedaten also nicht mehr von Hand eintragen.
        </p>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: T.secondary }}>Bevor Sie beginnen</p>
        <div className="flex flex-col gap-2">
          {[
            "Ein Apartment-Assistant-Konto",
            "Mindestens eine hinzugefügte Ferienwohnung",
            "Der von der Buchungsplattform kopierte iCal-Link",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: "rgb(86 176 187 / 0.06)", border: `1px solid ${TEAL.dim}` }}>
              <span className="text-[13px]">✓</span>
              <span className="text-[13px]" style={{ color: T.primary }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: T.secondary }}>iCal-Link zur App hinzufügen</p>
        <div className="flex flex-col gap-3">
          {[
            "Tippen Sie auf + Neue Ferienwohnung hinzufügen.",
            "Geben Sie den Namen der Ferienwohnung ein und wählen Sie eine Farbe. Tippen Sie auf Hinzufügen.",
            "Die Ferienwohnung erscheint in der Liste. Tippen Sie auf den Pfeil nach unten auf der rechten Seite.",
            "Tippen Sie auf + iCal-Feed hinzufügen.",
            "Wählen Sie die Buchungsplattform aus (Airbnb, Booking.com, Google Kalender usw.).",
            "Fügen Sie den kopierten Link (https://...) in das Feld iCal-URL ein. Tippen Sie auf Speichern.",
            "Wenn Sie mehrere Buchungsplattformen nutzen, wiederholen Sie die Schritte 4–6 für jede Plattform.",
          ].map((step, i) => (
            <Step key={i} number={i + 1} text={step} />
          ))}
        </div>
      </div>

      <InfoBox>
        Buchungen erscheinen nicht immer sofort — wie schnell eine neue Buchung sichtbar wird, hängt von der Buchungsplattform ab. Das ist völlig normal.
      </InfoBox>

      <InfoBox>
        Buchungsplattformen ändern gelegentlich ihre Oberfläche. Wenn ein Button oder Menüpunkt an anderer Stelle erscheint als in der Anleitung, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.
      </InfoBox>
    </div>
  );
}

function AirbnbContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(255 90 95 / 0.08)", border: "1px solid rgb(255 90 95 / 0.25)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#ff8a8e" }}>Erforderlich</p>
        <p className="text-[13px]" style={{ color: T.primary }}>Airbnb-Gastgeberkonto + Zugriff auf die Unterkunft</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Öffnen Sie airbnb.de und melden Sie sich bei Ihrem Konto an.",
          "Klicken Sie oben rechts auf Gastgeberaufgaben. Falls nicht sichtbar, wählen Sie Zur Gastgeberansicht wechseln.",
          "Klicken Sie in der oberen Menüleiste auf Inserate.",
          "Klicken Sie auf die Unterkunft, die Sie verbinden möchten.",
          "Klicken Sie im Inserat auf den Reiter Preise und Verfügbarkeit.",
          "Scrollen Sie nach unten, bis Sie den Bereich Kalendersynchronisierung finden.",
          "Klicken Sie auf Kalender exportieren.",
          "Kopieren Sie den angezeigten Link — das ist die iCal-URL.",
          "Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim Airbnb-Feed hinzu.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox>Die Airbnb-Oberfläche kann sich gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.</InfoBox>
    </div>
  );
}

function BookingContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(0 130 200 / 0.08)", border: "1px solid rgb(0 130 200 / 0.25)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#5ab4f0" }}>Erforderlich</p>
        <p className="text-[13px]" style={{ color: T.primary }}>Booking.com-Partnerkonto + Extranet-Zugang</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Öffnen Sie booking.com und melden Sie sich mit Ihrem Partnerkonto an.",
          "Nach der Anmeldung öffnen Sie das Booking.com Extranet — hier verwalten Sie Ihre Unterkunft.",
          "Suchen Sie im Hauptmenü des Extranets den Menüpunkt Zimmer & Verfügbarkeit oder Kalender.",
          "Öffnen Sie den Bereich Kalendersynchronisierung (iCal sync / Calendar sync).",
          "Suchen Sie die Option iCal-Export / Kalender exportieren.",
          "Kopieren Sie den angezeigten Link — das ist die iCal-URL.",
          "Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim Booking.com-Feed hinzu.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox>Die Oberfläche und die Menüpunkte des Booking.com Extranets können sich gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.</InfoBox>
    </div>
  );
}

function GoogleContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(234 67 53 / 0.08)", border: "1px solid rgb(234 67 53 / 0.25)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#f87171" }}>Erforderlich</p>
        <p className="text-[13px]" style={{ color: T.primary }}>Google-Konto + Buchungskalender in Google Kalender • Nur am Computer</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Öffnen Sie calendar.google.com und melden Sie sich mit Ihrem Google-Konto an.",
          "Suchen Sie links unter Meine Kalender den Kalender, den Sie für Ihre Unterkunft verwenden.",
          "Bewegen Sie den Mauszeiger über den Kalendernamen und klicken Sie auf die drei senkrechten Punkte.",
          "Wählen Sie im erscheinenden Menü Einstellungen und Freigabe.",
          "Suchen Sie im linken Menü den Punkt Kalender integrieren (scrollen Sie ggf. nach unten).",
          "Suchen Sie den Bereich Geheime Adresse im iCal-Format. Dort steht Ihr eindeutiger Link.",
          "Klicken Sie auf das Kopieren-Symbol oder kopieren Sie den gesamten Link.",
          "Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim Google-Kalender-Feed hinzu.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox>Google kann den Aufbau von Kalender gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.</InfoBox>
    </div>
  );
}

function VrboContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(124 58 237 / 0.08)", border: "1px solid rgb(124 58 237 / 0.25)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>Erforderlich</p>
        <p className="text-[13px]" style={{ color: T.primary }}>VRBO-Vermieterkonto + Zugriff auf die Unterkunft</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Öffnen Sie vrbo.com und melden Sie sich in Ihrem Vermieterkonto an (Owner Dashboard).",
          "Falls Sie mehrere Objekte verwalten, wählen Sie das passende aus.",
          "Klicken Sie im linken Menü auf Kalender (Calendar).",
          "Suchen Sie die Option Import & Export (zwei aufeinander zeigende Pfeile).",
          "Klicken Sie auf Kalender exportieren (Export calendar).",
          "Klicken Sie im erscheinenden Fenster auf URL kopieren (Copy URL).",
          "Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim VRBO-Feed hinzu.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox type="warn">
        Auf der VRBO-Oberfläche kann ein Kästchen „Include tentative reservations" erscheinen. Wenn Sie den iCal-Link für Apartment Assistant verwenden, lassen Sie es deaktiviert.
      </InfoBox>
      <InfoBox>VRBO kann seine Oberfläche gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.</InfoBox>
    </div>
  );
}

function TripadvisorContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(52 211 153 / 0.06)", border: "1px solid rgb(52 211 153 / 0.20)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#34d399" }}>Erforderlich</p>
        <p className="text-[13px]" style={{ color: T.primary }}>TripAdvisor-Rentals-Eigentümerkonto + Zugriff auf die Unterkunft</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Öffnen Sie tripadvisor.com/rentals und melden Sie sich in Ihrem Eigentümerkonto an.",
          "Falls Sie mehrere Unterkünfte verwalten, wählen Sie die passende aus.",
          "Klicken Sie in der oberen Menüleiste auf den Reiter Kalender (Calendar).",
          "Suchen Sie auf der Kalenderseite den Button Kalender exportieren (Export calendar), meist rechts oder oben.",
          "Klicken Sie im erscheinenden Fenster auf Link kopieren (Copy Link / Copy to clipboard).",
          "Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim TripAdvisor-Feed hinzu.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox>Die Oberfläche von TripAdvisor Rentals kann sich gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.</InfoBox>
    </div>
  );
}

function ExpediaContent() {
  return (
    <div className="flex flex-col gap-5">
      <InfoBox type="warn">
        Im Expedia Partner Central ist der iCal-Export nicht für jede Unterkunft verfügbar. Bei manchen Unterkunftstypen unterstützt Expedia ausschließlich die Nutzung eines professionellen Channel-Manager-Systems.
      </InfoBox>
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(251 191 36 / 0.06)", border: "1px solid rgb(251 191 36 / 0.20)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#fbbf24" }}>Erforderlich</p>
        <p className="text-[13px]" style={{ color: T.primary }}>Expedia-Partner-Central-Konto + Zugriff auf die Unterkunft</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Öffnen Sie expediapartnercentral.com und melden Sie sich mit Ihrem Partnerkonto an.",
          "Suchen Sie im Hauptmenü den Punkt Zimmer und Preise (Rooms and Rates).",
          "Wählen Sie Zimmertypen und Preispläne (Room types and Rate plans).",
          "Suchen Sie die Option Kalender verbinden (Connect calendars).",
          "Falls Sie mehrere Zimmer verwalten, wählen Sie die passende Unterkunft aus.",
          "Scrollen Sie zum Bereich Expedia-Group-Kalenderexport und klicken Sie auf Link erstellen (Create link).",
          "Kopieren Sie den erstellten Link.",
          "Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim Expedia-Feed hinzu.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox type="warn">
        Wenn der Menüpunkt „Kalender verbinden" nicht erscheint, erwartet Expedia für diese Unterkunft ein Channel-Manager-System — iCal-Export ist dann nicht verfügbar.
      </InfoBox>
      <InfoBox>Die Oberfläche von Expedia Partner Central kann sich gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.</InfoBox>
    </div>
  );
}
/* ─── Plain text export ─────────────────────────────────────────── */
const TAB_TEXT: Record<string, string> = {
  start: `APARTMENT ASSISTANT – iCal-Einrichtungsanleitung
Erste Schritte
==============

Was ist iCal?
iCal ist eine internetbasierte Kalenderverbindung. Damit können verschiedene Buchungsplattformen (z. B. Booking.com oder Airbnb) ihren Buchungskalender automatisch mit Apartment Assistant teilen — Sie müssen die Gästedaten also nicht mehr von Hand eintragen.

Bevor Sie beginnen:
- Ein Apartment-Assistant-Konto
- Mindestens eine hinzugefügte Ferienwohnung
- Der von der Buchungsplattform kopierte iCal-Link

iCal-Link zur App hinzufügen:
1. Tippen Sie auf + Neue Ferienwohnung hinzufügen.
2. Geben Sie den Namen der Ferienwohnung ein und wählen Sie eine Farbe. Tippen Sie auf Hinzufügen.
3. Die Ferienwohnung erscheint in der Liste. Tippen Sie auf den Pfeil nach unten auf der rechten Seite.
4. Tippen Sie auf + iCal-Feed hinzufügen.
5. Wählen Sie die Buchungsplattform aus (Airbnb, Booking.com, Google Kalender usw.).
6. Fügen Sie den kopierten Link (https://...) in das Feld iCal-URL ein. Tippen Sie auf Speichern.
7. Wenn Sie mehrere Buchungsplattformen nutzen, wiederholen Sie die Schritte 4–6 für jede Plattform.

Gut zu wissen: Buchungen erscheinen nicht immer sofort — wie schnell eine neue Buchung sichtbar wird, hängt von der Buchungsplattform ab. Das ist völlig normal.`,

  airbnb: `APARTMENT ASSISTANT – iCal-Einrichtungsanleitung
Airbnb
======

Erforderlich: Airbnb-Gastgeberkonto + Zugriff auf die Unterkunft

1. Öffnen Sie airbnb.de und melden Sie sich bei Ihrem Konto an.
2. Klicken Sie oben rechts auf Gastgeberaufgaben. Falls nicht sichtbar, wählen Sie Zur Gastgeberansicht wechseln.
3. Klicken Sie in der oberen Menüleiste auf Inserate.
4. Klicken Sie auf die Unterkunft, die Sie verbinden möchten.
5. Klicken Sie im Inserat auf den Reiter Preise und Verfügbarkeit.
6. Scrollen Sie nach unten, bis Sie den Bereich Kalendersynchronisierung finden.
7. Klicken Sie auf Kalender exportieren.
8. Kopieren Sie den angezeigten Link — das ist die iCal-URL.
9. Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim Airbnb-Feed hinzu.

Gut zu wissen: Die Airbnb-Oberfläche kann sich gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.`,

  booking: `APARTMENT ASSISTANT – iCal-Einrichtungsanleitung
Booking.com
===========

Erforderlich: Booking.com-Partnerkonto + Extranet-Zugang

1. Öffnen Sie booking.com und melden Sie sich mit Ihrem Partnerkonto an.
2. Nach der Anmeldung öffnen Sie das Booking.com Extranet.
3. Suchen Sie im Hauptmenü des Extranets den Menüpunkt Zimmer & Verfügbarkeit oder Kalender.
4. Öffnen Sie den Bereich Kalendersynchronisierung (iCal sync / Calendar sync).
5. Suchen Sie die Option iCal-Export / Kalender exportieren.
6. Kopieren Sie den angezeigten Link — das ist die iCal-URL.
7. Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim Booking.com-Feed hinzu.

Gut zu wissen: Die Oberfläche und die Menüpunkte des Booking.com Extranets können sich gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.`,

  google: `APARTMENT ASSISTANT – iCal-Einrichtungsanleitung
Google Kalender
===============

Erforderlich: Google-Konto + Buchungskalender in Google Kalender • Nur am Computer

1. Öffnen Sie calendar.google.com und melden Sie sich an.
2. Suchen Sie links unter Meine Kalender den Kalender für Ihre Unterkunft.
3. Bewegen Sie den Mauszeiger über den Kalendernamen und klicken Sie auf die drei senkrechten Punkte.
4. Wählen Sie Einstellungen und Freigabe.
5. Suchen Sie im linken Menü den Punkt Kalender integrieren.
6. Suchen Sie den Bereich Geheime Adresse im iCal-Format.
7. Klicken Sie auf das Kopieren-Symbol oder kopieren Sie den gesamten Link.
8. Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim Google-Kalender-Feed hinzu.

Gut zu wissen: Google kann den Aufbau von Kalender gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.`,

  vrbo: `APARTMENT ASSISTANT – iCal-Einrichtungsanleitung
VRBO
====

Erforderlich: VRBO-Vermieterkonto + Zugriff auf die Unterkunft

1. Öffnen Sie vrbo.com und melden Sie sich in Ihrem Vermieterkonto an (Owner Dashboard).
2. Falls Sie mehrere Objekte verwalten, wählen Sie das passende aus.
3. Klicken Sie im linken Menü auf Kalender (Calendar).
4. Suchen Sie die Option Import & Export (Import & Export).
5. Klicken Sie auf Kalender exportieren (Export calendar).
6. Klicken Sie auf URL kopieren (Copy URL).
7. Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim VRBO-Feed hinzu.

Achtung: Auf der VRBO-Oberfläche kann ein Kästchen "Include tentative reservations" erscheinen. Wenn Sie den iCal-Link für Apartment Assistant verwenden, lassen Sie es deaktiviert.`,

  tripadvisor: `APARTMENT ASSISTANT – iCal-Einrichtungsanleitung
TripAdvisor
===========

Erforderlich: TripAdvisor-Rentals-Eigentümerkonto + Zugriff auf die Unterkunft

1. Öffnen Sie tripadvisor.com/rentals und melden Sie sich in Ihrem Eigentümerkonto an.
2. Falls Sie mehrere Unterkünfte verwalten, wählen Sie die passende aus.
3. Klicken Sie in der oberen Menüleiste auf den Reiter Kalender (Calendar).
4. Suchen Sie den Button Kalender exportieren (Export calendar) (meist rechts oder oben).
5. Klicken Sie auf Link kopieren (Copy Link / Copy to clipboard).
6. Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim TripAdvisor-Feed hinzu.

Gut zu wissen: Die Oberfläche von TripAdvisor Rentals kann sich gelegentlich ändern. Wenn ein Menüpunkt an anderer Stelle erscheint, suchen Sie nach derselben Funktion in der aktuellen Oberfläche.`,

  expedia: `APARTMENT ASSISTANT – iCal-Einrichtungsanleitung
Expedia
=======

Achtung: Im Expedia Partner Central ist der iCal-Export nicht für jede Unterkunft verfügbar.

Erforderlich: Expedia-Partner-Central-Konto + Zugriff auf die Unterkunft

1. Öffnen Sie expediapartnercentral.com und melden Sie sich an.
2. Suchen Sie im Hauptmenü den Punkt Zimmer und Preise (Rooms and Rates).
3. Wählen Sie Zimmertypen und Preispläne (Room types and Rate plans).
4. Suchen Sie die Option Kalender verbinden (Connect calendars).
5. Falls Sie mehrere Zimmer verwalten, wählen Sie die passende Unterkunft aus.
6. Scrollen Sie zum Expedia-Group-Kalenderexport und klicken Sie auf Link erstellen (Create link).
7. Kopieren Sie den erstellten Link.
8. Kehren Sie zu Apartment Assistant zurück und fügen Sie diesen Link beim Expedia-Feed hinzu.

Achtung: Wenn "Kalender verbinden" nicht erscheint, erwartet Expedia für diese Unterkunft ein Channel-Manager-System — iCal-Export ist dann nicht verfügbar.`,
};

function downloadTxt(tabId: string, label: string) {
  const text = TAB_TEXT[tabId] ?? "";
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ical-anleitung-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
/* ─── Content router ────────────────────────────────────────────── */
function TabContent({ tabId }: { tabId: string }) {
  switch (tabId) {
    case "start":       return <ErsteSchritteContent />;
    case "airbnb":      return <AirbnbContent />;
    case "booking":     return <BookingContent />;
    case "google":      return <GoogleContent />;
    case "vrbo":        return <VrboContent />;
    case "tripadvisor": return <TripadvisorContent />;
    case "expedia":     return <ExpediaContent />;
    default:            return <ErsteSchritteContent />;
  }
}

/* ─── Main modal ────────────────────────────────────────────────── */
interface IcalHelpModalProps {
  onClose: () => void;
}

export function IcalHelpModal({ onClose }: IcalHelpModalProps) {
const [activeTab, setActiveTab] = useState("start");
  const active = TABS.find(t => t.id === activeTab)!;
  const activeIndex = TABS.findIndex(t => t.id === activeTab);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center sm:px-4"
      style={{ background: "rgb(0 0 0 / 0.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
    >
      <div
        className="relative flex w-full flex-col rounded-t-3xl sm:max-w-2xl sm:rounded-3xl"
        style={{
          background: "#1C2422",
          boxShadow: "0 -8px 48px rgb(0 0 0 / 0.60), 0 0 0 1px rgb(86 176 187 / 0.18)",
          maxHeight: "92dvh",
        }}
      >
        {/* ── Header ── */}
        <div className="shrink-0 px-5 pt-4 pb-4" style={{ borderBottom: `1px solid ${TEAL.border}` }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-semibold" style={{ color: T.primary }}>📋 iCal-Einrichtungsanleitung</h2>
              <p className="text-[12px] mt-0.5" style={{ color: T.secondary }}>Wählen Sie die Plattform aus, die Sie verbinden möchten</p>
            </div>
            <button
              type="button"
              onClick={() => downloadTxt(activeTab, active.label)}
              className="pressable flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-soft"
              style={{ background: "rgb(86 176 187 / 0.12)", color: "#7dd4dd", outline: "1px solid rgb(86 176 187 / 0.30)" }}
            >
              ⬇ Als .txt speichern
            </button>
            <button
              type="button"
              onClick={onClose}
              className="pressable flex h-8 w-8 items-center justify-center rounded-full transition-soft"
              style={{ background: CORAL.bg, boxShadow: CORAL.glow }}
              aria-label="Schließen"
            >
              <X className="h-4 w-4" style={{ color: CORAL.text }} />
            </button>
          </div>

 {/* ── Tab bar ── */}
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(TABS[Math.max(0, activeIndex - 1)].id)}
              disabled={activeIndex === 0}
              className="pressable shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-soft"
              style={{ background: "rgb(38 46 44 / 0.80)", color: activeIndex === 0 ? "rgb(86 176 187 / 0.25)" : T.secondary, outline: `1px solid ${TEAL.border}` }}
            >
              ‹
            </button>
            <div className="flex-1 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="pressable shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-soft"
                    style={isActive
                      ? { background: tab.activeBg, color: tab.activeText, outline: `1px solid ${tab.activeBorder}` }
                      : { background: "rgb(38 46 44 / 0.60)", color: T.secondary, outline: `1px solid ${TEAL.border}` }
                    }
                  >
                    <span>{tab.emoji}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setActiveTab(TABS[Math.min(TABS.length - 1, activeIndex + 1)].id)}
              disabled={activeIndex === TABS.length - 1}
              className="pressable shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-soft"
              style={{ background: "rgb(38 46 44 / 0.80)", color: activeIndex === TABS.length - 1 ? "rgb(86 176 187 / 0.25)" : T.secondary, outline: `1px solid ${TEAL.border}` }}
            >
              ›
            </button>
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: "calc(92dvh - 140px)" }}>
          <div className="px-5 py-5 pb-8">
            {/* Active tab title */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">{active.emoji}</span>
              <h3 className="text-[15px] font-bold" style={{ color: active.activeText }}>{active.label}</h3>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${active.activeBorder}, transparent)` }} />
            </div>
            <TabContent tabId={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}
