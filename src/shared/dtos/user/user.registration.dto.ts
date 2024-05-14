import { z } from "zod";

import userEmailDTO from "./attrs/user.email.dto";
import userFirstNameDTO from "./attrs/user.firstName.dto";
import userLastNameDTO from "./attrs/user.lastName.dto";
import userPasswordDTO from "./attrs/user.password.dto";
import userUsernameDTO from "./attrs/user.username.dto";

export const UserRegistrationSchema = z.object({
    username: userUsernameDTO,
    firstName: userFirstNameDTO,
    lastName: userLastNameDTO,
    email: userEmailDTO,
    password: userPasswordDTO,
});

export type UserRegistrationDTO = z.infer<typeof UserRegistrationSchema>;
