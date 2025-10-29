import { SlashCommandBuilder } from "discord.js";
import type { CommandIntents, CommandPermissions } from "./types.js";

class Command extends SlashCommandBuilder {
  readonly permissions: CommandPermissions[];
  readonly intents: CommandIntents[];
  readonly run: (args: any) => void;

  constructor() {
    super();
    this.permissions = [];
    this.intents = [];
    this.run = () => {};
  }

  /**
   * What intents does the command need to parse?
   * @param intents
   */
  setIntents(...intents: CommandIntents) {
    Reflect.set(this, "intents", intents);
    return this;
  }

  /**
   * Permissions for the command
   * @param permissions
   */
  setPermissions(...permissions: CommandPermissions[]) {
    Reflect.set(this, "permissions", permissions);
    return this;
  }

  /**
   * Sets the run function for the command
   * @param runFunction
   * @returns
   */
  setRun(runFunction: (args: any) => void) {
    Reflect.set(this, "run", runFunction);
    return this;
  }
}

export { Command };
