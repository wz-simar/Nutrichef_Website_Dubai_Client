"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { DEFAULT_REGION, getRegion, type Region } from "@/lib/regions";

const STORAGE_KEY = "nutrichef_region";

interface RegionContextType {
  region: Region;
  setRegionCode: (code: string) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setRegion(getRegion(saved));
    } catch {
      /* private mode — keep default */
    }
  }, []);

  const setRegionCode = useCallback((code: string) => {
    const next = getRegion(code);
    setRegion(next);
    try {
      localStorage.setItem(STORAGE_KEY, next.code);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <RegionContext.Provider value={{ region, setRegionCode }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion(): RegionContextType {
  const ctx = useContext(RegionContext);
  if (ctx === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return ctx;
}
