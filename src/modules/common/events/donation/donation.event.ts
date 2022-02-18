export class DonationEvent {
  public readonly id: number;
  public readonly username: string;
  public readonly message: string;
  public readonly amount: number;
  public readonly currency: string;

  constructor(payload: { id: number; username: string; message: string; amount: number; currency: string }) {
    this.id = payload.id;
    this.username = payload.username;
    this.message = payload.message;
    this.amount = payload.amount;
    this.currency = payload.currency;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
