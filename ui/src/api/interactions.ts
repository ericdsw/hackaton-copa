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

export const A_NO_SHOW_DATA_REQUEST: InteractionObject = {
  state: 'there is some flight data',
  uponReceiving: 'a no show request',
  withRequest: {
    method: 'GET',
    path: '/no-show',
    headers: {
      Accept: 'application/json',
    },
    query: {
      origin: 'PTY',
      destination: 'DAV',
      date: '2019-06-01',
      time: '13:30 pm',
    },
  },
  willRespondWith: {
    status: httpStatusCodes.OK,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: {
      noShow: {
        wontShow: Matchers.somethingLike(5.8),
        confidence: Matchers.somethingLike(0.8),
        records: Matchers.somethingLike(1000),
      },
    },
  },
};
