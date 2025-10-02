import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { mockDeals } from "@/utils/mockData";
import { Input } from "@/components/ui/input";

const statusConfig = {
  active: { label: "Ativo", variant: "default" as const },
  pending: { label: "Pendente", variant: "secondary" as const },
  churned: { label: "Churn", variant: "destructive" as const },
  upgraded: { label: "Upgrade", variant: "default" as const },
};

const Deals = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Deals</h1>
            <p className="text-muted-foreground">
              Gerencie todos os seus contratos
            </p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Novo Deal
          </Button>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar deals..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {mockDeals.map((deal) => (
              <div
                key={deal.id}
                className="p-6 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/10 transition-all hover-lift"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {deal.deal_name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        Início: {new Date(deal.contract_start_date).toLocaleDateString("pt-BR")}
                      </span>
                      <span>•</span>
                      <span>
                        Término: {new Date(deal.contract_end_date).toLocaleDateString("pt-BR")}
                      </span>
                      <span>•</span>
                      <span>{deal.contract_duration_months} meses</span>
                    </div>
                  </div>
                  <Badge variant={statusConfig[deal.status].variant}>
                    {statusConfig[deal.status].label}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">MRR</p>
                    <p className="text-xl font-bold text-foreground">
                      R$ {deal.mrr_value.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Valor Original</p>
                    <p className="text-lg font-semibold text-foreground">
                      R$ {deal.original_value.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Desconto</p>
                    <p className="text-lg font-semibold text-warning">
                      {deal.discount_percentage}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Potencial Upgrade</p>
                    <p className="text-lg font-semibold text-success">
                      R$ {(deal.potential_upgrade_value || 0).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>

                {deal.notes && (
                  <p className="mt-4 text-sm text-muted-foreground border-t border-border/50 pt-4">
                    {deal.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Deals;
