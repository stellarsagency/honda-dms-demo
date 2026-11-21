import { AppShell } from "@/components/app-shell";
import DashboardPage from "./(app)/dashboard/page";

export default function HomePage() {
  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}
