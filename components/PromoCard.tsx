import { ArrowRight } from "lucide-react";
import { Card } from "@/components/Card";

export function PromoCard() {
  return (
    <Card
      frosted={false}
      className="relative h-full min-h-[320px] overflow-hidden bg-[linear-gradient(135deg,#8AC48B_0%,#6FAE74_60%,#5FA567_100%)] text-white"
    >
      <div className="absolute bottom-[-100px] right-[-80px] h-[260px] w-[260px] rounded-full bg-[rgba(255,255,255,0.18)]" />
      <div className="absolute right-[12%] top-[44%] h-[140px] w-[140px] rounded-full bg-[rgba(255,255,255,0.12)]" />
      <div className="relative z-10 flex h-full flex-col">
        <span className="w-fit rounded-full bg-white/22 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
          New
        </span>
        <h3 className="mt-4 text-[36px] font-bold leading-[1.04] tracking-[-0.02em] text-white">
          We&apos;ve added new website templates!
        </h3>
        <p className="mt-3 text-sm text-white/92">New improvements to your Workspace are available now.</p>
        <button
          type="button"
          className="focus-ring mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2F5B3A] shadow-[0_10px_25px_rgba(18,18,18,0.12)] transition-all duration-200 hover:bg-[#F5FAF6]"
        >
          Open updates
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}
