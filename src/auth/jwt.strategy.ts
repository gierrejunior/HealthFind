import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenDTO, TokenSchema } from "src/shared/dtos/auth/token.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService<WindowEventHandlers, true>) {
        const publicKey = config.get<string>("JWT_PUBLIC_KEY", { infer: true });

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(publicKey, "base64"),
            algorithms: ["RS256"],
        });
    }

    async validate(payload: TokenDTO) {
        return TokenSchema.parse(payload);
    }
}
