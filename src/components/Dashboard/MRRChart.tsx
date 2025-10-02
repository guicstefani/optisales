import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { mockMRRHistory } from "@/utils/mockData";

const MRRChart = () => {
  const data = mockMRRHistory.map((item) => ({
    month: new Date(item.month).toLocaleDateString("pt-BR", {
      month: "short",
    }),
    mrr: item.total_mrr,
    newMRR: item.new_mrr,
  }));

  return (
    <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Evolução do MRR
        </h3>
        <p className="text-sm text-muted-foreground">
          Receita recorrente mensal nos últimos 6 meses
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(239 84% 67%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) =>
              `R$ ${(value / 1000).toFixed(0)}k`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) =>
              `R$ ${value.toLocaleString("pt-BR")}`
            }
          />
          <Area
            type="monotone"
            dataKey="mrr"
            stroke="hsl(239 84% 67%)"
            strokeWidth={3}
            fill="url(#colorMRR)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MRRChart;
