export type PaymentStatus  = "paid" | "pending" | "partial";
export type BookingSource  = "Airbnb" | "Booking" | "Google" | "VRBO" | "TripAdvisor" | "Expedia";
export type ApartmentAccent = "coral" | "sage" | "sky" | "lavender" | "amber";
export type BookingStatus  = "arriving" | "staying" | "departing";

export interface FutureBooking {
  id: string;
  apartment: string;
  arrival: string;          /* display string, e.g. "3. Jun." */
  nights: number;
  source: BookingSource;
  guestName?: string;       /* optional — may not exist from iCal */
  accent: ApartmentAccent;
_checkinRaw?:  string;
  _checkoutRaw?: string;
  hasSourceConflict?: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  icon: "arrivals" | "staying" | "departures";
}

export interface Booking {
  id: string;
  apartment: string;
  arrival: string;
  departure: string;
  nights: number;
  paymentStatus: PaymentStatus;
  source: BookingSource;
  guestName?: string;      /* iCal bookings may not have this */
  accent: ApartmentAccent;
  status: BookingStatus;
  isTodayArrival?: boolean;
  isTodayDeparture?: boolean;
  hasSourceConflict?: boolean;
  singleSourceRisk?: boolean;
  
  /* diagnostic fields — raw iCal data */
  _uid?: string;
  _summary?: string;
  _checkinRaw?: string;
  _checkoutRaw?: string;
  _isActiveRaw?: boolean;
}

export interface WeekDay {
  date: string;
  dayLabel: string;
  isToday: boolean;
  arrivals: number;
  departures: number;
  occupied: number;
}


export interface Alert {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "booking" | "payment" | "maintenance" | "guest";
  read: boolean;
}

export const stats: StatItem[] = [
  { id: "1", label: "Dolazak danas",  value: 3,  icon: "arrivals"   },
  { id: "2", label: "Gost prisutan", value: 12, icon: "staying"    },
  { id: "3", label: "Odlazak danas",  value: 2,  icon: "departures" },
];

/** Fallback empty array — real bookings come from useIcalBookings hook */
export const bookings: Booking[] = [];

export const todayMovements = bookings.filter(
  (b) => b.isTodayArrival || b.isTodayDeparture,
);

export const weekOverview: WeekDay[] = [
  { date: "12", dayLabel: "Pon", isToday: false, arrivals: 1, departures: 0, occupied: 9  },
  { date: "13", dayLabel: "Uto", isToday: false, arrivals: 2, departures: 1, occupied: 10 },
  { date: "14", dayLabel: "Sri", isToday: false, arrivals: 0, departures: 2, occupied: 8  },
  { date: "15", dayLabel: "Čet", isToday: false, arrivals: 1, departures: 1, occupied: 8  },
  { date: "16", dayLabel: "Pet", isToday: true,  arrivals: 3, departures: 2, occupied: 12 },
  { date: "17", dayLabel: "Sub", isToday: false, arrivals: 2, departures: 1, occupied: 13 },
  { date: "18", dayLabel: "Ned", isToday: false, arrivals: 1, departures: 0, occupied: 14 },
];


export const alerts: Alert[] = [
  {
    id: "1",
    title: "Nova rezervacija",
    message: "Ivan Horvat — Stari grad Loft, od 17. svibnja",
    time: "prije 8 minuta",
    type: "booking",
    read: false,
  },
  {
    id: "2",
    title: "Plaćanje na čekanju",
    message: "Nedostaje djelomično plaćanje od Ane Kovač",
    time: "prije 1 sat",
    type: "payment",
    read: false,
  },
  {
    id: "3",
    title: "Predaja ključeva danas",
    message: "Marija Novak dolazi oko 15:00 — Panorama Studio",
    time: "Danas",
    type: "guest",
    read: false,
  },
  {
    id: "4",
    title: "Održavanje perilice rublja",
    message: "Vrtni pogled Premium — servis sljedeći tjedan",
    time: "Jučer",
    type: "maintenance",
    read: true,
  },
];

/** Fallback empty array — real future bookings come from useIcalBookings hook */
export const futureBookings: FutureBooking[] = [];
