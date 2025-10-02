import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease";
  icon: LucideIcon;
  gradient: "primary" | "success" | "warning" | "danger" | "info";
}

const gradientClasses = {
  primary: "bg-gradient-primary",
  success: "bg-gradient-success",
  warning: "bg-gradient-warning",
  danger: "bg-gradient-danger",
  info: "bg-gradient-info",
};

const MetricCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  gradient,
}: MetricCardProps) => {
  return (
    <Card className="relative overflow-hidden hover-lift border-border/50 bg-card/50 backdrop-blur">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`${gradientClasses[gradient]} rounded-xl p-3 shadow-lg`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                changeType === "increase"
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              <span>{changeType === "increase" ? "↑" : "↓"}</span>
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 ${gradientClasses[gradient]}`}
      />
    </Card>
  );
};

export default MetricCard;
