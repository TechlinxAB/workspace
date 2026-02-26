import type { ItemStatus } from "@/lib/mockData";

type StatusPillProps = {
  status: ItemStatus;
};

const statusStyles: Record<ItemStatus, string> = {
  "In Review": "bg-[#E8F0FE] text-info",
  Pending: "bg-warningBg text-warning",
  Completed: "bg-successBg text-success",
  Paid: "bg-successBg text-success",
  Overdue: "bg-dangerBg text-danger"
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={`rounded-full border border-[rgba(18,18,18,0.06)] px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
