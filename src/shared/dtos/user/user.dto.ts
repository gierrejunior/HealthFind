import { z } from "zod";

import userEmailDTO from "./attrs/user.email.dto";
import userFirstNameDTO from "./attrs/user.firstName.dto";
import userLastNameDTO from "./attrs/user.lastName.dto";
import userPasswordDTO from "./attrs/user.password.dto";
import userUsernameDTO from "./attrs/user.username.dto";

export const newUserDTO = z.object({
    username: userUsernameDTO,
    firstName: userFirstNameDTO,
    lastName: userLastNameDTO,
    email: userEmailDTO,
    password: userPasswordDTO,
});

export type NewUserDTO = z.infer<typeof newUserDTO>;

export const loginDTO = z.object({
    login: z.string(),
    password: z.string(),
});

export type LoginDTO = z.infer<typeof loginDTO>;

export const LoginResponseSchema = z.object({
    accessToken: z.string({
        invalid_type_error: "token.accessToken.invalidType",
    }),
});

export type LoginResponseDTO = z.infer<typeof LoginResponseSchema>;

export const UserSchema = z.object({
    id: z.string(),
    username: userUsernameDTO,
    firstName: userFirstNameDTO,
    lastName: userLastNameDTO,
    email: userEmailDTO,
    isActive: z.boolean(),
    role: z.enum(["USER", "STAFF", "ADMIN"]),
    lastLogin: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type UserDTO = z.infer<typeof UserSchema>;
