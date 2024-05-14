import { z } from "zod";

export const TokenSchema = z.object({
    sub: z.string({
        invalid_type_error: "token.sub.invalidType",
    }),
});

export type TokenDTO = z.infer<typeof TokenSchema>;
