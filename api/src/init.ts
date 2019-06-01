import dotenv from 'dotenv';

export default () => {
  const { error } = dotenv.config();

  if (error) {
    throw new Error(`Could not parse \`.env\` file: ${error.message}`);
  }

  const unsetEnvVariables = [
    'IATA_CODES_API_KEY',
  ].reduce((unsetEnvVariables: Array<string>, envVariable: string) => {
    !process.env[envVariable] && unsetEnvVariables.push(envVariable)
    return unsetEnvVariables;
  }, []);

  if (unsetEnvVariables.length) {
    throw new Error(`Init error. Missing environment variables: ${
      unsetEnvVariables.join(', ')
    }`);
  }
}
