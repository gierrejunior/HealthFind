import { z } from "zod";

// Define o schema para validar o campo de role
export const userRoleDTO = z.enum(["USER", "STAFF", "ADMIN"], {
    required_error: "user.role.required",
    invalid_type_error: "user.role.invalidType",
});

export type UserRoleDTO = z.infer<typeof userRoleDTO>;
