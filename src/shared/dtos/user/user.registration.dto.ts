import { z } from "zod";

import userCityIdDTO from "./attrs/user.cityId.dto";
import userEmailDTO from "./attrs/user.email.dto";
import userFirstNameDTO from "./attrs/user.firstName.dto";
import userLastNameDTO from "./attrs/user.lastName.dto";
import userPasswordDTO from "./attrs/user.password.dto";
import { userRoleDTO } from "./attrs/user.role.dto"; // userRoleDTO deve ser uma enumeração de Zod
import userUsernameDTO from "./attrs/user.username.dto";

// Schema para registro de usuário, incluindo cidade opcional e função opcional
export const UserRegistrationSchema = z.object({
    username: userUsernameDTO,
    firstName: userFirstNameDTO,
    lastName: userLastNameDTO,
    email: userEmailDTO,
    password: userPasswordDTO,
    role: userRoleDTO.nullable(),
    cityId: userCityIdDTO.nullable(),
});

export type UserRegistrationDTO = z.infer<typeof UserRegistrationSchema>;
