import urls from '../constants/urls';
import { stringify } from 'querystring';

const callApi = <T>(path: string, options?: object) => 
  fetch(urls.API_CONTEXT_PATH + path, options)
    .then(response => response.json())
    .then(data => data as T);

const defaultOpts = {
  headers: {
    'Accept': 'application/json',
  }
}

interface AirportResponse {
  airports: Array<Airport>;
}

export interface Airport {
  code: string;
  name: string;
}

export const getAirports = () => 
  callApi<AirportResponse>(urls.PATHS.AIRPORTS, { ...defaultOpts })
    .then(({ airports }) => airports);

export interface NoShow {
  wontShow: string;
  confidence: string;
  records: string;
}

interface NoShowResponse {
  noShow: NoShow;
}

export const getNoShow = (params : {
  origin: string
  destination: string ,
  date: string,
  time: string
}) => callApi<NoShowResponse>(`${urls.PATHS.NO_SHOW}?${stringify(params)}`, { ...defaultOpts })
  .then(({ noShow }) => noShow);
