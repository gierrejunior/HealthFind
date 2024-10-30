// src/shared/dtos/user/user.update.dto.ts
import { z } from "zod";

export const UserUpdateSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    // Adicione a linha abaixo se o STAFF puder atualizar o role
    role: z.enum(["USER", "STAFF", "ADMIN"]).optional(),
});

export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
