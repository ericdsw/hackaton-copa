import * as path from 'path';
import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import { createServer, Server } from 'http';
import nock from 'nock';

import httpStatusCode from './constants/http-status-code';
import urls from './constants/urls';

import app from './app';

const port = 8001;
const pacts = path.resolve(process.cwd(), '..', 'pacts', 'hc-ui-hc-api.json');

const options: VerifierOptions = {
  providerBaseUrl: `http://localhost:${port}`,
  provider: 'hc-api',
  pactUrls: [ pacts ],
  logLevel: 'error',
};

describe('API', () => {
  let server: Server;

  beforeAll(() => {
    nock(urls.IATA)
      .get('/api/v6/airports?api_key=test_api_key') 
      .reply(httpStatusCode.OK, {
        response: [{
          code: 'PTY',
          name: 'Tocumen International Airport',
        }],
      });
    server = createServer(app);
    server.listen(port);
  });

  afterAll(done => server.close(done));

  it('fulfills the contract', () => {
    return new Verifier().verifyProvider(options);
  });
});


