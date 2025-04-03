import { Company } from "./company";

export type User = {
  full_name: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  cognito_id: string;
  company_id: number;
  phone: string | null;
  avatar_url: string | null;
  ip_address: string;
  last_login_at: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  CompanyId: number;
  Company: Company;
  intercom_hash: string;
  roles: string;
  verified: boolean;
};
