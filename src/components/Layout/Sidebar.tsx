import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  TrendingUp,
  Settings,
  Target,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Briefcase, label: "Deals", path: "/deals" },
  { icon: Users, label: "Clientes", path: "/clients" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: Target, label: "Metas", path: "/targets" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-card/50 backdrop-blur border-r border-border/50 flex flex-col">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">Optidata</h1>
            <p className="text-xs text-muted-foreground">Vendedor Pro</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="h-10 w-10 rounded-full bg-gradient-success flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">
              João Silva
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Vendedor Senior
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
