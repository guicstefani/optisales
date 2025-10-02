export const SOFTWARE_LICENSES = {
  os: {
    'windows-datacenter': {
      name: 'Windows Server Datacenter',
      calculate: (vcpu: number) => vcpu <= 8 ? 850 : 850 + ((vcpu - 8) * 106.25)
    },
    'windows-standard': {
      name: 'Windows Server Standard', 
      calculate: (vcpu: number) => vcpu <= 16 ? 220 : 220 + ((vcpu - 16) * 13.75)
    },
    'rhel': {
      name: 'Red Hat Enterprise Linux',
      price: 100
    },
    'ubuntu': {
      name: 'Ubuntu Server',
      price: 0
    }
  },
  database: {
    'sql-enterprise': {
      name: 'SQL Server Enterprise',
      calculate: (vcpu: number) => vcpu * 550
    },
    'sql-standard': {
      name: 'SQL Server Standard',
      calculate: (vcpu: number) => vcpu * 180
    },
    'oracle-se': {
      name: 'Oracle Standard Edition',
      price: 1200
    },
    'postgresql': {
      name: 'PostgreSQL',
      price: 0
    },
    'mysql': {
      name: 'MySQL',
      price: 0
    }
  },
  additional: {
    'tsplus-3': { name: 'TSPlus 3 usuários', price: 120 },
    'tsplus-5': { name: 'TSPlus 5 usuários', price: 180 },
    'tsplus-10': { name: 'TSPlus 10 usuários', price: 300 },
    'tsplus-25': { name: 'TSPlus 25 usuários', price: 600 },
    'antivirus': { name: 'Antivírus Corporativo', price: 55 },
    'waf-pro': { name: 'WAF Pro', price: 200 },
    'waf-business': { name: 'WAF Business', price: 400 }
  }
}

export function calculateLicenses(
  vcpu: number,
  os?: string,
  database?: string,
  additionalSoftware: string[] = []
): number {
  let total = 0
  
  if (os && SOFTWARE_LICENSES.os[os as keyof typeof SOFTWARE_LICENSES.os]) {
    const license = SOFTWARE_LICENSES.os[os as keyof typeof SOFTWARE_LICENSES.os]
    total += 'calculate' in license ? license.calculate(vcpu) : license.price
  }
  
  if (database && SOFTWARE_LICENSES.database[database as keyof typeof SOFTWARE_LICENSES.database]) {
    const license = SOFTWARE_LICENSES.database[database as keyof typeof SOFTWARE_LICENSES.database]
    total += 'calculate' in license ? license.calculate(vcpu) : license.price
  }
  
  additionalSoftware.forEach(software => {
    if (SOFTWARE_LICENSES.additional[software as keyof typeof SOFTWARE_LICENSES.additional]) {
      total += SOFTWARE_LICENSES.additional[software as keyof typeof SOFTWARE_LICENSES.additional].price
    }
  })
  
  return Math.round(total * 100) / 100
}
