import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize sua experiência
          </p>
        </div>

        <Card className="p-12 text-center border-border/50 bg-card/50 backdrop-blur">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-4xl">⚙️</span>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Em desenvolvimento
            </h2>
            <p className="text-muted-foreground">
              Configurações avançadas e personalização estarão disponíveis em breve
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
