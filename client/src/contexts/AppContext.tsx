import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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

export const GRADUATION_STATUSES = [
  "Medical student",
  "Intern / foundation year",
  "Final year",
  "Graduate, not yet licensed",
  "Licensed doctor",
];

export const INTERESTS = [
  "Acute care",
  "Longitudinal care",
  "Procedures",
  "Mental health",
  "Child health",
  "Diagnostics",
  "Research",
];

export const PRIORITIES = [
  "Training length",
  "Work-life balance",
  "Earning potential",
  "Visa clarity",
  "Breadth of practice",
  "Location flexibility",
];

export const WORK_STYLES = [
  "Analytical and reflective",
  "Hands-on and decisive",
  "People-centred and varied",
  "Fast-paced and collaborative",
  "Visual and technology-led",
];

export const DEFAULT_PROFILE: Profile = {
  name: "",
  email: "",
  medicalSchool: "",
  currentCountry: "",
  graduationYear: "",
  graduationStatus: "",
  targetCountries: [],
  interests: [],
  priorities: [],
  workStyle: "",
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

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(() => ({
    ...DEFAULT_PROFILE,
    ...loadJson<Partial<Profile>>("medweg-profile", {}),
  }));
  const [savedSpecialtyIds, setSavedSpecialtyIds] = useState<string[]>(() =>
    loadJson("medweg-saved-specialties", [])
  );
  const [savedCountryIds, setSavedCountryIds] = useState<string[]>(() =>
    loadJson("medweg-saved-countries", [])
  );
  const [compareIds, setCompareIds] = useState<string[]>(() =>
    loadJson("medweg-compare", [])
  );

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

  const toggleSpecialty = (id: string) => {
    setSavedSpecialtyIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev
    );
  };

  const toggleCountry = (id: string) => {
    setSavedCountryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev
    );
  };

  const saveProfile = () => {
    localStorage.setItem("medweg-profile", JSON.stringify(profile));
  };

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      saveProfile,
      savedSpecialtyIds,
      toggleSpecialty,
      savedCountryIds,
      toggleCountry,
      compareIds,
      setCompareIds,
    }),
    [profile, savedSpecialtyIds, savedCountryIds, compareIds]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
