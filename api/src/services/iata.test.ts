import nock from 'nock';
import * as iata from './iata';
import urls from '../constants/urls';
import httpStatusCode from '../constants/http-status-code';

jest.mock('../../resources/airports.json', () => ({
  airports: [{
    code: 'foo',
    name: 'bar',
  }]
}));

describe('iata', () => {
  describe('getAirports()', () => {
    const sampleAirport = {
      code: 'foo',
      name: 'bar',
    };

    beforeAll(() => { 
      nock(urls.IATA)
        .get('/api/v6/airports?api_key=test_api_key') 
        .reply(httpStatusCode.OK, {
          response: [sampleAirport],
        });
    });

    it('returns a list of airports with code and name', async () => {
      const airports = await iata.getAirports();

      expect(airports).toEqual([sampleAirport]);
    });
  });
});
