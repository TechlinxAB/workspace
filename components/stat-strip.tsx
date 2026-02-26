import { Card } from "@/components/Card";
import { MetricBlock } from "@/components/metric-block";
import type { StatShape } from "@/lib/mockData";

type StatStripProps = {
  stats: StatShape;
};

export function StatStrip({ stats }: StatStripProps) {
  return (
    <Card className="p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_14px_40px_rgba(18,18,18,0.08)]">
      <div className="grid min-h-[80px] grid-cols-1 divide-y divide-black/5 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
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
          delta={`${stats.websiteStatus.uptime}% uptime \u2022 ${stats.websiteStatus.lastSyncMins}m sync`}
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
