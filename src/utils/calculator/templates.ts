import { VMConfig } from './formulas'

export interface ERPTemplate {
  id: string
  name: string
  category: string
  description: string
  icon: string
  color: string
  servers: VMConfig[]
  additionalSoftware?: string[]
  specs: Record<string, string>
}

export const ERP_TEMPLATES: ERPTemplate[] = [
  {
    id: 'totvs-protheus',
    name: 'TOTVS Protheus 12',
    category: 'ERP',
    description: 'Configuração otimizada para produção',
    icon: '🏢',
    color: 'from-primary to-primary/80',
    servers: [
      {
        vcpu: 8,
        ramGB: 32,
        storageSSD: 500,
        storageFCM: 0,
        os: 'windows-standard',
        monitoring: true,
        backupType: 'double',
        additionalIPs: 0
      },
      {
        vcpu: 16,
        ramGB: 64,
        storageSSD: 500,
        storageFCM: 2000,
        os: 'windows-standard',
        database: 'sql-standard',
        monitoring: true,
        backupType: 'triple',
        additionalIPs: 0
      },
      {
        vcpu: 2,
        ramGB: 4,
        storageSSD: 100,
        storageFCM: 0,
        os: 'windows-standard',
        monitoring: true,
        backupType: 'standard',
        additionalIPs: 0
      }
    ],
    additionalSoftware: ['tsplus-25', 'antivirus'],
    specs: {
      users: '25 simultâneos',
      performance: '5.000 NF-e/dia',
      availability: '99.9%',
      support: '24x7'
    }
  },
  {
    id: 'senior-hcm',
    name: 'Senior HCM',
    category: 'HCM',
    description: 'Alta disponibilidade para RH',
    icon: '👥',
    color: 'from-success to-green-600',
    servers: [
      {
        vcpu: 12,
        ramGB: 48,
        storageSSD: 1000,
        storageFCM: 0,
        os: 'windows-datacenter',
        database: 'oracle-se',
        monitoring: true,
        backupType: 'triple',
        additionalIPs: 1
      },
      {
        vcpu: 8,
        ramGB: 32,
        storageSSD: 1000,
        storageFCM: 0,
        os: 'windows-standard',
        monitoring: true,
        backupType: 'double',
        additionalIPs: 0
      }
    ],
    additionalSoftware: ['waf-business', 'antivirus'],
    specs: {
      employees: '5.000 funcionários',
      modules: 'Folha, Ponto, Benefícios',
      availability: '99.9%',
      integration: 'eSocial, APIs bancárias'
    }
  },
  {
    id: 'sap-business-one',
    name: 'SAP Business One',
    category: 'ERP',
    description: 'Ambiente completo SAP',
    icon: '💼',
    color: 'from-info to-blue-600',
    servers: [
      {
        vcpu: 16,
        ramGB: 64,
        storageSSD: 1000,
        storageFCM: 3000,
        os: 'windows-datacenter',
        database: 'sql-enterprise',
        monitoring: true,
        backupType: 'triple',
        additionalIPs: 2
      }
    ],
    additionalSoftware: ['tsplus-25', 'antivirus', 'waf-pro'],
    specs: {
      users: '50 simultâneos',
      modules: 'Completo',
      availability: '99.95%',
      support: 'Premium 24x7'
    }
  }
]
