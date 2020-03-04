import { ContextMessageUpdate } from "telegraf";

interface SessionContextMessageUpdate extends ContextMessageUpdate {
  session: { [name: string]: any };
}

export default SessionContextMessageUpdate;
