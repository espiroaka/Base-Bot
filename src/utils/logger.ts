import pino from "pino";

const logger = pino({
  enabled: process.env.NODE_ENV !== "production",
  transport: {
    target: "pino-pretty"
  }
});

export { logger };
