import * as http from 'http';

import app from './app';
import config from './config';
import logger from './logger';

const { PORT } = config;

const server = http.createServer(app);

server.listen({ port }, () => {
  logger.info('');
  logger.info(`     THOR     `);
  logger.info('');
  logger.info(`API started on port: ${PORT}`);
});
