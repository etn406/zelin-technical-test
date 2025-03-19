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

export const NODE_ENV: "development" | "production" = process.env.NODE_ENV;
export const SERVER_PORT: number = parseInt(process.env.SERVER_PORT, 10);
