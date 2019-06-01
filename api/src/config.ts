export default Object.freeze({
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8000,
  IATA_API_KEY: process.env.IATA_CODES_API_KEY,
});
