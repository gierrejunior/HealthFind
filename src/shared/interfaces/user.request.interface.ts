import { FastifyRequest } from "fastify";

import { UserDTO } from "../dtos/user/user.dto";

export interface UserRequest extends FastifyRequest {
    userId: UserDTO["id"];
}
