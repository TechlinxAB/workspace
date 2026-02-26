import { Card } from "@/components/Card";
import { StatusPill } from "@/components/status-pill";
import type { RecentItem } from "@/lib/mockData";

type RecentItemsTableProps = {
  items: RecentItem[];
};

export function RecentItemsTable({ items }: RecentItemsTableProps) {
  return (
    <Card className="h-full overflow-hidden">
      <div className="mb-3">
        <p className="text-[15px] font-bold text-ink">Recent Items</p>
        <p className="text-[12px] text-muted">Invoices and requests across Techlinx Workspace</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-[rgba(18,18,18,0.08)]">
              {["Ref", "Date", "Type", "Amount/Impact", "Status"].map((heading) => (
                <th key={heading} className="px-2 py-2 text-[12px] font-semibold text-muted">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.ref} className="border-b border-[rgba(18,18,18,0.06)]">
                <td className="px-2 py-3 text-sm font-semibold text-ink">{item.ref}</td>
                <td className="px-2 py-3 text-sm text-muted">{item.date}</td>
                <td className="px-2 py-3 text-sm text-ink">{item.type}</td>
                <td className="px-2 py-3 text-sm text-ink">{item.amountOrImpact}</td>
                <td className="px-2 py-3 text-sm">
                  <StatusPill status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
