"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./logger"));
const logger = new logger_1.default('jwt');
let privateKey = process.env.jwt_key;
if (!privateKey) {
    fs_1.default.readFile(path_1.default.join(process.env.APPROOT, ".keys", "jwtRS256.key"), { encoding: "utf8" }, (err, data) => {
        if (err)
            throw err;
        privateKey = data;
    });
}
function sign(payload) {
    return jsonwebtoken_1.default.sign(payload, privateKey, {
        issuer: process.env.jwt_issuer
    });
}
function verify(token) {
    try {
        const payload = jsonwebtoken_1.default.verify(token, privateKey, {
            issuer: process.env.jwt_issuer
        });
        return {
            valid: true,
            payload
        };
    }
    catch (e) {
        logger.error(e);
        return {
            valid: false,
            payload: undefined
        };
    }
}
exports.default = { sign, verify };
//# sourceMappingURL=jwt.js.map