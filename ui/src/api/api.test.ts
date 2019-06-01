/**
 * @jest-environment node
 */
import * as api from './api';
import * as interactions from './interactions';
import urls from '../constants/urls';
import { createProvider } from '../test-utils/pacts';
import * as path from 'path';

import { Pact } from '@pact-foundation/pact';

jest.mock('../constants/urls');

describe('api', () => {
    // Check `src/constants/__mocks__/urls`
  const provider = createProvider(12000);

  beforeEach(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('getAirports()', () => {
    it('returns a list of airports', async () => {
      provider.addInteraction(interactions.A_REQUEST_FOR_AIRPORTS);

      const airports = await api.getAirports();

      expect(airports).toEqual([{ 
        code: 'PTY',
        name: 'Tocumen International Airport',
      }]);
    });
  });
});
