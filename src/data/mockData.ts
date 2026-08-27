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
  { id: "1", label: "Ankunft heute",  value: 3,  icon: "arrivals"   },
  { id: "2", label: "Gast anwesend", value: 12, icon: "staying"    },
  { id: "3", label: "Abreise heute",  value: 2,  icon: "departures" },
];

/** Fallback empty array — real bookings come from useIcalBookings hook */
export const bookings: Booking[] = [];

export const todayMovements = bookings.filter(
  (b) => b.isTodayArrival || b.isTodayDeparture,
);

export const weekOverview: WeekDay[] = [
  { date: "12", dayLabel: "Mo", isToday: false, arrivals: 1, departures: 0, occupied: 9  },
  { date: "13", dayLabel: "Di", isToday: false, arrivals: 2, departures: 1, occupied: 10 },
  { date: "14", dayLabel: "Mi", isToday: false, arrivals: 0, departures: 2, occupied: 8  },
  { date: "15", dayLabel: "Do", isToday: false, arrivals: 1, departures: 1, occupied: 8  },
  { date: "16", dayLabel: "Fr", isToday: true,  arrivals: 3, departures: 2, occupied: 12 },
  { date: "17", dayLabel: "Sa", isToday: false, arrivals: 2, departures: 1, occupied: 13 },
  { date: "18", dayLabel: "So", isToday: false, arrivals: 1, departures: 0, occupied: 14 },
];


export const alerts: Alert[] = [
  {
    id: "1",
    title: "Neue Buchung",
    message: "Michael Bauer — Altstadt Loft, ab 17. Mai",
    time: "vor 8 Minuten",
    type: "booking",
    read: false,
  },
  {
    id: "2",
    title: "Zahlung ausstehend",
    message: "Teilzahlung von Sabine Wagner fehlt noch",
    time: "vor 1 Stunde",
    type: "payment",
    read: false,
  },
  {
    id: "3",
    title: "Schlüsselübergabe heute",
    message: "Anna Schmidt kommt gegen 15:00 Uhr an — Panorama Studio",
    time: "Heute",
    type: "guest",
    read: false,
  },
  {
    id: "4",
    title: "Waschmaschinen-Wartung",
    message: "Gartenblick Premium — Service nächste Woche",
    time: "Gestern",
    type: "maintenance",
    read: true,
  },
];

/** Fallback empty array — real future bookings come from useIcalBookings hook */
export const futureBookings: FutureBooking[] = [];
