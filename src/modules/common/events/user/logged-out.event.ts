export class UserLoggedOutEvent {
  public readonly userId: number;
  public readonly username?: string;

  constructor(payload: { userId: number; username?: string }) {
    this.userId = payload.userId;
    this.username = payload.username;
  }
}
