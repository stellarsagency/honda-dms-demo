"use client";

import type { ReactNode } from "react";
import { useUser } from "@/components/user-context";

export function FeatureGate({
  feature,
  children,
  fallback = null,
}: {
  feature: string;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { canAccessFeature } = useUser();
  return <>{canAccessFeature(feature) ? children : fallback}</>;
}
