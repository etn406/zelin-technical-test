import { z } from 'zod';
// @ts-ignore: because the file will be generated on build/serve
import unsafeEnv from '../.env.generated.json';

const envSchema = z.object({
  SERVER_URL: z.string(),
  CLIENT_URL: z.string(),
});

const env = envSchema.parse(unsafeEnv);

export const environment = {
  serverURL: env.SERVER_URL,
  clientURL: env.CLIENT_URL,
};
