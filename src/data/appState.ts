import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../supabaseClient";
import type { Booking } from "./mockData";
import type { BookingDetailState } from "../components/BookingDetailDrawer";
import { makeEmptyDetailState } from "../components/BookingDetailDrawer";

export type PaymentMethod = "cash" | "transfer" | "paypal" | "booking" | "airbnb";
export type PaymentStatus = "pending" | "paid";

export interface PaymentData {
  amount: string;
  deposit: string;
  method: PaymentMethod;
  status: PaymentStatus;
}

export function makeEmptyPayment(): PaymentData {
  return { amount: "", deposit: "", method: "transfer", status: "pending" };
}

/** "300 €" / "300" → 300 (Zahl). Bei ungültiger Eingabe 0. */
export function parseAmount(s: string): number {
  const digits = (s || "").replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

/** Restbetrag = Gesamtbetrag − Anzahlung (nicht unter 0). */
export function remainingAmount(p: PaymentData): number {
  return Math.max(0, parseAmount(p.amount) - parseAmount(p.deposit));
}

/** Zahl → "300 €" Format. */
export function formatFt(n: number): string {
  return n.toLocaleString("de-DE") + " €";
}

export type CustomTaskRecurrence =
  | "once" | "daily"
  | "weekly_mon" | "weekly_tue" | "weekly_wed"
  | "weekly_thu" | "weekly_fri" | "weekly_sat" | "weekly_sun"
  | `date:${string}`;

export interface CustomTask {
  id:         string;
  label:      string;
  recurrence: CustomTaskRecurrence;
  done:       boolean;
  doneDate:   string | null;
}

export const RECURRENCE_LABELS: Record<string, string> = {
  once: "Einmalig", daily: "Täglich",
  weekly_mon: "Jeden Montag", weekly_tue: "Jeden Dienstag",
  weekly_wed: "Jeden Mittwoch", weekly_thu: "Jeden Donnerstag",
  weekly_fri: "Jeden Freitag", weekly_sat: "Jeden Samstag",
  weekly_sun: "Jeden Sonntag",
};

export function isCustomTaskActiveToday(task: CustomTask): boolean {
  const today = new Date();
  const dow = today.getDay();
  if (task.recurrence === "once") return true;
  if (task.recurrence === "daily") return true;
  if (task.recurrence === "weekly_mon") return dow === 1;
  if (task.recurrence === "weekly_tue") return dow === 2;
  if (task.recurrence === "weekly_wed") return dow === 3;
  if (task.recurrence === "weekly_thu") return dow === 4;
  if (task.recurrence === "weekly_fri") return dow === 5;
  if (task.recurrence === "weekly_sat") return dow === 6;
  if (task.recurrence === "weekly_sun") return dow === 0;
  if (task.recurrence.startsWith("date:")) {
    const dateStr = task.recurrence.slice(5);
    const todayStr = `${today.getFullYear()}.${String(today.getMonth()+1).padStart(2,"0")}.${String(today.getDate()).padStart(2,"0")}`;
    return dateStr === todayStr;
  }
  return false;
}

/** Gilt die wiederkehrende Aufgabe heute als erledigt?
 *  Nur wenn done=true UND doneDate der heutige Tag ist.
 *  Bei altem (gestrigem/vorwöchigem) doneDate gilt sie heute als offen. */
export function isCustomTaskDoneToday(task: CustomTask): boolean {
  if (!task.done) return false;
  if (!task.doneDate) return false;
  const today = new Date().toISOString().slice(0, 10);
  return task.doneDate === today;
}

export interface AppState {
  detailStates: Record<string, BookingDetailState>;
  paymentData:  Record<string, PaymentData>;
  customTasks:  CustomTask[];
  userName:     string;
}

export interface AppStateActions {
  getDetail:           (id: string) => BookingDetailState;
  setDetail:           (id: string, next: BookingDetailState) => void;
  getPayment:          (id: string) => PaymentData;
  setPayment:          (id: string, next: PaymentData) => void;
  togglePaymentStatus: (id: string) => void;
  isPaymentPaid:       (id: string) => boolean;
  prevCleaningFor:     (arrivingId: string, liveBookings: Booking[]) => boolean | undefined;
  setUserName:         (name: string) => void;
  addCustomTask:       (label: string, recurrence: CustomTaskRecurrence) => void;
  toggleCustomTask:    (id: string) => void;
  deleteCustomTask:    (id: string) => void;
}

export function useAppState(userId?: string): AppState & AppStateActions {
  const [detailStates, setDetailStates] = useState<Record<string, BookingDetailState>>({});
  const [paymentData,  setPaymentData]  = useState<Record<string, PaymentData>>({});
  const [customTasks,  setCustomTasks]  = useState<CustomTask[]>([]);
  const [userName, setUserNameState]    = useState("");

  /* Verhindert das "Buchstaben springen" beim Tippen in Kontaktfeldern:
     - debounceRef: verzögert den Supabase-Schreibvorgang (statt bei jedem
       Tastenanschlag), damit nicht ständig neue Netzwerk-Roundtrips laufen.
     - recentLocalWriteRef: merkt sich, wann zuletzt lokal geschrieben wurde,
       damit ein verspätetes Realtime-Echo der EIGENEN Änderung den gerade
       getippten Text nicht überschreibt. */
  const debounceRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const recentLocalWriteRef = useRef<Record<string, number>>({});

  /* ── Load from Supabase ── */
  const loadAll = useCallback(async () => {
    setPaymentData({});
    setDetailStates({});
    setCustomTasks([]);
    setUserNameState("");
    if (!userId) return;

    const [{ data: payments }, { data: details }, { data: tasks }] = await Promise.all([
      supabase.from("payment_data").select("*").eq("user_id", userId),
      supabase.from("detail_states").select("*").eq("user_id", userId),
      supabase.from("custom_tasks").select("*").eq("user_id", userId),
    ]);

    if (payments) {
      const map: Record<string, PaymentData> = {};
      for (const p of payments) {
        map[p.booking_id] = { amount: p.amount ?? "", deposit: p.deposit ?? "", method: p.method ?? "transfer", status: p.status ?? "pending" };
      }
      setPaymentData(map);
    }

    if (details) {
      const map: Record<string, BookingDetailState> = {};
      for (const d of details) {
        map[d.booking_id] = {
          cleaningDone: d.cleaning_done ?? false,
          keyReady:     d.key_ready ?? false,
          checkinSent:  d.checkin_sent ?? false,
          ntakDone:     d.ntak_done ?? false,
          note:         d.note ?? "",
          contactName:  d.contact_name ?? "",
          contactPhone: d.contact_phone ?? "",
          contactEmail: d.contact_email ?? "",
          contactNote:  d.contact_note ?? "",
        };
      }
      setDetailStates(map);
    }

    if (tasks) {
      const today = new Date().toISOString().slice(0, 10);
      const cleaned = tasks.map((t) => {
        const isStale = t.done && t.done_date !== today;
        return {
          id:         t.id,
          label:      t.label,
          recurrence: t.recurrence as CustomTaskRecurrence,
          done:       isStale ? false : (t.done ?? false),
          doneDate:   isStale ? null  : (t.done_date ?? null),
        };
      });
      setCustomTasks(cleaned);
      const staleIds = tasks.filter((t) => t.done && t.done_date !== today).map((t) => t.id);
      if (staleIds.length > 0) {
        await supabase.from("custom_tasks")
          .update({ done: false, done_date: null })
          .in("id", staleIds);
      }
    }
  }, [userId]);

  useEffect(() => { loadAll(); }, [loadAll]);

  /* Live-Updates: wenn eine Reinigungskraft über den öffentlichen
     Reinigungslink (functions/api/cleaning/[token].ts) eine Reinigung
     als "Erledigt" markiert, soll das sofort hier im Dashboard
     erscheinen, ohne dass die Seite neu geladen werden muss. */
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`detail_states_${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "detail_states", filter: `user_id=eq.${userId}` },
        (payload) => {
          const row = payload.new as any;
          if (!row?.booking_id) return;
          const lastLocalWrite = recentLocalWriteRef.current[row.booking_id] ?? 0;
          if (Date.now() - lastLocalWrite < 2000) return; // Echo der eigenen Änderung ignorieren
          setDetailStates((prev) => ({
            ...prev,
            [row.booking_id]: {
              cleaningDone: row.cleaning_done ?? false,
              keyReady:     row.key_ready ?? false,
              checkinSent:  row.checkin_sent ?? false,
              ntakDone:     row.ntak_done ?? false,
              note:         row.note ?? "",
              contactName:  row.contact_name ?? "",
              contactPhone: row.contact_phone ?? "",
              contactEmail: row.contact_email ?? "",
              contactNote:  row.contact_note ?? "",
            },
          }));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    supabase.from("profiles").select("display_name").eq("id", userId).single()
      .then(({ data }) => {
        if (data?.display_name) setUserNameState(data.display_name);
      });
  }, [userId]);

  /* ── Detail state ── */
  function getDetail(id: string): BookingDetailState {
    return detailStates[id] ?? makeEmptyDetailState();
  }

  function setDetail(id: string, next: BookingDetailState) {
    setDetailStates((p) => ({ ...p, [id]: next }));
    if (!userId) return;
    recentLocalWriteRef.current[id] = Date.now();

    if (debounceRef.current[id]) clearTimeout(debounceRef.current[id]);
    debounceRef.current[id] = setTimeout(async () => {
      recentLocalWriteRef.current[id] = Date.now();
      await supabase.from("detail_states").upsert({
        user_id:       userId,
        booking_id:    id,
        cleaning_done: next.cleaningDone,
        key_ready:     next.keyReady,
        checkin_sent:  next.checkinSent,
        ntak_done:     next.ntakDone,
        note:          next.note,
        contact_name:  next.contactName,
        contact_phone: next.contactPhone,
        contact_email: next.contactEmail,
        contact_note:  next.contactNote,
      }, { onConflict: "user_id,booking_id" });
    }, 500);
  }

  /* ── Payment data ── */
  function getPayment(id: string): PaymentData {
    return paymentData[id] ?? makeEmptyPayment();
  }

  async function setPayment(id: string, next: PaymentData) {
    setPaymentData((p) => ({ ...p, [id]: next }));
    if (!userId) return;
    await supabase.from("payment_data").upsert({
      user_id:    userId,
      booking_id: id,
      amount:     next.amount,
      deposit:    next.deposit,
      method:     next.method,
      status:     next.status,
    }, { onConflict: "user_id,booking_id" });
  }

  function togglePaymentStatus(id: string) {
    const current = getPayment(id);
    setPayment(id, { ...current, status: current.status === "paid" ? "pending" : "paid" });
  }

  function isPaymentPaid(id: string): boolean {
    return getPayment(id).status === "paid";
  }

  /** Findet die zuletzt bekannte Reinigungs-Erledigt-Markierung für die
   *  Ferienwohnung dieser ankommenden Buchung — unabhängig davon, ob die
   *  vorherige Abreise am selben Tag war oder Tage zuvor. Sucht dazu direkt
   *  in den geladenen detailStates nach dem booking_key mit demselben
   *  Apartment-Namen und dem jüngsten Check-out-Datum, das nicht nach dem
   *  Check-in dieser Buchung liegt. */
  function prevCleaningFor(arrivingId: string, liveBookings: Booking[]): boolean | undefined {
    const arriving = liveBookings.find((b) => b.id === arrivingId);
    if (!arriving) return undefined;
    const apt = arriving.apartment;
    const arrivalCheckin = arriving._checkinRaw;
    if (!arrivalCheckin) return undefined;

    let bestKey: string | null = null;
    let bestCheckout = "";
    for (const key of Object.keys(detailStates)) {
      const stripped = key.replace(/^ical-/, "");
      const parts = stripped.split("::");
      if (parts.length < 2) continue;
      const [keyApt, checkout] = parts;
      if (keyApt !== apt) continue;
      if (checkout > arrivalCheckin) continue; // nur vergangene/gleichzeitige Check-outs
      if (checkout > bestCheckout) {
        bestCheckout = checkout;
        bestKey = key;
      }
    }
    if (!bestKey) return undefined;
    return !!(detailStates[bestKey]?.cleaningDone);
  }

  /* ── Custom tasks ── */
  async function addCustomTask(label: string, recurrence: CustomTaskRecurrence) {
    if (!userId) return;
    const { data } = await supabase.from("custom_tasks").insert({
      user_id: userId, label, recurrence, done: false, done_date: null,
    }).select().single();
    if (data) {
      setCustomTasks((p) => [...p, {
        id: data.id, label: data.label, recurrence: data.recurrence,
        done: false, doneDate: null,
      }]);
    }
  }

  async function toggleCustomTask(id: string) {
    const today = new Date().toISOString().slice(0, 10);
    setCustomTasks((p) => p.map((t) => {
      if (t.id !== id) return t;
      const nowDone = !t.done;
      return { ...t, done: nowDone, doneDate: nowDone ? today : null };
    }));
    const task = customTasks.find((t) => t.id === id);
    if (!task || !userId) return;
    const nowDone = !task.done;
    await supabase.from("custom_tasks").update({
      done: nowDone, done_date: nowDone ? today : null,
    }).eq("id", id);
  }

  async function deleteCustomTask(id: string) {
    setCustomTasks((p) => p.filter((t) => t.id !== id));
    await supabase.from("custom_tasks").delete().eq("id", id);
  }

  return {
    detailStates, paymentData, customTasks, userName,
    getDetail, setDetail, getPayment, setPayment,
    togglePaymentStatus, isPaymentPaid, prevCleaningFor,
    setUserName: (name: string) => {
      setUserNameState(name);
      if (userId) {
        supabase.from("profiles").upsert({ id: userId, display_name: name }).then(() => {});
      }
    },
    addCustomTask, toggleCustomTask, deleteCustomTask,
  };
}

/* ── Derived tasks ── */
export type DerivedTaskType = "cleaning" | "payment" | "key" | "checkin" | "ntak";

export interface DerivedTask {
  id: string; bookingId: string; apartment: string;
  type: DerivedTaskType; label: string; sublabel: string;
  done: boolean; urgent: boolean;
}

export function deriveTasks(
  liveBookings: Booking[],
  detailStates: Record<string, BookingDetailState>,
  paymentData:  Record<string, PaymentData>,
): DerivedTask[] {
  const tasks: DerivedTask[] = [];
  for (const b of liveBookings) {
    const detail = detailStates[b.id] ?? makeEmptyDetailState();
    const pd     = paymentData[b.id]  ?? makeEmptyPayment();
    if (b.status === "arriving") {
      tasks.push({ id: `key-${b.id}`, bookingId: b.id, apartment: b.apartment, type: "key", label: `Schlüssel vorbereiten — ${b.apartment}`, sublabel: b.arrival, done: !!detail.keyReady, urgent: true });
      tasks.push({ id: `checkin-${b.id}`, bookingId: b.id, apartment: b.apartment, type: "checkin", label: `Check-in-Info senden — ${b.apartment}`, sublabel: b.arrival, done: !!detail.checkinSent, urgent: false });
      tasks.push({ id: `ntak-${b.id}`, bookingId: b.id, apartment: b.apartment, type: "ntak", label: `Meldeschein-Kontrolle — ${b.apartment}`, sublabel: b.arrival, done: !!detail.ntakDone, urgent: false });
      if (pd.status === "pending") tasks.push({ id: `payment-${b.id}`, bookingId: b.id, apartment: b.apartment, type: "payment", label: `Zahlung prüfen — ${b.apartment}`, sublabel: pd.amount ? `${pd.amount} · ${methodLabel(pd.method)}` : methodLabel(pd.method), done: false, urgent: true });
    }
    if (b.status === "staying" && pd.status === "pending" && pd.amount.trim()) {
      tasks.push({ id: `payment-${b.id}`, bookingId: b.id, apartment: b.apartment, type: "payment", label: `Zahlung prüfen — ${b.apartment}`, sublabel: `${pd.amount} · ${methodLabel(pd.method)}`, done: false, urgent: false });
    }
    if (b.status === "departing") {
      tasks.push({ id: `cleaning-${b.id}`, bookingId: b.id, apartment: b.apartment, type: "cleaning", label: `Reinigung — ${b.apartment}`, sublabel: "Heute Abreise · Dringend", done: !!detail.cleaningDone, urgent: true });
      if (pd.status === "pending") tasks.push({ id: `payment-${b.id}`, bookingId: b.id, apartment: b.apartment, type: "payment", label: `Zahlung prüfen — ${b.apartment}`, sublabel: pd.amount ? `${pd.amount} · ${methodLabel(pd.method)}` : methodLabel(pd.method), done: false, urgent: true });
    }
  }
  return tasks;
}

export function methodLabel(m: PaymentMethod): string {
  return { cash: "Bar", transfer: "Überweisung", paypal: "PayPal", booking: "Booking.com", airbnb: "Airbnb" }[m];
}

export interface DerivedInvoice {
  bookingId: string; apartment: string; amount: string;
  deposit: string; remaining: number;
  method: PaymentMethod; status: PaymentStatus; displayStatus: "paid" | "pending" | "overdue" | "partial";
  arrival: string; departure: string;
}

export function deriveInvoices(liveBookings: Booking[], paymentData: Record<string, PaymentData>): DerivedInvoice[] {
  return liveBookings
    .map((b) => {
      const pd = paymentData[b.id] ?? makeEmptyPayment();
      const overdue = pd.status === "pending" && b.status === "departing";
      return { bookingId: b.id, apartment: b.apartment, amount: pd.amount || "—", deposit: pd.deposit || "", remaining: remainingAmount(pd), method: pd.method, status: pd.status, displayStatus: pd.status === "paid" ? "paid" : overdue ? "overdue" : parseAmount(pd.deposit) > 0 ? "partial" : "pending", arrival: b.arrival, departure: b.departure };
    });
}
