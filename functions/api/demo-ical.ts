/**
 * demo-ical.ts — dinamički generirani, fiktivni iCal feed za demo apartmane.
 *
 * Podaci su uvijek relativni prema današnjem danu, kako demo podaci
 * nikad ne bi "zastarjeli" — bez obzira kada netko aktivira demo,
 * vidi aktualne (nadolazeće/aktivne) rezervacije.
 *
 * Feed ovisno o query parametru ?apt=1|2|3 vraća drugi skup
 * rezervacija. Tako u demo verziji nastaje realističan dan s
 * istovremenim dolaskom, prisutnim gostom i odlaskom — umjesto
 * gotovo prazne stranice sa samim nulama.
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

/* Apartman 1 — "Pogled na more": danas dolazi gost.
   Dodatno jedna prošla i dvije nadolazeće rezervacije. */
const APT_1: DemoBooking[] = [
  { uid: "demo1-a", startOffset: -6, endOffset: -3, summary: "Rezervirano - Ana Kovač" },
  { uid: "demo1-b", startOffset:  0, endOffset:  3, summary: "Rezervirano - Ivan Horvat" },
  { uid: "demo1-c", startOffset:  5, endOffset:  9, summary: "Rezervirano - Marija Novak" },
  { uid: "demo1-d", startOffset: 14, endOffset: 18, summary: "Rezervirano - Obitelj Perić" },
];

/* Apartman 2 — "Ružičnjak": gost je trenutno prisutan
   (došao prije dva dana, odlazi za dva dana). */
const APT_2: DemoBooking[] = [
  { uid: "demo2-a", startOffset: -2, endOffset:  2, summary: "Rezervirano - Tomislav Babić" },
  { uid: "demo2-b", startOffset:  4, endOffset:  8, summary: "Rezervirano - Julija Marić" },
  { uid: "demo2-c", startOffset: 11, endOffset: 15, summary: "Rezervirano - Martin Vuković" },
];

/* Apartman 3 — "Stari Mlin": danas gost odlazi i istog dana
   dolazi sljedeći. Tako demo prikazuje najvažniji slučaj:
   odlazak + čišćenje + dolazak istog dana. */
const APT_3: DemoBooking[] = [
  { uid: "demo3-a", startOffset: -4, endOffset:  0, summary: "Rezervirano - Klaudija Knežević" },
  { uid: "demo3-b", startOffset:  0, endOffset:  4, summary: "Rezervirano - Stjepan Vidović" },
  { uid: "demo3-c", startOffset:  7, endOffset: 10, summary: "Rezervirano - Laura Radić" },
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
UID:${b.uid}@demo.apartmanasistent.hr
DTSTART;VALUE=DATE:${fmt(addDays(today, b.startOffset))}
DTEND;VALUE=DATE:${fmt(addDays(today, b.endOffset))}
DTSTAMP:${fmt(today)}T000000Z
SUMMARY:${b.summary}
END:VEVENT`
    )
    .join("\n");

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apartman Asistent//Demo Feed//HR
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
