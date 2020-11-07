"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static getDate() {
        const today = new Date();
        const dd = String(today.getUTCDate()).padStart(2, '0');
        const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
        const yyyy = today.getUTCFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }
    static getRandomString(length = 64) {
        return Array(length)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map