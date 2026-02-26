"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/Card";
import type { MonthlyOverviewPoint } from "@/lib/mockData";

type MonthlyBarChartProps = {
  data: MonthlyOverviewPoint[];
};

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  return (
    <Card className="h-full min-h-[320px]">
      <div className="mb-4">
        <p className="text-[15px] font-bold text-ink">Monthly overview</p>
        <p className="text-[12px] text-muted">Orders by month</p>
      </div>

      <div className="h-[235px] rounded-[14px] bg-[rgba(241,244,242,0.55)] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={24} barSize={12}>
            <CartesianGrid vertical={false} stroke="rgba(18,18,18,0.06)" strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#7A8880", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(138,196,139,0.10)" }}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.18)",
                backgroundColor: "rgba(18,18,18,0.9)",
                color: "#fff",
                fontSize: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.35)"
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "rgba(255,255,255,0.8)" }}
            />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} fill="#8AC48B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
