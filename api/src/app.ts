import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import init from './init';
import logger from './logger';
import httpStatusCode from './constants/http-status-code';
import config from './config';
import airportsRouter from './routes/airports';
import noShowRouter from './routes/noShow';

try {
  init();
} catch (err) {
  logger.error(err); // FIXME: error not being logged
  process.exit(1);
}

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/airports', airportsRouter);
app.use('/api/no-show', noShowRouter);

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
