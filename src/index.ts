import { config } from "dotenv";
import { BotClient } from "./structures/Client.js";

config({ quiet: true });

const client = new BotClient();

client.start();
