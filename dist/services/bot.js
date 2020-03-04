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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = __importStar(require("telegraf"));
const jwt_1 = __importDefault(require("./jwt"));
const messages_json_1 = __importDefault(require("../data/messages.json"));
require("../helpers/format");
const bot = new telegraf_1.default(process.env.bot_token);
const banTimeout = parseInt(process.env.ban_timeout, 10);
bot.use(telegraf_1.session());
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(messages_json_1.default.start);
    if (process.env.BOT_PASSWORD) {
        ctx.session.passwordAsked = true;
        yield ctx.reply(messages_json_1.default.passwordNotice);
        ctx.reply(messages_json_1.default.passwordPrompt);
    }
}));
bot.help(ctx => {
    ctx.reply(messages_json_1.default.help);
});
if (process.env.bot_password) {
    bot.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (ctx.session.password === process.env.bot_password) {
            return next();
        }
        if (ctx.session.bannedUntil) {
            if (ctx.session.bannedUntil > Date.now()) {
                return ctx.reply(messages_json_1.default.passwordBanned);
            }
            else {
                ctx.session.invalidPass = 0;
                ctx.session.bannedUntil = undefined;
                ctx.session.passwordAsked = false;
            }
        }
        if (ctx.session.passwordAsked) {
            if (ctx.message.text === process.env.bot_password) {
                ctx.session.password = ctx.message.text;
                ctx.reply(messages_json_1.default.passwordSuccess);
            }
            else {
                ctx.session.invalidPass = (ctx.session.invalidPass || 0) + 1;
                if (ctx.session.invalidPass > 5) {
                    ctx.session.bannedUntil = Date.now() + banTimeout;
                    ctx.reply(messages_json_1.default.passwordBanned.format(ctx.session.invalidPass));
                }
                else {
                    ctx.reply(messages_json_1.default.passwordWrong);
                }
            }
        }
        else {
            ctx.session.passwordAsked = true;
            yield ctx.reply(messages_json_1.default.passwordNotice);
            ctx.reply(messages_json_1.default.passwordPrompt);
        }
    }));
}
bot.command("newkey", ctx => {
    ctx.reply(messages_json_1.default.namePrompt);
    ctx.session.doing = "adding";
});
bot.command("cancel", ctx => {
    ctx.reply(messages_json_1.default.cancelled);
    ctx.session.doing = undefined;
});
bot.on("message", ctx => {
    // @ts-ignore
    const action = ctx.session.doing;
    if (action === "adding" && ctx.message.text) {
        const token = jwt_1.default.sign({
            subject: ctx.chat.id,
            name: ctx.message.text.substr(0, 25)
        });
        ctx.reply(messages_json_1.default.key.format(token));
        ctx.session.action = undefined;
    }
});
exports.default = bot;
//# sourceMappingURL=bot.js.map