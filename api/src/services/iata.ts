import fetch, { Response } from 'node-fetch';

import urls from '../constants/urls';
import config from '../config';
import airports from '../../resources/airports.json';

const { IATA } = urls;
const { IATA_API_KEY } = config;

export interface Airport {
  name: string;
  code: string;
}
interface AirportResponse {
  response: Array<Airport>;
}

function validateResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response;
}

export const getAirports = () : Promise<Array<Airport>> => 
  Promise.resolve(airports.airports);
  // fetch(`${IATA}/api/v6/airports?api_key=${IATA_API_KEY}`)
  //   .then(validateResponse)
  //   .then(response => response.json())
  //   .then(data => data as AirportResponse)
  //   .then(({ response }) => response);
