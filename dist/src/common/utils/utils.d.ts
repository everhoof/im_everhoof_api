export declare class Utils {
    static getDate(): string;
    static getRandomString(length?: number): string;
    static arrayDiff<T = any>(a1: T[], a2: T[]): T[];
    static conditionalWait(condition: () => boolean): Promise<void>;
    static escapeMessage(message: string): string;
}
