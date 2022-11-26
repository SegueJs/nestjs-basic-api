import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      user: process.env.POSTGRES_USER,
      port: process.env.POSTGRES_PORT,
      password: process.env.POSTGRES_PASSWORD,
      db: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
  };
});
