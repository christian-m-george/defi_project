import pino from "pino";
import config from "config";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});



export default logger;
