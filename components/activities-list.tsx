import { Bell, FileText, HardDrive, Megaphone } from "lucide-react";
import { Card } from "@/components/Card";
import type { ActivityItem } from "@/lib/mockData";

const iconMap = [HardDrive, FileText, Megaphone, Bell];

type ActivitiesListProps = {
  items: ActivityItem[];
};

export function ActivitiesList({ items }: ActivitiesListProps) {
  return (
    <Card className="h-full">
      <div className="mb-3">
        <p className="text-[15px] font-bold text-ink">Activities</p>
        <p className="text-[12px] text-muted">Latest actions in your workspace</p>
      </div>

      <ul className="space-y-3">
        {items.slice(0, 4).map((item, idx) => {
          const Icon = iconMap[idx % iconMap.length];
          return (
            <li key={item.id} className="flex items-start gap-3 rounded-[14px] p-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#EFF2F0] text-subtle">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-muted">{item.description}</p>
                <p className="mt-1 text-xs text-subtle">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
