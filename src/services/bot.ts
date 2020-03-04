import Telegraf, { session } from "telegraf";
import jwt from "./jwt";
import messages from "../data/messages.json";
import "../helpers/format";
import SessionContextMessageUpdate from "../helpers/sessionctx";

const bot = new Telegraf<SessionContextMessageUpdate>();
const banTimeout = parseInt(process.env.BAN_TIMEOUT, 10);

bot.use(session());

bot.start(async ctx => {
  await ctx.reply(messages.start);

  ctx.session.doing = undefined;

  if (process.env.BOT_PASSWORD) {
    ctx.session.passwordAsked = true;
    await ctx.reply(messages.passwordNotice);
    ctx.reply(messages.passwordPrompt);
  }
});

bot.help(ctx => {
  ctx.reply(messages.help);
});

if (process.env.BOT_PASSWORD) {
  bot.use(async (ctx, next) => {
    if (ctx.session.password === process.env.BOT_PASSWORD) {
      return next();
    }

    if (ctx.session.bannedUntil) {
      if (ctx.session.bannedUntil > Date.now()) {
        return ctx.reply(messages.passwordBanned);
      } else {
        ctx.session.invalidPass = 0;
        ctx.session.bannedUntil = undefined;
        ctx.session.passwordAsked = false;
      }
    }

    if (ctx.session.passwordAsked) {
      if (ctx.message.text === process.env.BOT_PASSWORD) {
        ctx.session.password = ctx.message.text;
        ctx.reply(messages.passwordSuccess);
      } else {
        ctx.session.invalidPass = (ctx.session.invalidPass || 0) + 1;

        if (ctx.session.invalidPass > 5) {
          ctx.session.bannedUntil = Date.now() + banTimeout;
          ctx.reply(messages.passwordBanned.format(ctx.session.invalidPass));
        } else {
          ctx.reply(messages.passwordWrong);
        }
      }
    } else {
      ctx.session.passwordAsked = true;
      await ctx.reply(messages.passwordNotice);
      ctx.reply(messages.passwordPrompt);
    }
  });
}

bot.command("newkey", ctx => {
  ctx.reply(messages.namePrompt);
  ctx.session.doing = "adding";
});

bot.command("cancel", ctx => {
  ctx.reply(messages.cancelled);
  ctx.session.doing = undefined;
});

bot.on("message", ctx => {
  // @ts-ignore
  const action: string | undefined = ctx.session.doing;

  if (action === "adding" && ctx.message.text) {
    const token = jwt.sign({
      subject: ctx.chat.id,
      name: ctx.message.text.substr(0, 25)
    });
    ctx.reply(messages.key.format(token));
    ctx.session.action = undefined;
  }
});

export default bot;
