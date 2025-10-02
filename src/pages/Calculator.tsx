import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { 
  Calculator as CalculatorIcon, 
  TrendingUp, 
  DollarSign,
  Save,
  Download,
  Share2,
  Clock
} from 'lucide-react'
import { calculateInfrastructure, VMConfig } from '@/utils/calculator/formulas'
import { calculateLicenses } from '@/utils/calculator/licenses'
import { ERP_TEMPLATES } from '@/utils/calculator/templates'
import { useCalculatorStore } from '@/stores/calculatorStore'
import { useToast } from '@/hooks/use-toast'

const Calculator = () => {
  const { toast } = useToast()
  const { addToHistory, history } = useCalculatorStore()
  const [clientName, setClientName] = useState('')
  const [config, setConfig] = useState<VMConfig>({
    vcpu: 4,
    ramGB: 16,
    storageSSD: 200,
    storageFCM: 0,
    monitoring: true,
    backupType: 'standard',
    additionalIPs: 0,
    os: 'ubuntu',
    database: 'postgresql',
    additionalSoftware: []
  })

  const licenseCost = calculateLicenses(
    config.vcpu,
    config.os,
    config.database,
    config.additionalSoftware
  )
  const calculation = calculateInfrastructure(config, licenseCost)

  const saveCalculation = () => {
    addToHistory({
      clientName: clientName || 'Sem nome',
      config,
      result: calculation
    })
    toast({
      title: "Cálculo salvo!",
      description: `Total mensal: R$ ${calculation.monthly}`
    })
  }

  const loadTemplate = (templateId: string) => {
    const template = ERP_TEMPLATES.find(t => t.id === templateId)
    if (template && template.servers[0]) {
      setConfig(template.servers[0])
      toast({
        title: "Template carregado!",
        description: template.name
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="bg-gradient-primary text-white p-8 rounded-xl shadow-glow">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">OptiCalculator Cloud</h1>
              <p className="text-white/80">
                Calcule o custo exato da sua infraestrutura em segundos
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/60">Total Mensal</p>
              <p className="text-4xl font-bold">R$ {calculation.monthly.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
          <Card className="p-6 hover-lift border-border/50 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cálculos Salvos</p>
                <p className="text-3xl font-bold text-primary">{history.length}</p>
                <p className="text-xs text-success mt-1">Este mês</p>
              </div>
              <CalculatorIcon className="h-10 w-10 text-primary" />
            </div>
          </Card>

          <Card className="p-6 hover-lift border-border/50 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <p className="text-3xl font-bold text-success">R$ 8.5k</p>
                <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
              </div>
              <DollarSign className="h-10 w-10 text-success" />
            </div>
          </Card>

          <Card className="p-6 hover-lift border-border/50 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Conversão</p>
                <p className="text-3xl font-bold text-warning">68%</p>
                <p className="text-xs text-muted-foreground mt-1">Propostas fechadas</p>
              </div>
              <TrendingUp className="h-10 w-10 text-warning" />
            </div>
          </Card>

          <Card className="p-6 hover-lift border-border/50 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
                <p className="text-3xl font-bold text-info">3.5 min</p>
                <p className="text-xs text-muted-foreground mt-1">Por cálculo</p>
              </div>
              <Clock className="h-10 w-10 text-info" />
            </div>
          </Card>
        </div>

        {/* Templates */}
        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Templates de ERP</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ERP_TEMPLATES.map(template => (
              <div
                key={template.id}
                className="border border-border/50 rounded-lg p-6 hover:border-primary hover:shadow-glow transition-all cursor-pointer hover-lift bg-background/50"
                onClick={() => loadTemplate(template.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{template.icon}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground text-lg">{template.name}</h4>
                <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">A partir de</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    R$ 5.2k<span className="text-sm font-normal text-muted-foreground">/mês</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Name */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Informações do Cliente</h3>
              <Input
                placeholder="Nome do cliente ou empresa"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-background"
              />
            </Card>

            {/* Compute Resources */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
              <h3 className="text-lg font-semibold mb-6 text-foreground">Recursos Computacionais</h3>
              
              <div className="space-y-8">
                {/* vCPU */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">vCPUs</label>
                    <span className="text-sm text-muted-foreground">
                      {config.vcpu} vCPUs × R$ 24,98 = R$ {(config.vcpu * 24.98).toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={[config.vcpu]}
                    onValueChange={([value]) => setConfig({...config, vcpu: value})}
                    min={1}
                    max={128}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1 vCPU</span>
                    <span>128 vCPUs</span>
                  </div>
                </div>

                {/* RAM */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Memória RAM</label>
                    <span className="text-sm text-muted-foreground">
                      {config.ramGB} GB × R$ 20,02 = R$ {(config.ramGB * 20.02).toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={[config.ramGB]}
                    onValueChange={([value]) => setConfig({...config, ramGB: value})}
                    min={1}
                    max={1024}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1 GB</span>
                    <span>1024 GB</span>
                  </div>
                </div>

                {/* Storage SSD */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Storage SSD</label>
                    <span className="text-sm text-muted-foreground">
                      {config.storageSSD} GB × R$ 0,55 = R$ {(config.storageSSD * 0.55).toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={[config.storageSSD]}
                    onValueChange={([value]) => setConfig({...config, storageSSD: value})}
                    min={10}
                    max={10000}
                    step={10}
                  />
                </div>

                {/* Storage FCM */}
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Storage Econômico (FCM)</label>
                    <span className="text-sm text-muted-foreground">
                      {config.storageFCM} GB × R$ 0,75 = R$ {(config.storageFCM * 0.75).toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    value={[config.storageFCM]}
                    onValueChange={([value]) => setConfig({...config, storageFCM: value})}
                    min={0}
                    max={50000}
                    step={100}
                  />
                </div>
              </div>
            </Card>

            {/* Software & Licenses */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
              <h3 className="text-lg font-semibold mb-6 text-foreground">Software & Licenças</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Sistema Operacional</label>
                  <Select value={config.os} onValueChange={(value) => setConfig({...config, os: value})}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ubuntu">Ubuntu Server (Grátis)</SelectItem>
                      <SelectItem value="windows-standard">Windows Server Standard (+R$ 220)</SelectItem>
                      <SelectItem value="windows-datacenter">Windows Server Datacenter (+R$ 850)</SelectItem>
                      <SelectItem value="rhel">Red Hat Enterprise (+R$ 100)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Banco de Dados</label>
                  <Select value={config.database} onValueChange={(value) => setConfig({...config, database: value})}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgresql">PostgreSQL (Grátis)</SelectItem>
                      <SelectItem value="mysql">MySQL (Grátis)</SelectItem>
                      <SelectItem value="sql-standard">SQL Server Standard (+R$ {config.vcpu * 180})</SelectItem>
                      <SelectItem value="sql-enterprise">SQL Server Enterprise (+R$ {config.vcpu * 550})</SelectItem>
                      <SelectItem value="oracle-se">Oracle SE (+R$ 1.200)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
                  <label className="text-sm font-medium text-foreground">Monitoramento 24x7</label>
                  <Switch
                    checked={config.monitoring}
                    onCheckedChange={(checked) => setConfig({...config, monitoring: checked})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Tipo de Backup</label>
                  <Select value={config.backupType} onValueChange={(value: any) => setConfig({...config, backupType: value})}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem backup</SelectItem>
                      <SelectItem value="standard">Padrão (30% storage)</SelectItem>
                      <SelectItem value="double">Duplo (60% storage)</SelectItem>
                      <SelectItem value="triple">Triplo (90% storage)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Breakdown */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Detalhamento de Custos</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Computação (vCPU)</span>
                  <span className="font-medium text-foreground">R$ {calculation.breakdown.compute.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Memória (RAM)</span>
                  <span className="font-medium text-foreground">R$ {calculation.breakdown.memory.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Armazenamento</span>
                  <span className="font-medium text-foreground">R$ {calculation.breakdown.storage.toLocaleString('pt-BR')}</span>
                </div>
                {calculation.breakdown.backup > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Backup</span>
                    <span className="font-medium text-foreground">R$ {calculation.breakdown.backup.toLocaleString('pt-BR')}</span>
                  </div>
                )}
                {calculation.breakdown.monitoring > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monitoramento</span>
                    <span className="font-medium text-foreground">R$ {calculation.breakdown.monitoring.toLocaleString('pt-BR')}</span>
                  </div>
                )}
                {calculation.breakdown.licenses > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Licenças</span>
                    <span className="font-medium text-foreground">R$ {calculation.breakdown.licenses.toLocaleString('pt-BR')}</span>
                  </div>
                )}
                
                <div className="pt-4 mt-4 border-t border-primary/30">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total Mensal</span>
                    <span className="text-3xl font-bold text-primary">
                      R$ {calculation.monthly.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-sm text-muted-foreground">Total Anual</span>
                    <span className="text-xl font-semibold text-primary">
                      R$ {calculation.annual.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <Button 
                  className="flex-1 bg-gradient-primary hover:shadow-glow"
                  onClick={saveCalculation}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Cálculo
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Discount Suggestions */}
            {calculation.monthly > 5000 && (
              <Card className="p-4 border-border/50 bg-card/50 backdrop-blur">
                <h4 className="font-semibold mb-3 text-foreground">Descontos Disponíveis</h4>
                <div className="space-y-2">
                  {calculation.monthly > 100000 && (
                    <div className="p-3 bg-success/10 border border-success/20 text-success rounded-lg">
                      <p className="text-sm font-semibold">25% de desconto</p>
                      <p className="text-xs">Volume acima de R$ 100k</p>
                    </div>
                  )}
                  {calculation.monthly > 50000 && calculation.monthly <= 100000 && (
                    <div className="p-3 bg-warning/10 border border-warning/20 text-warning rounded-lg">
                      <p className="text-sm font-semibold">20% de desconto</p>
                      <p className="text-xs">Volume R$ 50k-100k</p>
                    </div>
                  )}
                  {calculation.monthly > 25000 && calculation.monthly <= 50000 && (
                    <div className="p-3 bg-info/10 border border-info/20 text-info rounded-lg">
                      <p className="text-sm font-semibold">15% de desconto</p>
                      <p className="text-xs">Volume R$ 25k-50k</p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
