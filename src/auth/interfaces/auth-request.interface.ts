// src/auth/interfaces/auth-request.interface.ts
import { Request } from "express";
import { UserDTO } from "src/shared/dtos/user/user.dto";

export interface AuthRequest extends Request {
    user: UserDTO;
}
