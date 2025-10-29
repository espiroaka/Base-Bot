import { Events } from "discord.js";
import { Event } from "../structures/Event.js";
import { logger } from "../utils/logger.js";

const ready = new Event<Events.InteractionCreate>()
  .setName(Events.InteractionCreate)
  .setOnce(false)
  .setRun(async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      logger.warn(`No command found for ${interaction.commandName}`);
      return;
    }

    command.run({ client, interaction });
  });

export default ready;
