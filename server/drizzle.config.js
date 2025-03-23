import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export default defineConfig({
  out: "./drizzle",
  schema: "./dist/db/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
});
