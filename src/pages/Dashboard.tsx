import MetricCard from "@/components/Dashboard/MetricCard";
import MRRChart from "@/components/Dashboard/MRRChart";
import RecentDeals from "@/components/Dashboard/RecentDeals";
import {
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Target,
} from "lucide-react";
import { calculateMetrics } from "@/utils/mockData";

const Dashboard = () => {
  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Acompanhe sua performance de vendas em tempo real
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
          <MetricCard
            title="MRR Total"
            value={`R$ ${metrics.currentMRR.toLocaleString("pt-BR")}`}
            change={metrics.mrrGrowth}
            changeType="increase"
            icon={DollarSign}
            gradient="primary"
          />
          <MetricCard
            title="Clientes Ativos"
            value={metrics.activeClients}
            icon={Users}
            gradient="success"
          />
          <MetricCard
            title="Ticket Médio"
            value={`R$ ${metrics.averageTicket.toLocaleString("pt-BR", {
              maximumFractionDigits: 0,
            })}`}
            icon={TrendingUp}
            gradient="info"
          />
          <MetricCard
            title="Potencial Upgrade"
            value={`R$ ${metrics.totalPotentialUpgrade.toLocaleString("pt-BR")}`}
            icon={Target}
            gradient="warning"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <MRRChart />
          <RecentDeals />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
