"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(serviceName) {
        this.serviceName = serviceName;
    }
    debug(...args) {
        console.log(`[${this.serviceName}]`, ...args);
    }
    info(...args) {
        console.info(`[${this.serviceName}]`, ...args);
    }
    error(...args) {
        console.error(`[${this.serviceName}]`, ...args);
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map