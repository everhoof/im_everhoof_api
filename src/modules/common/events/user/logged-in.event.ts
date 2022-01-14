export class UserLoggedInEvent {
  public readonly userId: number;

  constructor(payload: { userId: number }) {
    this.userId = payload.userId;
  }
}
