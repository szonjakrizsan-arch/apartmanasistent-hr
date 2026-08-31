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
    label: "Prvi koraci",
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
    label: "Google kalendar",
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
        <h3 className="text-[15px] font-semibold mb-1" style={{ color: T.primary }}>Dobrodošli!</h3>
        <p className="text-[13px] leading-relaxed" style={{ color: T.secondary }}>
          Ovaj centar za pomoć vodi vas kroz prva postavljanja Apartman Asistenta. Upute su namijenjene početnicima, stoga detaljno objašnjavaju svaki važan korak.
        </p>
      </div>

      <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgb(38 46 44 / 0.50)", border: `1px solid ${TEAL.border}` }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: T.secondary }}>Što je iCal?</p>
        <p className="text-[13px] leading-relaxed" style={{ color: T.primary }}>
          iCal je internetska veza kalendara. Pomoću nje različite platforme za rezervacije (npr. Booking.com ili Airbnb) mogu automatski dijeliti svoj kalendar rezervacija s Apartman Asistentom — podatke o gostima više ne morate ručno unositi.
        </p>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: T.secondary }}>Prije nego što počnete</p>
        <div className="flex flex-col gap-2">
          {[
            "Račun na Apartman Asistentu",
            "Barem jedan dodani apartman",
            "iCal poveznica kopirana s platforme za rezervacije",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: "rgb(86 176 187 / 0.06)", border: `1px solid ${TEAL.dim}` }}>
              <span className="text-[13px]">✓</span>
              <span className="text-[13px]" style={{ color: T.primary }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: T.secondary }}>Dodavanje iCal poveznice u aplikaciju</p>
        <div className="flex flex-col gap-3">
          {[
            "Dodirnite + Dodaj novi apartman.",
            "Unesite naziv apartmana i odaberite boju. Dodirnite Dodaj.",
            "Apartman se pojavljuje na popisu. Dodirnite strelicu prema dolje na desnoj strani.",
            "Dodirnite + Dodaj iCal feed.",
            "Odaberite platformu za rezervacije (Airbnb, Booking.com, Google kalendar itd.).",
            "Umetnite kopiranu poveznicu (https://...) u polje iCal URL. Dodirnite Spremi.",
            "Ako koristite više platformi za rezervacije, ponovite korake 4–6 za svaku platformu.",
          ].map((step, i) => (
            <Step key={i} number={i + 1} text={step} />
          ))}
        </div>
      </div>

      <InfoBox>
        Rezervacije se ne pojavljuju uvijek odmah — koliko brzo nova rezervacija postaje vidljiva ovisi o platformi za rezervacije. To je posve normalno.
      </InfoBox>

      <InfoBox>
        Platforme za rezervacije povremeno mijenjaju svoje sučelje. Ako se gumb ili stavka izbornika pojavi na drugom mjestu nego u uputama, potražite istu funkciju u aktualnom sučelju.
      </InfoBox>
    </div>
  );
}

function AirbnbContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(255 90 95 / 0.08)", border: "1px solid rgb(255 90 95 / 0.25)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#ff8a8e" }}>Potrebno</p>
        <p className="text-[13px]" style={{ color: T.primary }}>Airbnb domaćinski račun + pristup smještaju</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Otvorite airbnb.hr i prijavite se na svoj račun.",
          "Kliknite gore desno na Domaćinski zadaci. Ako nije vidljivo, odaberite Prijeđi na prikaz domaćina.",
          "Kliknite u gornjem izborniku na Oglasi.",
          "Kliknite na smještaj koji želite povezati.",
          "U oglasu kliknite na karticu Cijene i dostupnost.",
          "Pomaknite se prema dolje dok ne pronađete odjeljak Sinkronizacija kalendara.",
          "Kliknite na Izvoz kalendara.",
          "Kopirajte prikazanu poveznicu — to je iCal URL.",
          "Vratite se u Apartman Asistent i dodajte tu poveznicu u Airbnb feed.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox>Sučelje Airbnb-a povremeno se mijenja. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.</InfoBox>
    </div>
  );
}

function BookingContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(0 130 200 / 0.08)", border: "1px solid rgb(0 130 200 / 0.25)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#5ab4f0" }}>Potrebno</p>
        <p className="text-[13px]" style={{ color: T.primary }}>Booking.com partnerski račun + pristup Extranetu</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Otvorite booking.com i prijavite se svojim partnerskim računom.",
          "Nakon prijave otvorite Booking.com Extranet — ovdje upravljate svojim smještajem.",
          "U glavnom izborniku Extraneta potražite stavku Sobe i dostupnost ili Kalendar.",
          "Otvorite odjeljak Sinkronizacija kalendara (iCal sync / Calendar sync).",
          "Potražite opciju iCal izvoz / Izvoz kalendara.",
          "Kopirajte prikazanu poveznicu — to je iCal URL.",
          "Vratite se u Apartman Asistent i dodajte tu poveznicu u Booking.com feed.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox>Sučelje i stavke izbornika Booking.com Extraneta povremeno se mijenjaju. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.</InfoBox>
    </div>
  );
}

function GoogleContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(234 67 53 / 0.08)", border: "1px solid rgb(234 67 53 / 0.25)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#f87171" }}>Potrebno</p>
        <p className="text-[13px]" style={{ color: T.primary }}>Google račun + kalendar rezervacija u Google kalendaru • Samo na računalu</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Otvorite calendar.google.com i prijavite se svojim Google računom.",
          "Lijevo pod Moji kalendari potražite kalendar koji koristite za svoj smještaj.",
          "Pomaknite pokazivač miša preko naziva kalendara i kliknite na tri okomite točke.",
          "U izborniku koji se pojavi odaberite Postavke i dijeljenje.",
          "U lijevom izborniku potražite stavku Integriranje kalendara (po potrebi se pomaknite prema dolje).",
          "Potražite odjeljak Tajna adresa u iCal formatu. Ondje se nalazi vaša jedinstvena poveznica.",
          "Kliknite na ikonu kopiranja ili kopirajte cijelu poveznicu.",
          "Vratite se u Apartman Asistent i dodajte tu poveznicu u feed Google kalendara.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox>Google povremeno mijenja izgled kalendara. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.</InfoBox>
    </div>
  );
}

function VrboContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(124 58 237 / 0.08)", border: "1px solid rgb(124 58 237 / 0.25)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>Potrebno</p>
        <p className="text-[13px]" style={{ color: T.primary }}>VRBO iznajmljivački račun + pristup smještaju</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Otvorite vrbo.com i prijavite se u svoj iznajmljivački račun (Owner Dashboard).",
          "Ako upravljate s više objekata, odaberite odgovarajući.",
          "U lijevom izborniku kliknite na Kalendar (Calendar).",
          "Potražite opciju Uvoz i izvoz (dvije strelice koje pokazuju jedna prema drugoj).",
          "Kliknite na Izvoz kalendara (Export calendar).",
          "U prozoru koji se pojavi kliknite na Kopiraj URL (Copy URL).",
          "Vratite se u Apartman Asistent i dodajte tu poveznicu u VRBO feed.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox type="warn">
        Na VRBO sučelju može se pojaviti kućica „Include tentative reservations". Ako iCal poveznicu koristite za Apartman Asistent, ostavite je isključenom.
      </InfoBox>
      <InfoBox>VRBO povremeno mijenja svoje sučelje. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.</InfoBox>
    </div>
  );
}

function TripadvisorContent() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(52 211 153 / 0.06)", border: "1px solid rgb(52 211 153 / 0.20)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#34d399" }}>Potrebno</p>
        <p className="text-[13px]" style={{ color: T.primary }}>TripAdvisor Rentals vlasnički račun + pristup smještaju</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Otvorite tripadvisor.com/rentals i prijavite se u svoj vlasnički račun.",
          "Ako upravljate s više smještaja, odaberite odgovarajući.",
          "U gornjem izborniku kliknite na karticu Kalendar (Calendar).",
          "Na stranici kalendara potražite gumb Izvoz kalendara (Export calendar), obično desno ili gore.",
          "U prozoru koji se pojavi kliknite na Kopiraj poveznicu (Copy Link / Copy to clipboard).",
          "Vratite se u Apartman Asistent i dodajte tu poveznicu u TripAdvisor feed.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox>Sučelje TripAdvisor Rentals povremeno se mijenja. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.</InfoBox>
    </div>
  );
}

function ExpediaContent() {
  return (
    <div className="flex flex-col gap-5">
      <InfoBox type="warn">
        U Expedia Partner Centralu iCal izvoz nije dostupan za svaki smještaj. Kod nekih vrsta smještaja Expedia podržava isključivo korištenje profesionalnog sustava upravitelja kanala (channel managera).
      </InfoBox>
      <div className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "rgb(251 191 36 / 0.06)", border: "1px solid rgb(251 191 36 / 0.20)" }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#fbbf24" }}>Potrebno</p>
        <p className="text-[13px]" style={{ color: T.primary }}>Expedia Partner Central račun + pristup smještaju</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          "Otvorite expediapartnercentral.com i prijavite se svojim partnerskim računom.",
          "U glavnom izborniku potražite stavku Sobe i cijene (Rooms and Rates).",
          "Odaberite Vrste soba i cjenovni planovi (Room types and Rate plans).",
          "Potražite opciju Povezivanje kalendara (Connect calendars).",
          "Ako upravljate s više soba, odaberite odgovarajući smještaj.",
          "Pomaknite se do odjeljka Izvoz kalendara Expedia Group i kliknite na Izradi poveznicu (Create link).",
          "Kopirajte izrađenu poveznicu.",
          "Vratite se u Apartman Asistent i dodajte tu poveznicu u Expedia feed.",
        ].map((step, i) => <Step key={i} number={i + 1} text={step} />)}
      </div>
      <InfoBox type="warn">
        Ako se stavka „Povezivanje kalendara" ne pojavi, Expedia za taj smještaj očekuje sustav upravitelja kanala — iCal izvoz tada nije dostupan.
      </InfoBox>
      <InfoBox>Sučelje Expedia Partner Centrala povremeno se mijenja. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.</InfoBox>
    </div>
  );
}
/* ─── Plain text export ─────────────────────────────────────────── */
const TAB_TEXT: Record<string, string> = {
  start: `APARTMAN ASISTENT – Upute za postavljanje iCal-a
Prvi koraci
===========

Što je iCal?
iCal je internetska veza kalendara. Pomoću nje različite platforme za rezervacije (npr. Booking.com ili Airbnb) mogu automatski dijeliti svoj kalendar rezervacija s Apartman Asistentom — podatke o gostima više ne morate ručno unositi.

Prije nego što počnete:
- Račun na Apartman Asistentu
- Barem jedan dodani apartman
- iCal poveznica kopirana s platforme za rezervacije

Dodavanje iCal poveznice u aplikaciju:
1. Dodirnite + Dodaj novi apartman.
2. Unesite naziv apartmana i odaberite boju. Dodirnite Dodaj.
3. Apartman se pojavljuje na popisu. Dodirnite strelicu prema dolje na desnoj strani.
4. Dodirnite + Dodaj iCal feed.
5. Odaberite platformu za rezervacije (Airbnb, Booking.com, Google kalendar itd.).
6. Umetnite kopiranu poveznicu (https://...) u polje iCal URL. Dodirnite Spremi.
7. Ako koristite više platformi za rezervacije, ponovite korake 4–6 za svaku platformu.

Dobro je znati: Rezervacije se ne pojavljuju uvijek odmah — koliko brzo nova rezervacija postaje vidljiva ovisi o platformi za rezervacije. To je posve normalno.`,

  airbnb: `APARTMAN ASISTENT – Upute za postavljanje iCal-a
Airbnb
======

Potrebno: Airbnb domaćinski račun + pristup smještaju

1. Otvorite airbnb.hr i prijavite se na svoj račun.
2. Kliknite gore desno na Domaćinski zadaci. Ako nije vidljivo, odaberite Prijeđi na prikaz domaćina.
3. Kliknite u gornjem izborniku na Oglasi.
4. Kliknite na smještaj koji želite povezati.
5. U oglasu kliknite na karticu Cijene i dostupnost.
6. Pomaknite se prema dolje dok ne pronađete odjeljak Sinkronizacija kalendara.
7. Kliknite na Izvoz kalendara.
8. Kopirajte prikazanu poveznicu — to je iCal URL.
9. Vratite se u Apartman Asistent i dodajte tu poveznicu u Airbnb feed.

Dobro je znati: Sučelje Airbnb-a povremeno se mijenja. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.`,

  booking: `APARTMAN ASISTENT – Upute za postavljanje iCal-a
Booking.com
===========

Potrebno: Booking.com partnerski račun + pristup Extranetu

1. Otvorite booking.com i prijavite se svojim partnerskim računom.
2. Nakon prijave otvorite Booking.com Extranet.
3. U glavnom izborniku Extraneta potražite stavku Sobe i dostupnost ili Kalendar.
4. Otvorite odjeljak Sinkronizacija kalendara (iCal sync / Calendar sync).
5. Potražite opciju iCal izvoz / Izvoz kalendara.
6. Kopirajte prikazanu poveznicu — to je iCal URL.
7. Vratite se u Apartman Asistent i dodajte tu poveznicu u Booking.com feed.

Dobro je znati: Sučelje i stavke izbornika Booking.com Extraneta povremeno se mijenjaju. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.`,

  google: `APARTMAN ASISTENT – Upute za postavljanje iCal-a
Google kalendar
===============

Potrebno: Google račun + kalendar rezervacija u Google kalendaru • Samo na računalu

1. Otvorite calendar.google.com i prijavite se.
2. Lijevo pod Moji kalendari potražite kalendar za svoj smještaj.
3. Pomaknite pokazivač miša preko naziva kalendara i kliknite na tri okomite točke.
4. Odaberite Postavke i dijeljenje.
5. U lijevom izborniku potražite stavku Integriranje kalendara.
6. Potražite odjeljak Tajna adresa u iCal formatu.
7. Kliknite na ikonu kopiranja ili kopirajte cijelu poveznicu.
8. Vratite se u Apartman Asistent i dodajte tu poveznicu u feed Google kalendara.

Dobro je znati: Google povremeno mijenja izgled kalendara. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.`,

  vrbo: `APARTMAN ASISTENT – Upute za postavljanje iCal-a
VRBO
====

Potrebno: VRBO iznajmljivački račun + pristup smještaju

1. Otvorite vrbo.com i prijavite se u svoj iznajmljivački račun (Owner Dashboard).
2. Ako upravljate s više objekata, odaberite odgovarajući.
3. U lijevom izborniku kliknite na Kalendar (Calendar).
4. Potražite opciju Uvoz i izvoz (Import & Export).
5. Kliknite na Izvoz kalendara (Export calendar).
6. Kliknite na Kopiraj URL (Copy URL).
7. Vratite se u Apartman Asistent i dodajte tu poveznicu u VRBO feed.

Pažnja: Na VRBO sučelju može se pojaviti kućica "Include tentative reservations". Ako iCal poveznicu koristite za Apartman Asistent, ostavite je isključenom.`,

  tripadvisor: `APARTMAN ASISTENT – Upute za postavljanje iCal-a
TripAdvisor
===========

Potrebno: TripAdvisor Rentals vlasnički račun + pristup smještaju

1. Otvorite tripadvisor.com/rentals i prijavite se u svoj vlasnički račun.
2. Ako upravljate s više smještaja, odaberite odgovarajući.
3. U gornjem izborniku kliknite na karticu Kalendar (Calendar).
4. Potražite gumb Izvoz kalendara (Export calendar) (obično desno ili gore).
5. Kliknite na Kopiraj poveznicu (Copy Link / Copy to clipboard).
6. Vratite se u Apartman Asistent i dodajte tu poveznicu u TripAdvisor feed.

Dobro je znati: Sučelje TripAdvisor Rentals povremeno se mijenja. Ako se stavka izbornika pojavi na drugom mjestu, potražite istu funkciju u aktualnom sučelju.`,

  expedia: `APARTMAN ASISTENT – Upute za postavljanje iCal-a
Expedia
=======

Pažnja: U Expedia Partner Centralu iCal izvoz nije dostupan za svaki smještaj.

Potrebno: Expedia Partner Central račun + pristup smještaju

1. Otvorite expediapartnercentral.com i prijavite se.
2. U glavnom izborniku potražite stavku Sobe i cijene (Rooms and Rates).
3. Odaberite Vrste soba i cjenovni planovi (Room types and Rate plans).
4. Potražite opciju Povezivanje kalendara (Connect calendars).
5. Ako upravljate s više soba, odaberite odgovarajući smještaj.
6. Pomaknite se do Izvoz kalendara Expedia Group i kliknite na Izradi poveznicu (Create link).
7. Kopirajte izrađenu poveznicu.
8. Vratite se u Apartman Asistent i dodajte tu poveznicu u Expedia feed.

Pažnja: Ako se "Povezivanje kalendara" ne pojavi, Expedia za taj smještaj očekuje sustav upravitelja kanala — iCal izvoz tada nije dostupan.`,
};

function downloadTxt(tabId: string, label: string) {
  const text = TAB_TEXT[tabId] ?? "";
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ical-upute-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}.txt`;
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
              <h2 className="text-[16px] font-semibold" style={{ color: T.primary }}>📋 Upute za postavljanje iCal-a</h2>
              <p className="text-[12px] mt-0.5" style={{ color: T.secondary }}>Odaberite platformu koju želite povezati</p>
            </div>
            <button
              type="button"
              onClick={() => downloadTxt(activeTab, active.label)}
              className="pressable flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-soft"
              style={{ background: "rgb(86 176 187 / 0.12)", color: "#7dd4dd", outline: "1px solid rgb(86 176 187 / 0.30)" }}
            >
              ⬇ Spremi kao .txt
            </button>
            <button
              type="button"
              onClick={onClose}
              className="pressable flex h-8 w-8 items-center justify-center rounded-full transition-soft"
              style={{ background: CORAL.bg, boxShadow: CORAL.glow }}
              aria-label="Zatvori"
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
