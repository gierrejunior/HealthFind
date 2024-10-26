// src/casl/casl-ability.factory.ts
import { AbilityBuilder, AbilityClass, PureAbility, Subject } from "@casl/ability";
import { Role, User } from "@prisma/client";

export type AppAbility = PureAbility<[string, Subject]>;

export function defineAbilitiesFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);

    if (user.role === Role.ADMIN) {
        can('manage', 'all'); // Admin pode tudo
    } else if (user.role === Role.STAFF) {
        can('read', 'User');
        can('create', 'User', { role: Role.USER }); // STAFF pode criar usuários como USER
        can('delete', 'User', { role: Role.USER }); // STAFF pode deletar usuários com role USER
        can('update', 'User', { role: Role.USER }); // STAFF pode editar usuários com role USER
        cannot('update', 'User', 'role'); // STAFF não pode alterar roles
    } else {
        can('read', 'User', { id: user.id }); // USER só pode ler sua própria conta
        can('update', 'User', { id: user.id }); // USER só pode atualizar sua própria conta
    }

    return build({
        detectSubjectType: (item) =>
            item && typeof item === 'object' && 'constructor' in item
                ? (item as any).constructor
                : null,
    });
}

// Define o CaslAbilityFactory para ser exportado
export class CaslAbilityFactory {
    createForUser(user: User) {
        return defineAbilitiesFor(user);
    }
}
