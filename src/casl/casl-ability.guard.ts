// src/casl/casl-ability.guard.ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { defineAbilitiesFor } from "./casl-ability.factory";

@Injectable()
export class CaslAbilityGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        const ability = defineAbilitiesFor(user);

        const requiredAbilities = this.reflector.get<[string, string][]>(
            "abilities",
            context.getHandler(),
        );

        if (!requiredAbilities) {
            return true;
        }

        const resource = request.params.id
            ? await this.findResource(context.getClass().name, request.params.id)
            : null;

        const hasAbilities = requiredAbilities.every(([action, subject]) => {
            if (resource && user.role !== "ADMIN" && resource.cityId !== user.cityId) {
                return false;
            }
            return ability.can(action, subject);
        });

        if (!hasAbilities) {
            throw new ForbiddenException("You do not have permission to perform this action.");
        }

        return true;
    }

    private async findResource(controllerName: string, id: string) {
        if (controllerName.includes("healthUnit")) {
            return await this.prisma.healthUnit.findUnique({
                where: { id },
                select: { cityId: true },
            });
        } else if (controllerName.includes("HealthTeam")) {
            return await this.prisma.healthTeam
                .findUnique({
                    where: { id },
                    select: { healthUnit: { select: { cityId: true } } },
                })
                .then((team) => ({ cityId: team?.healthUnit?.cityId }));
        } else if (controllerName.includes("healthUnitArea")) {
            return await this.prisma.healthUnitArea
                .findUnique({
                    where: { id },
                    select: { healthUnit: { select: { cityId: true } } },
                })
                .then((area) => ({ cityId: area?.healthUnit?.cityId }));
        } else if (controllerName.includes("healthTeamArea")) {
            return await this.prisma.healthTeamArea
                .findUnique({
                    where: { id },
                    select: {
                        healthTeam: { select: { healthUnit: { select: { cityId: true } } } },
                    },
                })
                .then((teamArea) => ({ cityId: teamArea?.healthTeam?.healthUnit?.cityId }));
        } else if (controllerName.includes("nurse")) {
            return await this.prisma.nurse
                .findUnique({
                    where: { id },
                    select: {
                        healthTeam: { select: { healthUnit: { select: { cityId: true } } } },
                    },
                })
                .then((nurse) => ({ cityId: nurse?.healthTeam?.healthUnit?.cityId }));
        } else if (controllerName.includes("doctor")) {
            return await this.prisma.doctor
                .findUnique({
                    where: { id },
                    select: {
                        healthTeam: { select: { healthUnit: { select: { cityId: true } } } },
                    },
                })
                .then((doctor) => ({ cityId: doctor?.healthTeam?.healthUnit?.cityId }));
        } else if (controllerName.includes("nursingTechnician")) {
            return await this.prisma.nursingTechnician
                .findUnique({
                    where: { id },
                    select: {
                        healthTeam: { select: { healthUnit: { select: { cityId: true } } } },
                    },
                })
                .then((technician) => ({ cityId: technician?.healthTeam?.healthUnit?.cityId }));
        } else if (controllerName.includes("dentist")) {
            return await this.prisma.dentist
                .findUnique({
                    where: { id },
                    select: {
                        healthTeam: { select: { healthUnit: { select: { cityId: true } } } },
                    },
                })
                .then((dentist) => ({ cityId: dentist?.healthTeam?.healthUnit?.cityId }));
        } else if (controllerName.includes("healthAgent")) {
            return await this.prisma.healthAgent
                .findUnique({
                    where: { id },
                    select: {
                        healthTeam: { select: { healthUnit: { select: { cityId: true } } } },
                    },
                })
                .then((agent) => ({ cityId: agent?.healthTeam?.healthUnit?.cityId }));
        } else if (controllerName.includes("microArea")) {
            return await this.prisma.microArea
                .findUnique({
                    where: { id },
                    select: {
                        healthAgent: {
                            select: {
                                healthTeam: {
                                    select: { healthUnit: { select: { cityId: true } } },
                                },
                            },
                        },
                    },
                })
                .then((microArea) => ({
                    cityId: microArea?.healthAgent?.healthTeam?.healthUnit?.cityId,
                }));
        }
        return null;
    }
}
