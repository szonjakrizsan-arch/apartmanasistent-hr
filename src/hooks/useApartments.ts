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

const DEMO_FEED_URL = "https://app.apartmanasistent.hr/api/demo-ical";

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
    // Prvo brišemo pripadajuće iCal feedove, kako ne bi ostali
    // "osiroteli" retci feedova koji upućuju na apartman koji
    // više ne postoji.
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

  /** Kreira demo apartmane + pripadajuće demo iCal feedove, kako bi korisnica
   *  mogla isprobati aplikaciju bez rizika, prije nego unese vlastite podatke.
   *
   *  Namjerno se kreiraju tri apartmana: samo tako nastaje realističan
   *  dan s istovremenim dolaskom, prisutnim gostom i odlaskom. Kod samo
   *  jednog apartmana na početnoj stranici bile bi gotovo posvuda nule. */
  async function addDemoApartment() {
    if (!userId) return;

    const demoApartments: { name: string; accent: string; set: string }[] = [
      { name: "Primjer apartmana – Pogled na more", accent: "amber", set: "1" },
      { name: "Apartman Ružičnjak",                  accent: "sage",  set: "2" },
      { name: "Studio Stari Mlin",                   accent: "sky",   set: "3" },
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

  /** Briše sve demo apartmane i pripadajuće feedove,
   *  kako bi korisnica mogla unijeti vlastite podatke od čiste polazne točke. */
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
