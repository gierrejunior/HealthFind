// src/casl/casl-ability.factory.ts
import { AbilityBuilder, AbilityClass, PureAbility, Subject } from "@casl/ability";
import { Role, User } from "@prisma/client";

export type AppAbility = PureAbility<[string, Subject]>;

export function defineAbilitiesFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);

    // Permissões para ADMIN
    if (user.role === Role.ADMIN) {
        can('manage', 'all'); // Admin pode tudo

    // Permissões para STAFF
    } else if (user.role === Role.STAFF) {
        // Permissões sobre usuários
        can('read', 'User');
        can('create', 'User', { role: Role.USER });
        can('delete', 'User', { role: Role.USER });
        can('update', 'User', { role: Role.USER });
        cannot('update', 'User', 'role'); // STAFF não pode alterar roles
        
        // Permissões sobre HealthUnits
        can('create', 'HealthUnit');
        can('read', 'HealthUnit');
        can('update', 'HealthUnit', { 'createdBy.role': { $ne: Role.ADMIN } }); // STAFF pode editar HealthUnits de USER e STAFF, mas não de ADMIN
        can('delete', 'HealthUnit', { 'createdBy.role': { $ne: Role.ADMIN } }); // STAFF pode deletar HealthUnits de USER e STAFF, mas não de ADMIN

    // Permissões para USER
    } else {
        // Permissões sobre sua própria conta
        can('read', 'User', { id: user.id });
        can('update', 'User', { id: user.id });
        
        // Permissões sobre HealthUnits
        can('create', 'HealthUnit'); // USER pode criar HealthUnits
        can('read', 'HealthUnit'); // USER pode ler todas as HealthUnits
        can('update', 'HealthUnit', { createdById: user.id }); // USER pode editar apenas as HealthUnits que ele criou
        can('delete', 'HealthUnit', { createdById: user.id }); // USER pode deletar apenas as HealthUnits que ele criou
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
