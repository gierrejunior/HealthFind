import { z } from "zod";

import userCityIdDTO from "./attrs/user.cityId.dto"; // Importa DTO para cityId
import userEmailDTO from "./attrs/user.email.dto";
import userFirstNameDTO from "./attrs/user.firstName.dto";
import userLastNameDTO from "./attrs/user.lastName.dto";
import userUsernameDTO from "./attrs/user.username.dto";


// DTO para login
export const loginDTO = z.object({
    login: z.string(),
    password: z.string(),
});

export type LoginDTO = z.infer<typeof loginDTO>;

// DTO para resposta de login
export const LoginResponseSchema = z.object({
    accessToken: z.string({
        invalid_type_error: "token.accessToken.invalidType",
    }),
});

export type LoginResponseDTO = z.infer<typeof LoginResponseSchema>;

// DTO para informações de um usuário existente
export const UserSchema = z.object({
    id: z.string().uuid(),
    username: userUsernameDTO,
    firstName: userFirstNameDTO,
    lastName: userLastNameDTO,
    email: userEmailDTO,
    isActive: z.boolean(),
    role: z.enum(["USER", "STAFF", "ADMIN"]),
    lastLogin: z.date().nullable(), // Permite null
    createdAt: z.date(),
    updatedAt: z.date().nullable(), // Permite null
    cityId: userCityIdDTO.nullable(), 
});

export type UserDTO = z.infer<typeof UserSchema>;
