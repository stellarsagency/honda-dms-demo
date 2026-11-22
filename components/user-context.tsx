"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  allFeatureKeys,
  allFeaturesForModules,
  allModuleKeys,
  type AccountStatus,
  type ModuleKey,
} from "@/lib/access";

export type DemoUser = {
  name: string;
  role: string;
  email: string;
  initials: string;
  home: string;
  password: string;
  status: AccountStatus;
  modules: ModuleKey[];
  features: string[];
  branchScope: string;
  isOwner?: boolean;
  createdAt?: string;
  approvedBy?: string;
  approvedAt?: string;
};

const ACCOUNTS_KEY = "dms_accounts_v3";
const SESSION_KEY = "dms_session_v3";
const DEMO_PASSWORD = "demo1234";

function initialsFor(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function homeFor(modules: ModuleKey[]) {
  const main = modules.find((module) => module !== "dashboard" && module !== "profile");
  return `/${main ?? "dashboard"}`;
}

const ownerModules = allModuleKeys;

export const defaultAccounts: DemoUser[] = [
  {
    name: "Zeeshan Awan",
    role: "Owner / Group Administrator",
    email: "zeeshan@demohonda.pk",
    initials: "ZA",
    home: "/dashboard",
    password: DEMO_PASSWORD,
    status: "Active",
    modules: ownerModules,
    features: allFeatureKeys,
    branchScope: "All branches",
    isOwner: true,
    approvedBy: "System",
    createdAt: "01 Jan 2026",
  },
  {
    name: "HR Manager",
    role: "HR Department Account",
    email: "hr@demohonda.pk",
    initials: "HR",
    home: "/hr",
    password: DEMO_PASSWORD,
    status: "Active",
    modules: ["dashboard", "hr", "reports"],
    features: allFeaturesForModules(["dashboard", "hr", "reports"]),
    branchScope: "All branches",
    approvedBy: "Zeeshan Awan",
    createdAt: "21 Nov 2026",
  },
  {
    name: "Service Manager",
    role: "Service Department Account",
    email: "service@demohonda.pk",
    initials: "SM",
    home: "/service",
    password: DEMO_PASSWORD,
    status: "Active",
    modules: ["dashboard", "customers", "service", "parts", "reports"],
    features: allFeaturesForModules(["dashboard", "customers", "service", "parts", "reports"]),
    branchScope: "3S Main + 2S City",
    approvedBy: "Zeeshan Awan",
    createdAt: "20 Nov 2026",
  },
  {
    name: "Accounts Manager",
    role: "Accounts Department Account",
    email: "accounts@demohonda.pk",
    initials: "AM",
    home: "/accounts",
    password: DEMO_PASSWORD,
    status: "Active",
    modules: ["dashboard", "corporate", "accounts", "reports"],
    features: allFeaturesForModules(["dashboard", "corporate", "accounts", "reports"]),
    branchScope: "All branches",
    approvedBy: "Zeeshan Awan",
    createdAt: "19 Nov 2026",
  },
  {
    name: "Sales Manager",
    role: "Sales Department Account",
    email: "sales@demohonda.pk",
    initials: "SL",
    home: "/sales",
    password: DEMO_PASSWORD,
    status: "Pending",
    modules: ["dashboard", "customers", "sales", "reports"],
    features: allFeaturesForModules(["dashboard", "customers", "sales", "reports"]),
    branchScope: "3S Main",
    createdAt: "22 Nov 2026",
  },
  {
    name: "Usman Tariq",
    role: "Branch Manager · 3S",
    email: "usman@demohonda.pk",
    initials: "UT",
    home: "/dashboard",
    password: DEMO_PASSWORD,
    status: "Active",
    modules: ["dashboard", "customers", "service", "sales", "parts", "corporate", "reports"],
    features: allFeaturesForModules(["dashboard", "customers", "service", "sales", "parts", "corporate", "reports"]),
    branchScope: "3S Main",
    approvedBy: "Zeeshan Awan",
    createdAt: "12 Jan 2026",
  },
  {
    name: "Honda Authorised Viewer",
    role: "Honda Authorised Parts Viewer",
    email: "honda.parts@demohonda.pk",
    initials: "HP",
    home: "/parts",
    password: DEMO_PASSWORD,
    status: "Active",
    modules: ["dashboard", "parts"],
    features: [...allFeaturesForModules(["dashboard", "parts"]), "parts.hondaAuthorised"],
    branchScope: "Honda Atlas authorised view",
    approvedBy: "Zeeshan Awan",
    createdAt: "23 Nov 2026",
  },
];

type LoginResult = { ok: true; user: DemoUser } | { ok: false; error: string };

type NewAccountInput = {
  name: string;
  email: string;
  role: string;
  password?: string;
  branchScope?: string;
  modules: ModuleKey[];
  features: string[];
};

type UserContextValue = {
  user: DemoUser;
  accounts: DemoUser[];
  hydrated: boolean;
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
  canAccessModule: (module: ModuleKey) => boolean;
  canAccessFeature: (feature: string) => boolean;
  createAccount: (input: NewAccountInput) => { ok: boolean; error?: string };
  updateAccount: (email: string, patch: Partial<DemoUser>) => void;
  approveAccount: (email: string) => void;
  rejectAccount: (email: string) => void;
  suspendAccount: (email: string) => void;
  reactivateAccount: (email: string) => void;
  deleteAccount: (email: string) => void;
  resetDemo: () => void;
  switchAccount: (email: string) => LoginResult;
};

const UserContext = createContext<UserContextValue | null>(null);

const ownerAccount = defaultAccounts[0];

function todayLabel() {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function normalizeAccounts(stored: DemoUser[]): DemoUser[] {
  return stored.map((account) => {
    if (account.isOwner) {
      return {
        ...account,
        status: "Active" as const,
        modules: ownerModules,
        features: allFeatureKeys,
        password: account.password || DEMO_PASSWORD,
      };
    }
    return {
      ...account,
      password: account.password || DEMO_PASSWORD,
      modules: Array.isArray(account.modules) ? account.modules : [],
      features: Array.isArray(account.features) ? account.features : [],
    };
  });
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<DemoUser[]>(defaultAccounts);
  const [sessionEmail, setSessionEmail] = useState(ownerAccount.email);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawAccounts = window.localStorage.getItem(ACCOUNTS_KEY);
      if (rawAccounts) {
        const parsed = JSON.parse(rawAccounts) as DemoUser[];
        if (Array.isArray(parsed) && parsed.length) setAccounts(normalizeAccounts(parsed));
      }
      const storedSession = window.localStorage.getItem(SESSION_KEY);
      if (storedSession) setSessionEmail(storedSession);
    } catch {
      // Corrupt demo storage falls back to the seeded accounts.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {
      // Storage can be unavailable in private browsing; the demo still works.
    }
  }, [accounts, hydrated]);

  const user = useMemo(() => {
    return accounts.find((account) => account.email === sessionEmail) ?? ownerAccount;
  }, [accounts, sessionEmail]);

  const canAccessModule = useCallback(
    (module: ModuleKey) => {
      if (module === "profile") return true;
      if (user.isOwner) return true;
      return user.modules.includes(module);
    },
    [user],
  );

  const canAccessFeature = useCallback(
    (feature: string) => {
      if (user.isOwner) return true;
      return user.features.includes(feature);
    },
    [user],
  );

  const login = useCallback(
    (email: string, password: string): LoginResult => {
      const normalizedEmail = email.trim().toLowerCase();
      const account = accounts.find((item) => item.email.toLowerCase() === normalizedEmail);
      if (!account) {
        return { ok: false, error: "No demo account found for this email address." };
      }
      if (account.password !== password) {
        return { ok: false, error: "Incorrect password. The demo password is demo1234." };
      }
      if (account.status === "Pending") {
        return {
          ok: false,
          error: "This account is pending owner approval. Sign in as Zeeshan Awan to approve it in Admin → Department accounts.",
        };
      }
      if (account.status === "Suspended") {
        return { ok: false, error: "This account is suspended. Ask the owner to reactivate it." };
      }
      if (account.status === "Rejected") {
        return { ok: false, error: "This account request was rejected by the owner." };
      }
      setSessionEmail(account.email);
      try {
        window.localStorage.setItem(SESSION_KEY, account.email);
      } catch {
        // Ignore storage failures.
      }
      return { ok: true, user: account };
    },
    [accounts],
  );

  const logout = useCallback(() => {
    setSessionEmail(ownerAccount.email);
    try {
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  const createAccount = useCallback(
    (input: NewAccountInput) => {
      const email = input.email.trim().toLowerCase();
      if (!input.name.trim() || !email || !input.role.trim()) {
        return { ok: false, error: "Name, email and role are required." };
      }
      if (!email.includes("@")) {
        return { ok: false, error: "Enter a valid email address." };
      }
      if (accounts.some((account) => account.email.toLowerCase() === email)) {
        return { ok: false, error: "An account with this email already exists." };
      }
      if (!input.modules.length) {
        return { ok: false, error: "Select at least one module for the account." };
      }
      const modules = Array.from(new Set(input.modules));
      const newAccount: DemoUser = {
        name: input.name.trim(),
        role: input.role.trim(),
        email,
        initials: initialsFor(input.name.trim()),
        home: homeFor(modules),
        password: input.password?.trim() || DEMO_PASSWORD,
        status: "Pending",
        modules,
        features: Array.from(new Set(input.features)),
        branchScope: input.branchScope?.trim() || "All branches",
        createdAt: todayLabel(),
      };
      setAccounts((current) => [...current, newAccount]);
      return { ok: true };
    },
    [accounts],
  );

  const updateAccount = useCallback((email: string, patch: Partial<DemoUser>) => {
    setAccounts((current) =>
      current.map((account) => {
        if (account.email !== email) return account;
        if (account.isOwner) return account;
        const modules = patch.modules ?? account.modules;
        const next = { ...account, ...patch, modules };
        if (!modules.includes(moduleForHome(account.home))) next.home = homeFor(modules);
        return next;
      }),
    );
  }, []);

  const approveAccount = useCallback((email: string) => {
    setAccounts((current) =>
      current.map((account) =>
        account.email === email
          ? { ...account, status: "Active" as const, approvedBy: "Zeeshan Awan", approvedAt: todayLabel() }
          : account,
      ),
    );
  }, []);

  const rejectAccount = useCallback((email: string) => {
    setAccounts((current) =>
      current.map((account) =>
        account.email === email
          ? { ...account, status: "Rejected" as const, approvedBy: "Zeeshan Awan", approvedAt: todayLabel() }
          : account,
      ),
    );
  }, []);

  const suspendAccount = useCallback((email: string) => {
    setAccounts((current) =>
      current.map((account) =>
        account.email === email && !account.isOwner ? { ...account, status: "Suspended" as const } : account,
      ),
    );
  }, []);

  const reactivateAccount = useCallback((email: string) => {
    setAccounts((current) =>
      current.map((account) =>
        account.email === email ? { ...account, status: "Active" as const } : account,
      ),
    );
  }, []);

  const deleteAccount = useCallback((email: string) => {
    setAccounts((current) => current.filter((account) => account.email !== email || account.isOwner));
  }, []);

  const resetDemo = useCallback(() => {
    setAccounts(defaultAccounts);
    setSessionEmail(ownerAccount.email);
    try {
      window.localStorage.removeItem(ACCOUNTS_KEY);
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  const switchAccount = useCallback(
    (email: string) => {
      return login(email, DEMO_PASSWORD);
    },
    [login],
  );

  const value: UserContextValue = {
    user,
    accounts,
    hydrated,
    login,
    logout,
    canAccessModule,
    canAccessFeature,
    createAccount,
    updateAccount,
    approveAccount,
    rejectAccount,
    suspendAccount,
    reactivateAccount,
    deleteAccount,
    resetDemo,
    switchAccount,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function moduleForHome(home: string): ModuleKey {
  return (home.replace("/", "") || "dashboard") as ModuleKey;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
