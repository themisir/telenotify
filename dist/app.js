"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("./services/bot"));
const server_1 = __importDefault(require("./services/server"));
server_1.default.start(bot_1.default);
bot_1.default.launch();
//# sourceMappingURL=app.js.map