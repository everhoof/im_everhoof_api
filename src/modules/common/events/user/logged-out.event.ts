export class UserLoggedOutEvent {
  public readonly userId: number;

  constructor(payload: { userId: number }) {
    this.userId = payload.userId;
  }
}
