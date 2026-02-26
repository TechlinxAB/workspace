import { Card } from "@/components/Card";
import type { StatShape } from "@/lib/mockData";

type StatStripProps = {
  stats: StatShape;
};

function MetricBlock({
  label,
  value,
  delta,
  deltaTone,
  dotClassName
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone: "positive" | "negative" | "neutral";
  dotClassName: string;
}) {
  const deltaClass =
    deltaTone === "positive"
      ? "bg-[#E7F5EA] text-[#2E7D32]"
      : deltaTone === "negative"
        ? "bg-[#FEECEC] text-[#DC2626]"
        : "bg-[#EEF2EF] text-[#5E6B63]";

  return (
    <div className="flex min-w-0 items-start gap-3 px-6 py-4">
      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotClassName}`} />
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-muted">{label}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <p className="truncate text-[30px] font-semibold leading-none text-ink">{value}</p>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${deltaClass}`}>{delta}</span>
        </div>
      </div>
    </div>
  );
}

export function StatStrip({ stats }: StatStripProps) {
  return (
    <Card className="p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_40px_rgba(18,18,18,0.08)]">
      <div className="grid min-h-[86px] grid-cols-1 divide-y divide-black/5 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
        <MetricBlock
          label="Open Requests"
          value={String(stats.openRequests)}
          delta="+8%"
          deltaTone="positive"
          dotClassName="bg-[#E59A75]"
        />
        <MetricBlock
          label="Require Reply"
          value={String(stats.requireReply)}
          delta="-3%"
          deltaTone="negative"
          dotClassName="bg-primary"
        />
        <MetricBlock
          label="Website Status"
          value={stats.websiteStatus.state}
          delta={`${stats.websiteStatus.uptime}% uptime • ${stats.websiteStatus.lastSyncMins}m sync`}
          deltaTone="neutral"
          dotClassName="bg-[#5BAF65]"
        />
        <MetricBlock
          label="Monthly Orders"
          value={String(stats.monthlyOrders.count)}
          delta={`+${stats.monthlyOrders.deltaPct}%`}
          deltaTone="positive"
          dotClassName="bg-[#6EACEA]"
        />
      </div>
    </Card>
  );
}
