const actualUrls = require.requireActual('../urls');

export default Object.freeze({
  ...actualUrls.default,
  API_CONTEXT_PATH: `http://localhost:12000/api`,
});
