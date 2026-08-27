/**
 * demo-ical.ts — dynamisch generierter, fiktiver iCal-Feed für die Demo-Ferienwohnungen.
 *
 * Die Daten sind immer relativ zum heutigen Tag, damit die Demo-Daten
 * nie "veralten" — egal wann jemand die Demo aktiviert, sieht er
 * aktuelle (bevorstehende/laufende) Buchungen.
 *
 * Der Feed liefert je nach Query-Parameter ?apt=1|2|3 einen anderen
 * Buchungssatz. So entsteht in der Demo ein realistischer Tag mit
 * gleichzeitiger Anreise, anwesendem Gast und Abreise — statt einer
 * fast leeren Übersicht mit lauter Nullen.
 */

function fmt(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

interface DemoBooking {
  uid: string;
  startOffset: number;
  endOffset: number;
  summary: string;
}

/* Wohnung 1 — "Seeblick": heute reist ein Gast an.
   Zusätzlich eine vergangene und zwei kommende Buchungen. */
const APT_1: DemoBooking[] = [
  { uid: "demo1-a", startOffset: -6, endOffset: -3, summary: "Gebucht - Sabine Wagner" },
  { uid: "demo1-b", startOffset:  0, endOffset:  3, summary: "Gebucht - Johann Meier" },
  { uid: "demo1-c", startOffset:  5, endOffset:  9, summary: "Gebucht - Anna Schmidt" },
  { uid: "demo1-d", startOffset: 14, endOffset: 18, summary: "Gebucht - Familie Bergmann" },
];

/* Wohnung 2 — "Rosengarten": ein Gast ist gerade anwesend
   (angereist vor zwei Tagen, reist in zwei Tagen ab). */
const APT_2: DemoBooking[] = [
  { uid: "demo2-a", startOffset: -2, endOffset:  2, summary: "Gebucht - Thomas Krüger" },
  { uid: "demo2-b", startOffset:  4, endOffset:  8, summary: "Gebucht - Julia Hoffmann" },
  { uid: "demo2-c", startOffset: 11, endOffset: 15, summary: "Gebucht - Martin Fischer" },
];

/* Wohnung 3 — "Alte Mühle": heute reist ein Gast ab und noch am
   selben Tag der nächste an. Damit zeigt die Demo den wichtigsten
   Fall: Abreise + Reinigung + Anreise am gleichen Tag. */
const APT_3: DemoBooking[] = [
  { uid: "demo3-a", startOffset: -4, endOffset:  0, summary: "Gebucht - Claudia Neumann" },
  { uid: "demo3-b", startOffset:  0, endOffset:  4, summary: "Gebucht - Stefan Wolf" },
  { uid: "demo3-c", startOffset:  7, endOffset: 10, summary: "Gebucht - Laura Beck" },
];

const SETS: Record<string, DemoBooking[]> = {
  "1": APT_1,
  "2": APT_2,
  "3": APT_3,
};

export const onRequestGet: PagesFunction = async (context) => {
  const today = new Date(
    Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())
  );

  const url = new URL(context.request.url);
  const apt = url.searchParams.get("apt") ?? "1";
  const bookings = SETS[apt] ?? APT_1;

  const events = bookings
    .map(
      (b) => `BEGIN:VEVENT
UID:${b.uid}@demo.apartmentassistant.de
DTSTART;VALUE=DATE:${fmt(addDays(today, b.startOffset))}
DTEND;VALUE=DATE:${fmt(addDays(today, b.endOffset))}
DTSTAMP:${fmt(today)}T000000Z
SUMMARY:${b.summary}
END:VEVENT`
    )
    .join("\n");

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apartment Assistant//Demo Feed//DE
CALSCALE:GREGORIAN
${events}
END:VCALENDAR`;

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
