import { Body, Controller, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { AuthenticateService } from "src/auth/services/login/authenticate.service";
import { LoginDTO, loginDTO } from "src/shared/dtos/user/user.dto";
import { BaseResponse } from "src/shared/interfaces/response.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";

@Controller("/sessions")
export class AuthenticateController {
    constructor(private authenticateService: AuthenticateService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(loginDTO))
    async handle(@Body() body: LoginDTO): Promise<BaseResponse<object>> {
        const accessToken = await this.authenticateService.execute(body);

        return {
            data: accessToken,
            meta: null,
            message: "auth.login.success",
            status: HttpStatus.OK,
        };
    }
}
