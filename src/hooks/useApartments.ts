import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import type { ApartmentAccent } from "../data/mockData";

export interface ApartmentRow {
  id: string;
  name: string;
  accent: ApartmentAccent;
  is_demo?: boolean;
  cleaning_token?: string;
}

const DEMO_FEED_URL = "https://app.apartmentassistant.de/api/demo-ical";

export interface FeedRow {
  id: string;
  apartment_id: string;
  source: string;
  url: string;
}

export function useApartments(userId: string | undefined) {
  const [apartments, setApartments] = useState<ApartmentRow[]>([]);
  const [feeds, setFeeds]           = useState<FeedRow[]>([]);
  const [loading, setLoading]       = useState(true);

async function load() {
    setApartments([]);
    setFeeds([]);
    if (!userId) return;
    setLoading(true);
 
    const { data: apts } = await supabase
      .from("apartments")
      .select("id, name, accent, is_demo, cleaning_token")
      .eq("user_id", userId)
      .order("created_at");

      const { data: fds } = await supabase
      .from("ical_feeds")
      .select("id, apartment_id, source, url")
      .eq("user_id", userId);

    setApartments(apts ?? []);
    setFeeds(fds ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [userId]);

  async function addApartment(name: string, accent: ApartmentAccent) {
    if (!userId) return;
    await supabase.from("apartments").insert({ user_id: userId, name, accent });
    await load();
  }

  async function deleteApartment(id: string) {
    // Zuerst die zugehörigen iCal-Feeds löschen, damit keine
    // "verwaisten" Feed-Zeilen auf eine nicht mehr existierende
    // Ferienwohnung verweisen.
    await supabase.from("ical_feeds").delete().eq("apartment_id", id);
    await supabase.from("apartments").delete().eq("id", id);
    await load();
  }

  async function addFeed(apartmentId: string, source: string, url: string) {
    if (!userId) return;
    await supabase.from("ical_feeds").insert({ user_id: userId, apartment_id: apartmentId, source, url });
    await load();
  }

  async function deleteFeed(id: string) {
    await supabase.from("ical_feeds").delete().eq("id", id);
    await load();
  }

  /** Demo-Ferienwohnungen + zugehörige Demo-iCal-Feeds anlegen, damit die Nutzerin
   *  die App risikofrei ausprobieren kann, bevor sie ihre eigenen Daten einträgt.
   *
   *  Es werden bewusst drei Wohnungen angelegt: nur so entsteht ein realistischer
   *  Tag mit gleichzeitiger Anreise, anwesendem Gast und Abreise. Bei nur einer
   *  Wohnung stünden auf der Startseite fast überall Nullen. */
  async function addDemoApartment() {
    if (!userId) return;

    const demoApartments: { name: string; accent: string; set: string }[] = [
      { name: "Muster-Ferienwohnung – Seeblick", accent: "amber", set: "1" },
      { name: "Ferienwohnung Rosengarten",       accent: "sage",  set: "2" },
      { name: "Studio Alte Mühle",               accent: "sky",   set: "3" },
    ];

    for (const demo of demoApartments) {
      const { data: apt } = await supabase
        .from("apartments")
        .insert({ user_id: userId, name: demo.name, accent: demo.accent, is_demo: true })
        .select("id")
        .single();
      if (apt) {
        await supabase.from("ical_feeds").insert({
          user_id: userId,
          apartment_id: apt.id,
          source: "google",
          url: `${DEMO_FEED_URL}?apt=${demo.set}`,
        });
      }
    }

    await load();
  }

  /** Alle Demo-Ferienwohnungen und die zugehörigen Feeds löschen,
   *  damit die Nutzerin mit einer sauberen Ausgangslage ihre eigenen Daten einträgt. */
  async function deleteDemoApartments() {
    if (!userId) return;
    const demoIds = apartments.filter((a) => a.is_demo).map((a) => a.id);
    if (demoIds.length) {
      await supabase.from("ical_feeds").delete().in("apartment_id", demoIds);
      await supabase.from("apartments").delete().in("id", demoIds);
    }
    await load();
  }

  return {
    apartments, feeds, loading,
    addApartment, deleteApartment, addFeed, deleteFeed,
    addDemoApartment, deleteDemoApartments,
  };
}
