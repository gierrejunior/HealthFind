import { AbilityBuilder, AbilityClass, PureAbility, Subject } from "@casl/ability";
import { prismaQuery } from "@casl/prisma";
import { Role, User } from "@prisma/client";

export type AppAbility = PureAbility<[string, Subject]>;

export function defineAbilitiesFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);

    // Permissões para ADMIN
    if (user.role === Role.ADMIN) {
        can("manage", "all"); // Admin pode tudo
    } else if (user.role === Role.STAFF) {
        // Permissões sobre usuários na mesma cidade
        can("read", "User", { cityId: user.cityId });
        can("create", "User", { cityId: user.cityId, role: Role.USER });
        can("delete", "User", { cityId: user.cityId, role: Role.USER });
        can("update", "User", { cityId: user.cityId, role: Role.USER });

        // STAFF pode mudar o role para STAFF, mas não pode mudar cityId
        can("update", "User", { cityId: user.cityId, role: Role.STAFF });
        cannot("update", "User", "cityId");

        // Permissões sobre HealthUnits e suas Areas na mesma cidade
        can("create", ["HealthUnit", "HealthUnitArea", "HealthTeamArea"], {
            cityId: user.cityId,
        });
        can("read", ["HealthUnit", "HealthUnitArea", "HealthTeamArea"], { cityId: user.cityId });
        can("update", ["HealthUnit", "HealthUnitArea", "HealthTeamArea"], {
            cityId: user.cityId,
            "createdBy.role": { $ne: Role.ADMIN },
        });
        can("delete", ["HealthUnit", "HealthUnitArea", "HealthTeamArea"], {
            cityId: user.cityId,
            "createdBy.role": { $ne: Role.ADMIN },
        });
    } else {
        // Permissões para USER
        can("read", "User", { id: user.id });
        can("update", "User", { id: user.id });

        can("create", ["HealthUnit", "HealthUnitArea", "HealthTeamArea"], {
            cityId: user.cityId,
        });
        can("read", ["HealthUnit", "HealthUnitArea", "HealthTeamArea"], { cityId: user.cityId });
        can("update", ["HealthUnit", "HealthUnitArea", "HealthTeamArea"], {
            cityId: user.cityId,
            createdById: user.id,
        });
        can("delete", ["HealthUnit", "HealthUnitArea", "HealthTeamArea"], {
            cityId: user.cityId,
            createdById: user.id,
        });
    }

    // Usa o `prismaQuery` como o matcher de condições
    return build({
        detectSubjectType: (item) =>
            item && typeof item === "object" && "constructor" in item
                ? (item as any).constructor
                : null,
        conditionsMatcher: prismaQuery, // Usa o matcher específico para Prisma
    });
}

// Define o CaslAbilityFactory para ser exportado
export class CaslAbilityFactory {
    createForUser(user: User) {
        return defineAbilitiesFor(user);
    }
}
