import { ActivitiesCard } from "@/components/ActivitiesCard";
import { MonthlyBarChart } from "@/components/monthly-bar-chart";
import { PromoCard } from "@/components/PromoCard";
import { RecentItemsTable } from "@/components/RecentItemsTable";
import { StatStrip } from "@/components/StatStrip";
import { mockData } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <main className="space-y-4 pb-4">
      <section>
        <h1 className="text-[22px] font-bold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Workspace snapshot for requests, website, and billing.</p>
      </section>

      <StatStrip stats={mockData.stats} />

      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <MonthlyBarChart data={mockData.monthlyOverview} />
        <PromoCard />
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-[1fr_1.8fr]">
        <ActivitiesCard items={mockData.activities} />
        <RecentItemsTable items={mockData.recentItems} />
      </section>
    </main>
  );
}
