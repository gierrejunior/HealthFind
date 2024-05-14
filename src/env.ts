import { z } from "zod";

export const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().int().optional().default(3333),
    JWT_PRIVATE_KEY: z.string().min(32),
    JWT_PUBLIC_KEY: z.string().min(32),
});

export type Env = z.infer<typeof envSchema>;
