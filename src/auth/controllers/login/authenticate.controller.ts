import { Body, Controller, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { AuthenticateService } from "src/auth/services/login/authenticate.service";
import { LoginDTO, loginDTO } from "src/shared/dtos/user/user.dto";
import { BaseResponse } from "src/shared/interfaces/response.interface";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation-pipe";

@Controller("/login")
export class AuthenticateController {
    constructor(private authenticateService: AuthenticateService) {}

    @Post()
    @UsePipes(new ZodValidationPipe(loginDTO))
    async handle(@Body() body: LoginDTO): Promise<BaseResponse<object>> {
        const accessToken = await this.authenticateService.execute(body);

        return {
            data: {
                accessToken: accessToken.accessToken,
                restrictedAccess: accessToken.restrictedAccess, // Adiciona o estado de acesso restrito na resposta
            },
            meta: null,
            message: "auth.login.success",
            status: HttpStatus.OK,
        };
    }
}
