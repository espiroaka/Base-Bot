import {
  ActivityType,
  ApplicationCommandOptionChoiceData,
  ApplicationCommandOptionAllowedChannelTypes
} from "discord.js";

export interface BotConfig {
  /**
   * Options for prefixed commands
   */
  prefixCommands: {
    /**
     * Should prefixed commands be enabled?
     * @default true
     */
    enabled: boolean;
    /**
     * A list of strings that must be appended to messages for commands to be parsed.
     */
    prefixes: string[];
  };
  /**
   * IDs of roles that have permission to do various things.
   */
  permissions: {
    /**
     * Access to the devs commands.
     */
    devs?: string[];

    /**
     * Access to the admins commands.
     */
    admin?: string[];
  };
}

export declare type CommandPermissions = ["dev", "admin", "user"];

export declare type CommandIntents = []; //Tal vez añadir middlerware en el futuro para manejar ids y tal??

export declare type CommandType = "ChatInput" | "User" | "Message";

export declare type CommandExport = {
  default: any;
};
