import { Home, LogOut } from "lucide-react";
import type { TabId } from "../types/navigation";
import { supabase } from "../supabaseClient";

const titles: Record<TabId, { title: string; subtitle?: string }> = {
  home:      { title: "Apartman Asistent", subtitle: "Vaš današnji dan"    },
  bookings:  { title: "Rezervacije",       subtitle: "Aktivne rezervacije" },
  tasks:     { title: "Zadaci",            subtitle: "Dnevni zadaci"       },
  invoices:  { title: "Računi",            subtitle: "Plaćanja"            },
  contacts:  { title: "Kontakti",          subtitle: "Gosti"               },
  apartments: { title: "Apartmani", subtitle: "iCal postavke" },
};

export function AppHeader({ tab }: { tab: TabId }) {
  const { title, subtitle } = titles[tab];
  return (
    <header className="app-header sticky top-0 z-40 safe-top">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-2.5 md:px-8">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "rgb(99 190 162 / 0.10)",
            color:      "#63bea2",
            outline:    "1px solid rgb(99 190 162 / 0.16)",
          }}
        >
          <Home className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[14px] font-semibold leading-tight tracking-tight text-text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="truncate text-[11px] leading-tight text-text-muted">{subtitle}</p>
          )}
        </div>
      <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="pressable flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-soft"
          style={{
            background: "rgb(207 102 85 / 0.08)",
            color:      "rgb(207 102 85 / 0.7)",
            outline:    "1px solid rgb(207 102 85 / 0.15)",
          }}
          aria-label="Odjava"
        >
          <LogOut className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}