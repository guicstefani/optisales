import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDeals } from "@/utils/mockData";
import { TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const statusConfig = {
  active: {
    label: "Ativo",
    variant: "default" as const,
    icon: CheckCircle2,
  },
  pending: {
    label: "Pendente",
    variant: "secondary" as const,
    icon: Clock,
  },
  churned: {
    label: "Churn",
    variant: "destructive" as const,
    icon: TrendingUp,
  },
  upgraded: {
    label: "Upgrade",
    variant: "default" as const,
    icon: TrendingUp,
  },
};

const RecentDeals = () => {
  const recentDeals = mockDeals.slice(0, 5);

  return (
    <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Deals Recentes</h3>
        <p className="text-sm text-muted-foreground">
          Últimos contratos cadastrados
        </p>
      </div>
      <div className="space-y-4">
        {recentDeals.map((deal) => {
          const StatusIcon = statusConfig[deal.status].icon;
          return (
            <div
              key={deal.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/10 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <StatusIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {deal.deal_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(deal.contract_start_date).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    R$ {deal.mrr_value.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-muted-foreground">/mês</p>
                </div>
                <Badge variant={statusConfig[deal.status].variant}>
                  {statusConfig[deal.status].label}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentDeals;
