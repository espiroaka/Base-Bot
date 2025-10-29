import { Event } from "../structures/Event.js";
import { logger } from "../utils/logger.js";

const ready = new Event()
  .setName("clientReady")
  .setOnce(true)
  .setRun(async () => {
    logger.info("Bot is ready and connected to Discord.");
  });

export default ready;
