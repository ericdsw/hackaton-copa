import urls from '../constants/urls';

const callApi = (path: string, options?: object) => 
  fetch(urls.API_CONTEXT_PATH + path, options)
    .then(response => response.json())

const defaultOpts = {
  headers: {
    'Accept': 'application/json',
  }
}

interface AirportResponse {
  airports: Array<Airport>;
}

interface Airport {
  code: string;
  name: string;
}

export const getAirports = () => callApi(urls.PATHS.AIRPORTS, { ...defaultOpts })
  .then(data => data as AirportResponse)
  .then(({ airports }) => airports);
