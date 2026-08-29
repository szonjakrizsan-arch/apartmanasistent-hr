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

    /* Važno: kada korisnik promijeni karticu (npr. nakratko provjeri Gmail)
       i vrati se, Supabase automatski obnavlja token i pokreće auth
       event. Kad bismo pritom svaki put upisali NOVI user objekt u state,
       cijela bi se aplikacija ponovno izgradila — otvorene rezervacije i
       napola ispunjeni obrasci bi se izgubili.
       Zato state ažuriramo samo kada se ID korisnika stvarno
       promijeni (prijava/odjava, promjena korisnika). */
    function applyUser(next: User | null) {
      setUser((prev) => {
        if (prev?.id === next?.id) return prev; // isti identitet -> zadrži referencu
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
             applyUser osigurava da se ništa ne mijenja dok je riječ o
             istom korisniku. */
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
