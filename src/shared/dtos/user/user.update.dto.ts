// src/shared/dtos/user/user.update.dto.ts
import { z } from "zod";
import userCityIdDTO from "./attrs/user.cityId.dto"; // Certifique-se de ter o schema DTO para o cityId

export const UserUpdateSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.enum(["USER", "STAFF", "ADMIN"]).optional(),
    cityId: userCityIdDTO.optional(),
});

export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
