export interface DonationMessage {
  id: number;
  name: string;
  username: string;
  recipient_name: string;
  message: string;
  message_type: string;
  payin_system: unknown;
  amount: number;
  currency: string;
  is_shown: number;
  amount_in_user_currency: number;
  created_at: string;
  shown_at: string | null;
  reason: string;
}

export interface DonationMessageResponse {
  data: DonationMessage;
  seq: number;
  gen: unknown;
  offset: unknown;
}
