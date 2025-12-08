// Types for form handling

export interface LeadFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  hasInvestment: "yes" | "no";
}

export interface LeadInsertData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  has_investment: boolean;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}
