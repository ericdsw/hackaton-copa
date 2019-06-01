import * as path from 'path';

import { Pact } from '@pact-foundation/pact';

const pactDirectory = path.resolve(process.cwd(), '..', 'pacts')

export const createProvider = (port: number) => new Pact({
  consumer: 'hc-ui',
  provider: 'hc-api',
  port,
  log: path.resolve(pactDirectory, 'logs', 'pact.log'),
  dir: pactDirectory,
  logLevel: 'error',
  spec: 2,
});
