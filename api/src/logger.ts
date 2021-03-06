import winston from "winston";
import { Logger } from "winston";

import config from './config';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: config.ENV === 'production' ? 'error' : 'debug' }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug'})
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
