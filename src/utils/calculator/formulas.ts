/**
 * FÓRMULAS EXATAS DA OPTIDATA CLOUD
 * Todos os valores em R$ (BRL)
 */

export const CLOUD_PRICING = {
  compute: {
    vcpu: {
      hourly: 0.0347,
      monthly: 24.98
    }
  },
  memory: {
    ram: {
      hourly: 0.0278,
      monthly: 20.02
    }
  },
  storage: {
    ssd: 0.55,
    fcm: 0.75
  },
  services: {
    monitoring: 100.00,
    ip: 70.00,
    backup: {
      none: 0,
      standard: 0.30,
      double: 0.60,
      triple: 0.90
    }
  }
}

export interface VMConfig {
  vcpu: number
  ramGB: number
  storageSSD: number
  storageFCM: number
  monitoring: boolean
  backupType: 'none' | 'standard' | 'double' | 'triple'
  additionalIPs: number
  os?: string
  database?: string
  additionalSoftware?: string[]
}

export interface CalculationResult {
  breakdown: {
    compute: number
    memory: number
    storage: number
    backup: number
    monitoring: number
    ips: number
    licenses: number
  }
  monthly: number
  annual: number
}

export function calculateInfrastructure(config: VMConfig, licenseCost: number = 0): CalculationResult {
  const computeCost = config.vcpu * CLOUD_PRICING.compute.vcpu.monthly
  const memoryCost = config.ramGB * CLOUD_PRICING.memory.ram.monthly
  const storageCost = 
    (config.storageSSD * CLOUD_PRICING.storage.ssd) +
    (config.storageFCM * CLOUD_PRICING.storage.fcm)
  
  let backupCost = 0
  if (config.backupType !== 'none') {
    const storageBaseCost = 
      (config.storageSSD * CLOUD_PRICING.storage.ssd) +
      (config.storageFCM * CLOUD_PRICING.storage.fcm)
    backupCost = storageBaseCost * CLOUD_PRICING.services.backup[config.backupType]
  }
  
  const monitoringCost = config.monitoring ? CLOUD_PRICING.services.monitoring : 0
  const ipCost = config.additionalIPs * CLOUD_PRICING.services.ip
  
  const totalMonthly = 
    computeCost + 
    memoryCost + 
    storageCost + 
    backupCost + 
    monitoringCost + 
    ipCost + 
    licenseCost
  
  return {
    breakdown: {
      compute: Math.round(computeCost * 100) / 100,
      memory: Math.round(memoryCost * 100) / 100,
      storage: Math.round(storageCost * 100) / 100,
      backup: Math.round(backupCost * 100) / 100,
      monitoring: monitoringCost,
      ips: ipCost,
      licenses: licenseCost
    },
    monthly: Math.round(totalMonthly * 100) / 100,
    annual: Math.round(totalMonthly * 12 * 100) / 100
  }
}
