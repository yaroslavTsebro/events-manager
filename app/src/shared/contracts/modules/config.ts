export interface IEnvVariables {
  PORT: number;
  HOST: string;
  NODE_ENV: string;

  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;

  ACCESS_TOKEN_EXPIRATION: number;
  REFRESH_TOKEN_EXPIRATION: number;

  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_SECRET: string;
}