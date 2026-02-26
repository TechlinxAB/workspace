import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  frosted?: boolean;
};

export function Card({ children, className = "", frosted = true }: CardProps) {
  return (
    <section
      className={[
        "rounded-[24px] p-5 shadow-[0_14px_40px_rgba(18,18,18,0.08)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_18px_55px_rgba(18,18,18,0.12)]",
        frosted
          ? "border border-[rgba(255,255,255,0.95)] bg-[linear-gradient(180deg,rgba(255,255,255,0.66)_0%,rgba(255,255,255,0.52)_100%)] backdrop-blur-2xl ring-1 ring-[rgba(18,18,18,0.03)] shadow-[0_14px_40px_rgba(18,18,18,0.08),inset_0_1px_0_rgba(255,255,255,0.98)]"
          : "border border-[rgba(18,18,18,0.04)]",
        className
      ].join(" ")}
    >
      {children}
    </section>
  );
}
