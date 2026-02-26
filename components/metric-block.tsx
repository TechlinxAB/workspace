type MetricBlockProps = {
  label: string;
  value: string;
  delta: string;
  deltaTone: "positive" | "negative" | "neutral";
  dotClassName: string;
};

export function MetricBlock({ label, value, delta, deltaTone, dotClassName }: MetricBlockProps) {
  const deltaClass =
    deltaTone === "positive"
      ? "bg-successBg text-success"
      : deltaTone === "negative"
        ? "bg-dangerBg text-danger"
        : "bg-[#F1F4F2] text-subtle";

  return (
    <div className="flex min-w-0 items-start gap-3 px-4 py-2.5">
      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotClassName}`} />
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-muted">{label}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <p className="truncate text-[28px] font-semibold leading-none text-ink">{value}</p>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${deltaClass}`}>{delta}</span>
        </div>
      </div>
    </div>
  );
}
