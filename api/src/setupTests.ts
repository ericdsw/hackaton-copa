import dotenv from 'dotenv';

const { error } = dotenv.config({ path: '.env.test' });

if (error) {
  throw error;
}
