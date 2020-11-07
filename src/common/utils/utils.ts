export class Utils {
  static getDate(): string {
    const today = new Date();
    const dd = String(today.getUTCDate()).padStart(2, '0');
    const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = today.getUTCFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  static getRandomString(length = 64): string {
    return Array(length)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
  }
}
