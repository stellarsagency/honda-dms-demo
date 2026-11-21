import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPKR(value: number, compact = false) {
  if (compact) {
    if (Math.abs(value) >= 10_000_000) return `PKR ${(value / 10_000_000).toFixed(1)} Cr`;
    if (Math.abs(value) >= 100_000) return `PKR ${(value / 100_000).toFixed(1)} Lac`;
    if (Math.abs(value) >= 1_000) return `PKR ${(value / 1_000).toFixed(0)}k`;
  }
  return `PKR ${value.toLocaleString("en-PK")}`;
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-PK");
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
