import pino from "pino";

const logger = pino({
  transport: {
    target: "pino/file",
    options: {
      destination: "./logs/error.log",
      mkdir: true,
    },
  },
});

export default logger;