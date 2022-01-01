import { FilterXSS } from 'xss';

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
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('');
  }

  static arrayDiff<T = any>(a1: T[], a2: T[]): T[] {
    return a1.filter((i) => !a2.includes(i)).concat(a2.filter((i) => !a1.includes(i)));
  }

  static conditionalWait(condition: () => boolean): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (condition()) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  static escapeMessage(message: string): string {
    const whitelist = [/<@!:[\w-]+:\d+>/];
    const escape = new FilterXSS({
      whiteList: {},
      onTag(tag, html) {
        for (let i = 0; i < whitelist.length; ++i) {
          if (whitelist[i].test(html)) {
            return html;
          }
        }
      },
    });
    return escape.process(message);
  }
}
