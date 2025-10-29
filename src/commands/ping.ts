import { Command } from "../structures/Command.js";

const pingCommand = new Command()
  .setName("ping")
  .setDescription("Replies with Pong!")
  .setRun(async ({ interaction }) => {
    await interaction.reply("Pong!");
  });

export default pingCommand;
