import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";

export interface Profile {
  name: string;
  email: string;
  medicalSchool: string;
  currentCountry: string;
  graduationYear: string;
  graduationStatus: string;
  targetCountries: string[];
  interests: string[];
  priorities: string[];
  workStyle: string;
}

export const GRADUATION_STATUSES = ["Medical student", "Intern / foundation year", "Final year", "Graduate, not yet licensed", "Licensed doctor"];
export const INTERESTS = ["Acute care", "Longitudinal care", "Procedures", "Mental health", "Child health", "Diagnostics", "Research"];
export const PRIORITIES = ["Training length", "Work-life balance", "Earning potential", "Visa clarity", "Breadth of practice", "Location flexibility"];
export const WORK_STYLES = ["Analytical and reflective", "Hands-on and decisive", "People-centred and varied", "Fast-paced and collaborative", "Visual and technology-led"];

export const DEFAULT_PROFILE: Profile = {
  name: "", email: "", medicalSchool: "", currentCountry: "", graduationYear: "", graduationStatus: "",
  targetCountries: [], interests: [], priorities: [], workStyle: "",
};

interface AppContextValue {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  saveProfile: () => void;
  savedSpecialtyIds: string[];
  toggleSpecialty: (id: string) => void;
  savedCountryIds: string[];
  toggleCountry: (id: string) => void;
  compareIds: string[];
  setCompareIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function localSnapshot(profile: Profile, savedSpecialtyIds: string[], savedCountryIds: string[], compareIds: string[]) {
  return { profile, savedSpecialtyIds, savedCountryIds, compareIds };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>(() => ({ ...DEFAULT_PROFILE, ...loadJson<Partial<Profile>>("medweg-profile", {}) }));
  const [savedSpecialtyIds, setSavedSpecialtyIds] = useState<string[]>(() => loadJson("medweg-saved-specialties", []));
  const [savedCountryIds, setSavedCountryIds] = useState<string[]>(() => loadJson("medweg-saved-countries", []));
  const [compareIds, setCompareIds] = useState<string[]>(() => loadJson("medweg-compare", []));
  const [syncReady, setSyncReady] = useState(false);
  const activeUserId = useRef<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persistToCloud = async (snapshot: ReturnType<typeof localSnapshot>, userId: string) => {
    if (!supabase) return;
    await supabase.from("medweg_user_data").upsert({
      user_id: userId,
      profile: snapshot.profile,
      saved_specialty_ids: snapshot.savedSpecialtyIds,
      saved_country_ids: snapshot.savedCountryIds,
      compare_ids: snapshot.compareIds,
      updated_at: new Date().toISOString(),
    });
  };

  useEffect(() => {
    let cancelled = false;
    setSyncReady(false);

    if (!user || !supabase) {
      activeUserId.current = null;
      return;
    }

    activeUserId.current = user.id;
    (async () => {
      const { data, error } = await supabase.from("medweg_user_data").select("profile, saved_specialty_ids, saved_country_ids, compare_ids").eq("user_id", user.id).maybeSingle();
      if (cancelled) return;

      if (!error && data) {
        setProfile({ ...DEFAULT_PROFILE, ...(data.profile as Partial<Profile>), email: (data.profile as Partial<Profile>)?.email || user.email || "" });
        setSavedSpecialtyIds(Array.isArray(data.saved_specialty_ids) ? data.saved_specialty_ids : []);
        setSavedCountryIds(Array.isArray(data.saved_country_ids) ? data.saved_country_ids : []);
        setCompareIds(Array.isArray(data.compare_ids) ? data.compare_ids : []);
      } else {
        const nextProfile = { ...profile, email: profile.email || user.email || "" };
        setProfile(nextProfile);
        await persistToCloud(localSnapshot(nextProfile, savedSpecialtyIds, savedCountryIds, compareIds), user.id);
      }
      setSyncReady(true);
    })();

    return () => {
      cancelled = true;
    };
    // Load once per authenticated user. State values are intentionally captured as the anonymous local snapshot for first-time migration.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    localStorage.setItem("medweg-profile", JSON.stringify(profile));
  }, [profile]);
  useEffect(() => {
    localStorage.setItem("medweg-saved-specialties", JSON.stringify(savedSpecialtyIds));
  }, [savedSpecialtyIds]);
  useEffect(() => {
    localStorage.setItem("medweg-saved-countries", JSON.stringify(savedCountryIds));
  }, [savedCountryIds]);
  useEffect(() => {
    localStorage.setItem("medweg-compare", JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    if (!syncReady || !activeUserId.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const snapshot = localSnapshot(profile, savedSpecialtyIds, savedCountryIds, compareIds);
    saveTimer.current = setTimeout(() => {
      void persistToCloud(snapshot, activeUserId.current!);
    }, 450);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [profile, savedSpecialtyIds, savedCountryIds, compareIds, syncReady]);

  const toggleSpecialty = (id: string) => setSavedSpecialtyIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleCountry = (id: string) => setSavedCountryIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const saveProfile = () => {
    localStorage.setItem("medweg-profile", JSON.stringify(profile));
    if (activeUserId.current) void persistToCloud(localSnapshot(profile, savedSpecialtyIds, savedCountryIds, compareIds), activeUserId.current);
  };

  const value = useMemo(() => ({ profile, setProfile, saveProfile, savedSpecialtyIds, toggleSpecialty, savedCountryIds, toggleCountry, compareIds, setCompareIds }), [profile, savedSpecialtyIds, savedCountryIds, compareIds]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
