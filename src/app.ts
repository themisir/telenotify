import bot from "./services/bot";
import server from "./services/server";

server.start(bot);
bot.launch();
