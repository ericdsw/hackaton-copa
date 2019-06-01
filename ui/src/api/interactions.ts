import { Matchers, InteractionObject } from '@pact-foundation/pact';

import httpStatusCodes from '../constants/http-status-codes';

export const A_REQUEST_FOR_AIRPORTS: InteractionObject = {
  state: 'there are a list of airports',
  uponReceiving: 'a request for airports',
  withRequest: {
    method: 'GET',
    path: '/airports',
    headers: {
      Accept: 'application/json',
    },
  },
  willRespondWith: {
    status: httpStatusCodes.OK,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: {
      airports: Matchers.eachLike({
        code: 'PTY',
        name: 'Tocumen International Airport',
      }),
    },
  },
};
