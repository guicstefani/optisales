import { Deal, MRRHistory } from "@/types";

export const mockDeals: Deal[] = [
  {
    id: "1",
    seller_id: "seller-1",
    client_id: "client-1",
    deal_name: "Tech Solutions Corp - Enterprise Plan",
    mrr_value: 15000,
    original_value: 18000,
    discount_percentage: 16.67,
    discount_reason: "Volume discount for annual contract",
    potential_upgrade_value: 25000,
    contract_start_date: "2024-01-15",
    contract_end_date: "2025-01-15",
    contract_duration_months: 12,
    status: "active",
    payment_method: "Credit Card",
    notes: "High-value client, excellent growth potential",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    seller_id: "seller-1",
    client_id: "client-2",
    deal_name: "Digital Agency Pro - Professional Plan",
    mrr_value: 8500,
    original_value: 10000,
    discount_percentage: 15,
    discount_reason: "Early adopter discount",
    potential_upgrade_value: 15000,
    contract_start_date: "2024-02-01",
    contract_end_date: "2025-02-01",
    contract_duration_months: 12,
    status: "active",
    payment_method: "Bank Transfer",
    notes: "Great engagement, using all features",
    created_at: "2024-02-01T10:00:00Z",
    updated_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "3",
    seller_id: "seller-1",
    client_id: "client-3",
    deal_name: "Startup Inc - Growth Plan",
    mrr_value: 5000,
    original_value: 5000,
    discount_percentage: 0,
    potential_upgrade_value: 10000,
    contract_start_date: "2024-03-10",
    contract_end_date: "2024-09-10",
    contract_duration_months: 6,
    status: "active",
    payment_method: "Credit Card",
    notes: "Fast-growing startup, likely to upgrade",
    created_at: "2024-03-10T10:00:00Z",
    updated_at: "2024-03-10T10:00:00Z",
  },
  {
    id: "4",
    seller_id: "seller-1",
    client_id: "client-4",
    deal_name: "Enterprise Global - Custom Plan",
    mrr_value: 22000,
    original_value: 25000,
    discount_percentage: 12,
    discount_reason: "Multi-year commitment",
    potential_upgrade_value: 35000,
    contract_start_date: "2023-12-01",
    contract_end_date: "2025-12-01",
    contract_duration_months: 24,
    status: "active",
    payment_method: "Bank Transfer",
    notes: "Strategic partnership, excellent relationship",
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
  },
  {
    id: "5",
    seller_id: "seller-1",
    client_id: "client-5",
    deal_name: "Marketing Firm - Standard Plan",
    mrr_value: 3500,
    original_value: 4000,
    discount_percentage: 12.5,
    discount_reason: "Referral discount",
    contract_start_date: "2024-04-15",
    contract_end_date: "2024-10-15",
    contract_duration_months: 6,
    status: "pending",
    payment_method: "Credit Card",
    notes: "Waiting for final approval",
    created_at: "2024-04-15T10:00:00Z",
    updated_at: "2024-04-15T10:00:00Z",
  },
];

export const mockMRRHistory: MRRHistory[] = [
  {
    id: "1",
    seller_id: "seller-1",
    month: "2024-01",
    total_mrr: 35000,
    new_mrr: 15000,
    churned_mrr: 0,
    expansion_mrr: 0,
    active_clients: 8,
    created_at: "2024-01-31T10:00:00Z",
  },
  {
    id: "2",
    seller_id: "seller-1",
    month: "2024-02",
    total_mrr: 43500,
    new_mrr: 8500,
    churned_mrr: 0,
    expansion_mrr: 0,
    active_clients: 10,
    created_at: "2024-02-29T10:00:00Z",
  },
  {
    id: "3",
    seller_id: "seller-1",
    month: "2024-03",
    total_mrr: 48500,
    new_mrr: 5000,
    churned_mrr: 0,
    expansion_mrr: 0,
    active_clients: 12,
    created_at: "2024-03-31T10:00:00Z",
  },
  {
    id: "4",
    seller_id: "seller-1",
    month: "2024-04",
    total_mrr: 52000,
    new_mrr: 3500,
    churned_mrr: 0,
    expansion_mrr: 0,
    active_clients: 14,
    created_at: "2024-04-30T10:00:00Z",
  },
  {
    id: "5",
    seller_id: "seller-1",
    month: "2024-05",
    total_mrr: 52000,
    new_mrr: 0,
    churned_mrr: 0,
    expansion_mrr: 0,
    active_clients: 14,
    created_at: "2024-05-31T10:00:00Z",
  },
  {
    id: "6",
    seller_id: "seller-1",
    month: "2024-06",
    total_mrr: 54500,
    new_mrr: 2500,
    churned_mrr: 0,
    expansion_mrr: 0,
    active_clients: 15,
    created_at: "2024-06-30T10:00:00Z",
  },
];

export const calculateMetrics = () => {
  const currentMRR = mockMRRHistory[mockMRRHistory.length - 1].total_mrr;
  const previousMRR = mockMRRHistory[mockMRRHistory.length - 2].total_mrr;
  const mrrGrowth = ((currentMRR - previousMRR) / previousMRR) * 100;

  const activeDeals = mockDeals.filter((d) => d.status === "active");
  const activeClients = activeDeals.length;
  
  const totalPotentialUpgrade = activeDeals.reduce(
    (sum, deal) => sum + (deal.potential_upgrade_value || 0),
    0
  );

  const averageTicket = currentMRR / activeClients;

  const churnedDeals = mockDeals.filter((d) => d.status === "churned");
  const churnRate = (churnedDeals.length / mockDeals.length) * 100;

  return {
    currentMRR,
    mrrGrowth,
    activeClients,
    averageTicket,
    churnRate,
    totalPotentialUpgrade,
  };
};
