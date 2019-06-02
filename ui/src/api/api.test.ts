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

// Check `src/constants/__mocks__/urls`
const provider = createProvider(12000);

describe('api', () => {
  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('getAirports()', () => {
    it('returns a list of airports', async () => {
      await provider.addInteraction(interactions.A_REQUEST_FOR_AIRPORTS);

      const airports = await api.getAirports();

      expect(airports).toEqual([{ 
        code: 'PTY',
        name: 'Tocumen International Airport',
      }]);
    });
  });

  // FIXME: test pass, but setup  is wrong. skip others to see it pass
  describe('getNoShows()', () => {
    it('returns no-shows data', async () => {
      await provider.addInteraction(interactions.A_NO_SHOW_DATA_REQUEST);

      const noShow = await api.getNoShow({
        origin: 'PTY',
        destination: 'DAV',
        date: '2019-06-01',
        time: '13:30 pm'
      });

      expect(noShow).toEqual({
        wontShow: 5.8,
        confidence: 0.8,
        records: 1000,
      });
    });
  });
});
