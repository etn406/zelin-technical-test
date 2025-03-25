import { z } from 'zod';
// @ts-ignore: because the file will be generated on build/serve
import unsafeEnv from '../.env.generated.json';

const envSchema = z.object({
  SERVER_URL: z.string(),
  CLIENT_URL: z.string(),
});

const env = envSchema.parse(unsafeEnv);

if (!env.SERVER_URL) {
  throw new Error("Env var SERVER_URL isn't defined");
}

if (!env.CLIENT_URL) {
  throw new Error("Env var CLIENT_URL isn't defined");
}

export const environment = {
  serverURL: env.SERVER_URL,
  clientURL: env.CLIENT_URL,
};
