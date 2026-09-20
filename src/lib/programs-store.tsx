import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { programs as seedPrograms, type Bilingual } from "@/data/site";

export type Plan = { label: Bilingual; price: number };
export type Program = {
  id: string;
  title: Bilingual;
  age: Bilingual;
  time: string;
  color: string;
  plans: Plan[];
};

const SEED = seedPrograms as Program[];
const STORAGE_KEY = "kk.programs.v1";

type Ctx = {
  programs: Program[];
  addProgram: (program: Program) => void;
  updateProgram: (id: string, program: Program) => void;
  deleteProgram: (id: string) => void;
  resetPrograms: () => void;
  isCustom: (id: string) => boolean;
};

const ProgramsContext = createContext<Ctx>({
  programs: SEED,
  addProgram: () => {},
  updateProgram: () => {},
  deleteProgram: () => {},
  resetPrograms: () => {},
  isCustom: () => false,
});

export const usePrograms = () => useContext(ProgramsContext);

export function slugify(value: string) {
  const base = value
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return base || `program-${Date.now().toString(36)}`;
}

export function ProgramsProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<Program[]>(SEED);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Program[];
        if (Array.isArray(parsed) && parsed.length) setList(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const persist = useCallback((next: Program[]) => {
    setList(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      programs: list,
      addProgram: (program) => persist([...list, program]),
      updateProgram: (id, program) => persist(list.map((p) => (p.id === id ? program : p))),
      deleteProgram: (id) => persist(list.filter((p) => p.id !== id)),
      resetPrograms: () => {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        setList(SEED);
      },
      isCustom: (id) => !SEED.some((p) => p.id === id),
    }),
    [list, persist],
  );

  return <ProgramsContext.Provider value={value}>{children}</ProgramsContext.Provider>;
}
