import { User } from "./user";

export type Company = {
    id: number;
    name: string;
    legal_name: string | null;
    business_registration: string;
    business_type: string | null;
    industry: string;
    expected_activity: string;
    website: string | null;
    business_number: string | null;
    email: string;
    phone: string | null;
    address_line_1: string;
    address_line_2: string | null;
    address_city: string;
    address_state: string;
    address_zip: string;
    address_country: string;
    referred_by: string | null;
    referral_code: string | null;
    shareholders_verified: boolean;
    approved: string;
    discount_percent: string;
    pay_later_discount_percent: string;
    default_currency: string;
    default_payment_terms: number;
    auto_journal_entries: boolean;
    auto_approve_bills: boolean;
    authorized_signatory_user_id: number | null;
    authorized_signatory_contact_id: number | null;
    logo_url: string | null;
    vopay_client_id: string | null;
    tax_number: string | null;
    railz_id: string | null;
    is_syncing: boolean;
    last_sync_at: string | null;
    last_started_sync_at: string | null;
    last_reminder_email_sent_at: string | null;
    last_deployment_charge: string | null;
    fee_type: string;
    variable_rate: string;
    flat_rate: string;
    advance_rate: number;
    vendor_deployment_fee: string;
    deployment_fee: string;
    vendor_advance_rate: string;
    vendor_fee_type: string;
    vendor_variable_rate: string;
    vendor_flat_rate: string;
    account_executive: string | null;
    default_vendor_payment_terms: number | null;
    payment_cycle: string | null;
    payment_cycle_2: string | null;
    bills_max_day_age: number;
    credit_limit: number;
    vendor_credit_limit: number;
    createdAt: string;
    updatedAt: string;
    deleted_at: string | null;
    Connections: unknown[];
    Users: User[];
  };
  