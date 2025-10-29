import { Client, Collection, InteractionContextType } from "discord.js";
import { glob } from "node:fs/promises";
import { logger } from "../utils/logger.js";
import type { BotConfig } from "./types.js";
import { Command } from "./Command.js";

class BotClient extends Client {
  public declare config: BotConfig;
  public declare commands: Collection<string, Command>;

  constructor() {
    super({
      intents: []
    });

    this.commands = new Collection();
  }

  async start() {
    await this.loadEvents();
    this.login(process.env.BOT_TOKEN);
    this.loadCommands();

    this.on("clientReady", () => {
      logger.info(`Logged in as ${this.user?.tag}`);
    });
  }

  async loadCommands() {
    const commandsPaths = glob(`${import.meta.dirname}/../commands/**/*.js`);

    for await (const filePath of commandsPaths) {
      const command = (await import(`file://${filePath}`)).default;

      if (!(command instanceof Command)) continue;

      this.commands.set(command.name, command);
    }

    logger.info(`Loaded ${this.commands.size} commands.`);

    await this.application?.commands.set(
      this.commands.map(cmd => {
        cmd.setContexts(
          InteractionContextType.PrivateChannel,
          InteractionContextType.Guild,
          InteractionContextType.BotDM
        );
        return cmd.toJSON();
      })
    );

    logger.info(`Registered commands with Discord API.`);
  }

  async loadEvents() {
    const eventsPaths = glob(`${import.meta.dirname}/../events/**/*.js`);

    for await (const filePath of eventsPaths) {
      const event = (await import(`file://${filePath}`)).default;

      if (typeof event.name !== "string" || typeof event.run !== "function") {
        console.warn(`Invalid event structure in file: ${filePath}`);
        continue;
      }

      if (event.once) {
        this.once(event.name, event.run.bind(event, this));
      } else {
        this.on(event.name, event.run.bind(event, this));
      }
    }
  }
}

export { BotClient };
