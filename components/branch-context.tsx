"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { branches, type Branch } from "@/lib/data";

type BranchContextValue = {
  branch: Branch;
  branchId: Branch["id"];
  setBranchId: (id: Branch["id"]) => void;
  is2S: boolean;
  isGroup: boolean;
};

const BranchContext = createContext<BranchContextValue | null>(null);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branchId, setBranchId] = useState<Branch["id"]>("all");

  const value = useMemo(() => {
    const branch = branches.find((item) => item.id === branchId) ?? branches[0];
    return {
      branch,
      branchId,
      setBranchId,
      is2S: branchId === "2s",
      isGroup: branchId === "all",
    };
  }, [branchId]);

  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>;
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) throw new Error("useBranch must be used inside BranchProvider");
  return context;
}
