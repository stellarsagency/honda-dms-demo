"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DemoUser = {
  name: string;
  role: string;
  email: string;
  initials: string;
  home: string;
};

export const demoUsers: Record<string, DemoUser> = {
  "zeeshan@demohonda.pk": {
    name: "Zeeshan Awan",
    role: "Owner / Group Administrator",
    email: "zeeshan@demohonda.pk",
    initials: "ZA",
    home: "/dashboard",
  },
  "hr@demohonda.pk": {
    name: "HR Manager",
    role: "HR Department Account",
    email: "hr@demohonda.pk",
    initials: "HR",
    home: "/hr",
  },
  "service@demohonda.pk": {
    name: "Service Manager",
    role: "Service Department Account",
    email: "service@demohonda.pk",
    initials: "SM",
    home: "/service",
  },
  "accounts@demohonda.pk": {
    name: "Accounts Manager",
    role: "Accounts Department Account",
    email: "accounts@demohonda.pk",
    initials: "AM",
    home: "/accounts",
  },
  "usman@demohonda.pk": {
    name: "Usman Tariq",
    role: "Branch Manager · 3S",
    email: "usman@demohonda.pk",
    initials: "UT",
    home: "/dashboard",
  },
  "adeel@demohonda.pk": {
    name: "Adeel Raza",
    role: "Service Advisor · 2S",
    email: "adeel@demohonda.pk",
    initials: "AR",
    home: "/service",
  },
};

const defaultUser = demoUsers["zeeshan@demohonda.pk"];

type UserContextValue = {
  user: DemoUser;
  login: (email: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser>(defaultUser);

  useEffect(() => {
    const stored = window.localStorage.getItem("dms_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as DemoUser;
        if (parsed?.email && demoUsers[parsed.email]) setUser(parsed);
      } catch {
        // Ignore invalid stored user.
      }
    }
  }, []);

  function login(email: string) {
    const nextUser = demoUsers[email] ?? defaultUser;
    window.localStorage.setItem("dms_user", JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function logout() {
    window.localStorage.removeItem("dms_user");
    setUser(defaultUser);
  }

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
