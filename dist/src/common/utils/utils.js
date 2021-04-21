"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const xss_1 = require("xss");
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
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');
    }
    static arrayDiff(a1, a2) {
        return a1.filter((i) => !a2.includes(i)).concat(a2.filter((i) => !a1.includes(i)));
    }
    static conditionalWait(condition) {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (condition()) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }
    static escapeMessage(message) {
        const whitelist = [/<@!\d+>/];
        const escape = new xss_1.FilterXSS({
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
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map