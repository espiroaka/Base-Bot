import type { ClientEvents } from "discord.js";
import type { BotClient } from "./Client.js";

class Event<K extends keyof ClientEvents = keyof ClientEvents> {
  public declare name: K;
  public declare once: boolean;
  public declare run: (client: BotClient, ...args: ClientEvents[K]) => void;

  constructor() {
    this.name = "" as unknown as K;
    this.once = false;
    this.run = (() => {}) as (
      client: BotClient,
      ...args: ClientEvents[K]
    ) => void;
  }

  setName(name: K) {
    Reflect.set(this, "name", name);
    return this;
  }

  setOnce(once: boolean) {
    Reflect.set(this, "once", once);
    return this;
  }

  setRun(run: (client: BotClient, ...args: ClientEvents[K]) => void) {
    Reflect.set(this, "run", run);
    return this;
  }
}

export { Event };
