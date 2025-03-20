// This file is used to verify & format the environment variables that are used in the application.
// It will throw an Error if any of the required environment variables are not correctly defined.

if (
  process.env.NODE_ENV !== "development" &&
  process.env.NODE_ENV !== "production"
) {
  throw new Error(
    "NODE_ENV environment variable should be defined to either 'development' or 'production'"
  );
}

if (!process.env.SERVER_PORT) {
  throw new Error("SERVER_PORT is not defined in the environment variables");
}

if (!process.env.DB_HOST) {
  throw new Error("DB_HOST is not defined in the environment variables");
}

if (!process.env.DB_PORT) {
  throw new Error("DB_PORT is not defined in the environment variables");
}

if (!process.env.DB_USER) {
  throw new Error("DB_USER is not defined in the environment variables");
}

if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD is not defined in the environment variables");
}

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME is not defined in the environment variables");
}

export const NODE_ENV: "development" | "production" = process.env.NODE_ENV;
export const SERVER_PORT: number = parseInt(process.env.SERVER_PORT, 10);

export const DB_HOST: string = process.env.DB_HOST;
export const DB_PORT: number = parseInt(process.env.DB_PORT, 10);
export const DB_USER: string = process.env.DB_USER;
export const DB_PASSWORD: string = process.env.DB_PASSWORD;
export const DB_NAME: string = process.env.DB_NAME;
