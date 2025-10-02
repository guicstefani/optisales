export interface Seller {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  seller_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  industry: string;
  company_size: 'small' | 'medium' | 'large' | 'enterprise';
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  seller_id: string;
  client_id: string;
  deal_name: string;
  mrr_value: number;
  original_value: number;
  discount_percentage: number;
  discount_reason?: string;
  potential_upgrade_value?: number;
  contract_start_date: string;
  contract_end_date: string;
  contract_duration_months: number;
  status: 'active' | 'pending' | 'churned' | 'upgraded';
  churn_date?: string;
  churn_reason?: string;
  payment_method: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MRRHistory {
  id: string;
  seller_id: string;
  month: string;
  total_mrr: number;
  new_mrr: number;
  churned_mrr: number;
  expansion_mrr: number;
  active_clients: number;
  created_at: string;
}

export interface Target {
  id: string;
  seller_id: string;
  year: number;
  quarter: number;
  target_mrr: number;
  target_new_clients: number;
  achieved_mrr: number;
  achieved_new_clients: number;
  created_at: string;
  updated_at: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}
