const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs"); // Importa o bcrypt para o hash
const prisma = new PrismaClient();

async function main() {
    // Função para hash de senha com 8 rounds
    const hashPassword = async (password) => await bcrypt.hash(password, 8);

    // Cria usuários com senha hasheada
    const user1 = await prisma.user.create({
        data: {
            username: "johndoe",
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            password: await hashPassword("password123"), // Aplica hash
            role: "USER",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: "janedoe",
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@example.com",
            password: await hashPassword("password456"), // Aplica hash
            role: "ADMIN",
        },
    });

    // Cria Unidades de Saúde
    const healthUnit1 = await prisma.healthUnit.create({
        data: {
            unitType: "UBS",
            title: "Health Unit 1",
            description: "Main Health Unit",
            cnes: "1234567",
            address: "123 Health St",
            cep: "12345-678",
            phone: "(11) 1234-5678",
            city: "City1",
            state: "State1",
            manager: "Manager 1",
            email: "healthunit1@example.com",
            latitude: 12.345678,
            longitude: -54.321098,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    const healthUnit2 = await prisma.healthUnit.create({
        data: {
            unitType: "USF",
            title: "Health Unit 2",
            description: "Secondary Health Unit",
            cnes: "7654321",
            address: "456 Health Ave",
            cep: "87654-321",
            phone: "(11) 8765-4321",
            city: "City2",
            state: "State2",
            manager: "Manager 2",
            email: "healthunit2@example.com",
            latitude: 23.456789,
            longitude: -65.432198,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria equipes de Saúde
    const healthTeam1 = await prisma.healthTeam.create({
        data: {
            title: "Team 1",
            description: "Primary Health Team",
            healthUnitId: healthUnit1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Área de Equipe de Saúde
    const healthTeamArea1 = await prisma.healthTeamArea.create({
        data: {
            title: "Team Area 1",
            geojson: JSON.stringify({
                type: "Polygon",
                coordinates: [
                    [
                        [12.1, 54.1],
                        [12.2, 54.2],
                        [12.3, 54.3],
                    ],
                ],
            }),
            healthTeamId: healthTeam1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria áreas de Unidades de Saúde
    const healthUnitArea1 = await prisma.healthUnitArea.create({
        data: {
            title: "Area 1",
            geojson: JSON.stringify({
                type: "Polygon",
                coordinates: [
                    [
                        [12.3, 54.3],
                        [12.4, 54.4],
                        [12.5, 54.5],
                    ],
                ],
            }),
            healthUnitId: healthUnit1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Enfermeiros
    const nurse1 = await prisma.nurse.create({
        data: {
            firstName: "NurseFirst1",
            lastName: "NurseLast1",
            coren: "COREN123",
            healthTeamId: healthTeam1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Médicos
    const doctor1 = await prisma.doctor.create({
        data: {
            firstName: "DoctorFirst1",
            lastName: "DoctorLast1",
            crm: "CRM12345",
            specialty: "Pediatrics",
            healthTeamId: healthTeam1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Técnicos de Enfermagem
    const nursingTechnician1 = await prisma.nursingTechnician.create({
        data: {
            name: "NursingTechnician1",
            coren: "COREN678",
            healthTeamId: healthTeam1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Dentistas
    const dentist1 = await prisma.dentist.create({
        data: {
            firstName: "DentistFirst1",
            lastName: "DentistLast1",
            cro: "CRO123",
            healthTeamId: healthTeam1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Agentes de Saúde
    const healthAgent1 = await prisma.healthAgent.create({
        data: {
            firstName: "AgentFirst1",
            lastName: "AgentLast1",
            phone: "(11) 91234-5678",
            healthTeamId: healthTeam1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Microáreas
    const microArea1 = await prisma.microArea.create({
        data: {
            title: "MicroArea 1",
            number_micro_area: 101,
            geojson: JSON.stringify({
                type: "Polygon",
                coordinates: [
                    [
                        [12.6, 54.6],
                        [12.7, 54.7],
                        [12.8, 54.8],
                    ],
                ],
            }),
            healthAgentId: healthAgent1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    console.log("Banco de dados populado com dados de teste!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
