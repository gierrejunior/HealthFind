import { AbilityBuilder, PureAbility } from "@casl/ability";
import { Role, User } from "@prisma/client";

export function defineUserPermissions(
    user: User,
    can: AbilityBuilder<PureAbility>["can"],
    cannot: AbilityBuilder<PureAbility>["cannot"],
) {
    if (user.role === Role.ADMIN) {
        can("manage", "User"); // Admin pode tudo no User
    } else if (user.role === Role.STAFF) {
        // STAFF pode criar apenas usuários com o papel USER ou STAFF e na mesma cidade
        can("create", "User", { cityId: user.cityId, role: Role.USER });
        can("create", "User", { cityId: user.cityId, role: Role.STAFF });
        cannot("create", "User", { role: Role.ADMIN });

        // Permissões adicionais para STAFF
        can("read", "User", { cityId: user.cityId });
        can("delete", "User", { cityId: user.cityId, role: Role.USER });
        can("update", "User", { cityId: user.cityId, role: Role.USER });

        // STAFF pode mudar o role para STAFF, mas não pode mudar cityId
        can("update", "User", { cityId: user.cityId, role: Role.STAFF });
        cannot("update", "User", "cityId");
    } else {
        // Permissões para USER
        can("read", "User", { id: user.id });
        can("update", "User", { id: user.id });
    }
}
