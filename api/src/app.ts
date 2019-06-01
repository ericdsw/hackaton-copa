import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import init from './init';
import logger from './logger';
import httpStatusCode from './constants/http-status-code';
import config from './config';

try {
  init();
} catch (err) {
  logger.error(err);
  process.exit(1);
}

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.status(httpStatusCode.NOT_FOUND).end();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { message, stack } = err;

  logger.error(err);

  res
    .status(httpStatusCode.INTERNAL_SERVER_ERROR)
    .json({
      message,
      stack: config.ENV !== 'production' && stack || undefined,
    })
});

export default app;
