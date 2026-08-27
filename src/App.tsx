import { useEffect, useState } from "react";
import { AppHeader }      from "./components/AppHeader";
import { SideNav }        from "./components/SideNav";
import { BottomNav }      from "./components/BottomNav";
import { HomeScreen }     from "./screens/HomeScreen";
import { BookingsScreen } from "./screens/BookingsScreen";
import { TasksScreen }    from "./screens/TasksScreen";
import { InvoicesScreen } from "./screens/InvoicesScreen";
import { ContactsScreen } from "./screens/ContactsScreen";
import { AuthScreen }     from "./screens/AuthScreen";
import { ResetPasswordScreen } from "./screens/ResetPasswordScreen";
import { useAppState }    from "./data/appState";
import { useIcalBookings } from "./data/useIcalBookings";
import { useAuth }        from "./hooks/useAuth";
import type { TabId }     from "./types/navigation";
import type { Booking }   from "./data/mockData";
import { useApartments } from "./hooks/useApartments";
import { ApartmentsScreen } from "./screens/ApartmentsScreen";
import { supabase } from "./supabaseClient";

// Ako je true: nakon registracije korisnik se može prijaviti tek kada
// polje profiles.approved ručno potvrdite u Supabaseu.
// Ako je false: svatko dobiva pristup odmah.
// Vratiti na true ako ponovno bude potrebno (npr. kod puno spam registracija).
const REQUIRE_APPROVAL = false;

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [openBooking, setOpenBooking] = useState<Booking | null>(null);
  const [justRemovedDemo, setJustRemovedDemo] = useState(false);
  const { user, loading, passwordRecovery, clearRecovery } = useAuth();
  const appState = useAppState(user?.id);
  const { apartments, feeds, addApartment, deleteApartment, addFeed, deleteFeed, addDemoApartment, deleteDemoApartments } = useApartments(user?.id);
  const hasDemoApartments = apartments.some((a) => a.is_demo);
  const ical = useIcalBookings(apartments, feeds, user?.id);

  const [approved, setApproved] = useState<boolean | null>(null);
  const [approvedLoading, setApprovedLoading] = useState(false);

  useEffect(() => {
    if (!user) { setApproved(null); return; }
    /* Sučelje blokiramo samo ako se odobrenje stvarno provjerava. Inače
       upit se izvršava u pozadini — tako se aplikacija ne ponovno gradi
       kod osvježenja tokena (promjena kartice preglednika). */
    if (REQUIRE_APPROVAL) setApprovedLoading(true);
    supabase.from("profiles").select("approved").eq("id", user.id).single()
      .then(({ data }) => {
        setApproved(data?.approved ?? false);
        setApprovedLoading(false);
      });
  }, [user?.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  if (loading || approvedLoading) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center">
        <p className="text-text-muted text-[13px]">Učitavanje...</p>
      </div>
    );
  }

  if (passwordRecovery) {
    return <ResetPasswordScreen onDone={clearRecovery} />;
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (REQUIRE_APPROVAL && approved === false) {
    return (
      <div className="min-h-dvh bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: "rgb(99 190 162 / 0.15)", outline: "1px solid rgb(99 190 162 / 0.25)" }}>
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="text-[18px] font-bold text-text-primary">Čekanje odobrenja</h1>
          <p className="text-[13px] text-text-secondary leading-relaxed">
            Vaš račun je registriran, ali još nije odobren. Javit ćemo vam se uskoro!
          </p>
          <button type="button"
            onClick={() => supabase.auth.signOut()}
            className="mt-2 text-[12px] text-text-muted underline">
            Odjava
          </button>
        </div>
      </div>
    );
  }

  return (
   <div key={user.id} className="min-h-dvh bg-surface flex">
      <SideNav active={tab} onChange={setTab} />
      <div className="flex flex-col flex-1 min-w-0">
        <AppHeader tab={tab} />
        {hasDemoApartments && (
          <div className="mx-auto w-full max-w-2xl px-4 md:px-8">
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-[13px]"
              style={{ background: "rgb(216 185 104 / 0.22)", color: "#f0cb5e", outline: "1px solid rgb(216 185 104 / 0.45)" }}>
              <span className="font-bold">Nalazite se u demo načinu rada — ovo su izmišljeni podaci.</span>
              <button type="button" onClick={async () => {
                await deleteDemoApartments();
                setTab("apartments");
                setJustRemovedDemo(true);
              }}
                className="pressable font-semibold underline underline-offset-2">
                Obriši demo podatke i dodaj vlastiti apartman
              </button>
            </div>
          </div>
        )}
        <main className="mx-auto w-full max-w-2xl px-4 pt-5 pb-24 md:pb-8 md:px-8">
          {tab === "home" && (
            <HomeScreen onNavigate={setTab} appState={appState} ical={ical} hasApartments={apartments.length > 0} onAddDemo={addDemoApartment} />
          )}
          <div className={tab === "bookings" ? undefined : "hidden"}>
            <BookingsScreen appState={appState} ical={ical} openBooking={openBooking} setOpenBooking={setOpenBooking} />
          </div>
          {tab === "tasks" && (
            <TasksScreen appState={appState} ical={ical} apartments={apartments} />
          )}
          {tab === "invoices" && <InvoicesScreen appState={appState} ical={ical} />}
          {tab === "contacts" && <ContactsScreen appState={appState} ical={ical} userId={user.id} />}
          {tab === "apartments" && (
            <ApartmentsScreen
              userId={user.id}
              shared={{ apartments, feeds, addApartment, deleteApartment, addFeed, deleteFeed }}
              autoOpenAdd={justRemovedDemo}
              onAutoOpenHandled={() => setJustRemovedDemo(false)}
            />
          )}
        </main>
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
