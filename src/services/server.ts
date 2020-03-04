import express from "express";
import jwt from "./jwt";
import Telegraf, { ContextMessageUpdate } from "telegraf";
import "../helpers/format";
import messages from "../data/messages.json";
import Logger from "./logger";

const logger = new Logger("http");

function start(bot: Telegraf<ContextMessageUpdate>) {
  const app = express();
  const port = process.env.PORT || 1234;

  app.get("/api", async (req, res) => {
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

    const data = jwt.verify(token);

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

    const { name, subject } = data.payload as any;
    const message = await bot.telegram.sendMessage(
      subject,
      messages.notification.format(name, text)
    );

    res.status(200).send({
      status: 200,
      data: message
    });
  });

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

export default { start };
