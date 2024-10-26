// src/casl/casl-ability.guard.ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "@prisma/client";
import { defineAbilitiesFor } from "./casl-ability.factory";

@Injectable()
export class CaslAbilityGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user; // Obtem o usuário da requisição

        const ability = defineAbilitiesFor(user); // Define as habilidades para o usuário
        const requiredAbilities = this.reflector.get<[string, string][]>('abilities', context.getHandler()); // Obtém as habilidades exigidas

        if (!requiredAbilities) {
            return true; // Se não houver habilidades exigidas, permite o acesso
        }

        // Verifica se o usuário tem as habilidades necessárias
        const hasAbilities = requiredAbilities.every(([action, subject]) => ability.can(action, subject));
        if (!hasAbilities) {
            throw new ForbiddenException("You do not have permission to perform this action."); // Lança exceção se não tiver permissão
        }

        return true; // Permite o acesso se todas as permissões forem validadas
    }
}
