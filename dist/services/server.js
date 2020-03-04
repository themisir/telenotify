"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = __importDefault(require("./jwt"));
require("../helpers/format");
const messages_json_1 = __importDefault(require("../data/messages.json"));
const logger_1 = __importDefault(require("./logger"));
const logger = new logger_1.default("http");
function start(bot) {
    const app = express_1.default();
    const port = process.env.PORT || 1234;
    app.get("/api", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { key: token, text } = req.query;
        if (!token) {
            return res.status(401).send({
                status: 401,
                message: "Unauthorized",
                ref: "https://tools.ietf.org/html/rfc7235#section-3.1"
            });
        }
        if (!text) {
            return res.status(400).send({
                status: 400,
                message: "Bad Request",
                ref: "https://tools.ietf.org/html/rfc7231#section-6.5.1"
            });
        }
        const data = jwt_1.default.verify(token);
        if (!data.valid) {
            return res.status(403).send({
                status: 403,
                message: "Forbidden",
                ref: "https://tools.ietf.org/html/rfc7231#section-6.5.3"
            });
        }
        if (typeof data.payload === "string") {
            data.payload = JSON.parse(data.payload);
        }
        const { name, subject } = data.payload;
        const message = yield bot.telegram.sendMessage(subject, messages_json_1.default.notification.format(name, text));
        res.status(200).send({
            status: 200,
            data: message
        });
    }));
    app.use((_, res) => {
        res.status(404).json({
            status: 404,
            message: "Not Found",
            ref: "https://tools.ietf.org/html/rfc7231#section-6.5.4"
        });
    });
    app.listen(port, () => {
        logger.info(`Listening on port ${port}`);
    });
    return app;
}
exports.default = { start };
//# sourceMappingURL=server.js.map