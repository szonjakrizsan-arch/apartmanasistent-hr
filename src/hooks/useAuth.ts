import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

export interface AuthState {
  user: User | null;
  loading: boolean;
  passwordRecovery: boolean;
  clearRecovery: () => void;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const isRecovery = hash.includes("type=recovery");
    if (isRecovery) {
      sessionStorage.setItem("passwordRecovery", "true");
    }

    /* Wichtig: Wenn der Nutzer den Tab wechselt (z. B. kurz in Gmail nachschaut)
       und zurueckkommt, erneuert Supabase automatisch das Token und feuert ein
       Auth-Event. Wuerden wir dabei jedes Mal ein NEUES User-Objekt in den State
       schreiben, wuerde die gesamte App neu aufgebaut - geoeffnete Buchungen und
       halb ausgefuellte Formulare gingen verloren.
       Deshalb aktualisieren wir den State nur, wenn sich die User-ID
       tatsaechlich aendert (An-/Abmeldung, Nutzerwechsel). */
    function applyUser(next: User | null) {
      setUser((prev) => {
        if (prev?.id === next?.id) return prev; // gleiche Identitaet -> Referenz behalten
        return next;
      });
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const recovering = sessionStorage.getItem("passwordRecovery") === "true";
      if (recovering && session?.user) {
        setPasswordRecovery(true);
      }
      applyUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          sessionStorage.setItem("passwordRecovery", "true");
          setPasswordRecovery(true);
          applyUser(session?.user ?? null);
        } else if (event === "SIGNED_OUT") {
          sessionStorage.removeItem("passwordRecovery");
          setPasswordRecovery(false);
          setUser(null);
        } else {
          /* TOKEN_REFRESHED, SIGNED_IN, USER_UPDATED, INITIAL_SESSION ...
             applyUser sorgt dafuer, dass sich nichts aendert, solange es
             derselbe Nutzer ist. */
          applyUser(session?.user ?? null);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    passwordRecovery,
    clearRecovery: () => {
      sessionStorage.removeItem("passwordRecovery");
      setPasswordRecovery(false);
    }
  };
}
