const { PrismaClient, Prisma } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
    const hashPassword = async (password) => await bcrypt.hash(password, 8);

    // Cria ou atualiza usuários com senha hasheada usando upsert
    const user1 = await prisma.user.upsert({
        where: { email: "johndoe@example.com" },
        update: {},
        create: {
            username: "admin",
            firstName: "admin",
            lastName: "Doe",
            email: "admin@example.com",
            password: await hashPassword("admin123"),
            role: "ADMIN",
        },
    });

    const city1 = await prisma.city.create({
        data: {
            city: "Ananindeua",
            uf: "PA",
            geojson: {
                type: "Polygon",
                coordinates: [
                    [
                        [-48.3342281665, -1.2394782444],
                        [-48.3353629543, -1.2499928552],
                        [-48.3529731874, -1.2637472147],
                        [-48.3387222368, -1.2675769075],
                        [-48.3413609515, -1.2730552646],
                        [-48.3516107772, -1.2786935429],
                        [-48.3407183859, -1.2914586616],
                        [-48.3493896038, -1.2953739084],
                        [-48.3458940695, -1.3035214898],
                        [-48.3527269794, -1.3097727035],
                        [-48.3482812215, -1.3168363407],
                        [-48.3396192355, -1.3286779339],
                        [-48.343919564, -1.3459596681],
                        [-48.3620005284, -1.3602590706],
                        [-48.3663212751, -1.3681566557],
                        [-48.362378302, -1.378880545],
                        [-48.3629574141, -1.3979840172],
                        [-48.3631654366, -1.4064083434],
                        [-48.3404222017, -1.4079299373],
                        [-48.3326423556, -1.4189739038],
                        [-48.3325174735, -1.4306925366],
                        [-48.3394204795, -1.4387038084],
                        [-48.3487127266, -1.439122856],
                        [-48.3450378861, -1.4509058246],
                        [-48.3498897324, -1.4565508179],
                        [-48.3623938264, -1.4619352567],
                        [-48.3847528945, -1.4651891142],
                        [-48.3995880327, -1.4644513679],
                        [-48.3985753661, -1.4557409858],
                        [-48.3998909208, -1.4510136582],
                        [-48.3841933447, -1.4440616844],
                        [-48.3784450817, -1.4279013665],
                        [-48.3716955464, -1.4246700481],
                        [-48.3733933304, -1.4029482676],
                        [-48.3833357352, -1.4087403701],
                        [-48.3893605833, -1.4065588523],
                        [-48.3939723147, -1.3906205381],
                        [-48.3978060006, -1.3919896056],
                        [-48.397474685, -1.3994501018],
                        [-48.4099981439, -1.4070224734],
                        [-48.4102212365, -1.3933061875],
                        [-48.4241989192, -1.4064534564],
                        [-48.4246126887, -1.3983267606],
                        [-48.4298914764, -1.4041718552],
                        [-48.4296140743, -1.3888427698],
                        [-48.4351330807, -1.38464606],
                        [-48.4212759175, -1.3693356406],
                        [-48.434745031, -1.3456297843],
                        [-48.4397476386, -1.3439049185],
                        [-48.4341912627, -1.3413881921],
                        [-48.4286678991, -1.3286196398],
                        [-48.4254779197, -1.3154164002],
                        [-48.4223380338, -1.3135570242],
                        [-48.4236729549, -1.3031551463],
                        [-48.4279717395, -1.284201765],
                        [-48.4130940556, -1.2657747479],
                        [-48.4112497536, -1.2597241949],
                        [-48.3978374865, -1.2500001744],
                        [-48.4068364945, -1.2306764385],
                        [-48.4055675954, -1.2260295317],
                        [-48.390674348, -1.225315205],
                        [-48.3808600498, -1.2388919391],
                        [-48.373970453, -1.2430010888],
                        [-48.3650857045, -1.2294733515],
                        [-48.3526147719, -1.2206714036],
                        [-48.3484750555, -1.2323180593],
                        [-48.3342281665, -1.2394782444],
                    ],
                ],
            },
        },
    });

    const city2 = await prisma.city.create({
        data: {
            city: "Belem",
            uf: "PA",
            geojson: {
                type: "Polygon",
                coordinates: [
                    [
                        [-48.3526147719, -1.2206714036],
                        [-48.3650857045, -1.2294733515],
                        [-48.373970453, -1.2430010888],
                        [-48.3808600498, -1.2388919391],
                        [-48.390674348, -1.225315205],
                        [-48.4055675954, -1.2260295317],
                        [-48.4068364945, -1.2306764385],
                        [-48.3978374865, -1.2500001744],
                        [-48.4112497536, -1.2597241949],
                        [-48.4130940556, -1.2657747479],
                        [-48.4279717395, -1.284201765],
                        [-48.4236729549, -1.3031551463],
                        [-48.4223380338, -1.3135570242],
                        [-48.4254779197, -1.3154164002],
                        [-48.4286678991, -1.3286196398],
                        [-48.4341912627, -1.3413881921],
                        [-48.4397476386, -1.3439049185],
                        [-48.434745031, -1.3456297843],
                        [-48.4212759175, -1.3693356406],
                        [-48.4351330807, -1.38464606],
                        [-48.4296140743, -1.3888427698],
                        [-48.4298914764, -1.4041718552],
                        [-48.4246126887, -1.3983267606],
                        [-48.4241989192, -1.4064534564],
                        [-48.4102212365, -1.3933061875],
                        [-48.4099981439, -1.4070224734],
                        [-48.397474685, -1.3994501018],
                        [-48.3978060006, -1.3919896056],
                        [-48.3939723147, -1.3906205381],
                        [-48.3893605833, -1.4065588523],
                        [-48.3833357352, -1.4087403701],
                        [-48.3733933304, -1.4029482676],
                        [-48.3716955464, -1.4246700481],
                        [-48.3784450817, -1.4279013665],
                        [-48.3841933447, -1.4440616844],
                        [-48.3998909208, -1.4510136582],
                        [-48.3985753661, -1.4557409858],
                        [-48.3995880327, -1.4644513679],
                        [-48.3847528945, -1.4651891142],
                        [-48.3623938264, -1.4619352567],
                        [-48.3498897324, -1.4565508179],
                        [-48.3450378861, -1.4509058246],
                        [-48.3433200607, -1.4554660744],
                        [-48.3315315194, -1.4625315046],
                        [-48.3313217989, -1.4665896677],
                        [-48.3340495899, -1.4706525963],
                        [-48.3545602735, -1.4703221503],
                        [-48.3626635538, -1.475816336],
                        [-48.3724486538, -1.4896002834],
                        [-48.3877795046, -1.4936652215],
                        [-48.402918683, -1.5052415314],
                        [-48.4164697983, -1.5098594415],
                        [-48.4349429437, -1.5098150652],
                        [-48.4532229197, -1.5199719901],
                        [-48.4640547003, -1.5221961565],
                        [-48.4780567046, -1.5174342723],
                        [-48.4961657407, -1.5028785984],
                        [-48.4993339682, -1.5044349178],
                        [-48.4999202368, -1.5178231281],
                        [-48.505837933, -1.52622805],
                        [-48.5091101216, -1.5257683132],
                        [-48.5106399611, -1.5181825826],
                        [-48.5087783339, -1.4933493307],
                        [-48.5129718498, -1.4826077111],
                        [-48.5177553903, -1.4682458117],
                        [-48.5156783901, -1.4424162677],
                        [-48.5108602723, -1.4201191117],
                        [-48.5117248554, -1.4082366198],
                        [-48.5148043274, -1.3939755071],
                        [-48.5226809655, -1.38164549],
                        [-48.5452097509, -1.3527856086],
                        [-48.5537481503, -1.3135322865],
                        [-48.5677967705, -1.2922899116],
                        [-48.5945652787, -1.2548455868],
                        [-48.6114498926, -1.2245267456],
                        [-48.6239768259, -1.1918124829],
                        [-48.6070877574, -1.1717547007],
                        [-48.5971243609, -1.1618551787],
                        [-48.5861950126, -1.1509952675],
                        [-48.5475601483, -1.1109579933],
                        [-48.513463602, -1.0664018365],
                        [-48.4999458661, -1.048752838],
                        [-48.4926420228, -1.0380728442],
                        [-48.4690534244, -1.0190736724],
                        [-48.323334695, -1.059306269],
                        [-48.3154761394, -1.0819821071],
                        [-48.3013875525, -1.1059978768],
                        [-48.2958628346, -1.1241242649],
                        [-48.2987461045, -1.1437914095],
                        [-48.301810629, -1.1561007466],
                        [-48.3220384471, -1.1810825446],
                        [-48.3338022002, -1.1970678511],
                        [-48.3444701144, -1.2049491911],
                        [-48.3526147719, -1.2206714036],
                    ],
                ],
            },
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: "janedoe@example.com" },
        update: {},
        create: {
            username: "staffcity1",
            firstName: "staffcity1",
            lastName: "Doe",
            email: "staffcity1@example.com",
            password: await hashPassword("staffcity1"),
            role: "STAFF",
            cityId: city1.id,
        },
    });

    const user3 = await prisma.user.upsert({
        where: { email: "janedoe@example.com" },
        update: {},
        create: {
            username: "staffcity2",
            firstName: "staffcity2",
            lastName: "Doe2",
            email: "staffcity2@example.com",
            password: await hashPassword("staffcity2"),
            role: "STAFF",
            cityId: city2.id,
        },
    });

    const userCity1 = await prisma.user.create({
        data: {
            username: "usercity1",
            firstName: "User",
            lastName: "City1",
            email: "usercity1@example.com",
            password: await hashPassword("usercity1"),
            role: "USER",
            cityId: city1.id,
        },
    });

    const userCity2 = await prisma.user.create({
        data: {
            username: "usercity2",
            firstName: "User",
            lastName: "City2",
            email: "usercity2@example.com",
            password: await hashPassword("usercity2"),
            role: "USER",
            cityId: city2.id,
        },
    });

    // Cria uma Unidade de Saúde
    const healthUnit1 = await prisma.healthUnit.create({
        data: {
            unitType: "UBS",
            title: "Main Health Unit",
            description: "Primary healthcare center",
            cnes: "1234567",
            address: "123 Health St",
            cep: "12345-678",
            phone: "(11) 1234-5678",
            cityId: city1.id,
            manager: "Manager 1",
            email: "healthunit1@example.com",
            latitude: new Prisma.Decimal(12.345678),
            longitude: new Prisma.Decimal(-54.321098),
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria equipe de Saúde associada à unidade
    const healthTeam1 = await prisma.healthTeam.create({
        data: {
            title: "Team 1",
            description: "Primary Health Team",
            healthUnitId: healthUnit1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Criação do Agente de Saúde (ACS)
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

    // Criação de múltiplas microáreas associadas ao mesmo ACS
    const microArea1 = await prisma.microArea.create({
        data: {
            title: "MicroArea 1",
            number_micro_area: 101,
            geojson: JSON.stringify({
                type: "Polygon",
                coordinates: [
                    [
                        [12.6, 54.6],
                        [12.6, 54.7],
                        [12.7, 54.7],
                        [12.7, 54.6],
                        [12.6, 54.6],
                    ],
                ],
            }),
            healthAgentId: healthAgent1.id, // Relaciona com o ACS
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    const microArea2 = await prisma.microArea.create({
        data: {
            title: "MicroArea 2",
            number_micro_area: 102,
            geojson: JSON.stringify({
                type: "Polygon",
                coordinates: [
                    [
                        [12.7, 54.6],
                        [12.7, 54.7],
                        [12.8, 54.7],
                        [12.8, 54.6],
                        [12.7, 54.6],
                    ],
                ],
            }),
            healthAgentId: healthAgent1.id, // Relaciona com o mesmo ACS
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Área da Equipe como união das microáreas do agente
    const healthTeamArea1 = await prisma.healthTeamArea.create({
        data: {
            title: "Team Area 1",
            geojson: JSON.stringify({
                type: "Polygon",
                coordinates: [
                    [
                        [12.6, 54.6],
                        [12.6, 54.7],
                        [12.8, 54.7],
                        [12.8, 54.6],
                        [12.6, 54.6],
                    ],
                ],
            }),
            healthTeamId: healthTeam1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria Área da Unidade como união das áreas das equipes
    const healthUnitArea1 = await prisma.healthUnitArea.create({
        data: {
            title: "Unit Area 1",
            geojson: JSON.stringify({
                type: "Polygon",
                coordinates: [
                    [
                        [12.6, 54.6],
                        [12.6, 54.8],
                        [12.9, 54.8],
                        [12.9, 54.6],
                        [12.6, 54.6],
                    ],
                ],
            }),
            healthUnitId: healthUnit1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

    // Cria outros profissionais de saúde associados à equipe
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

    const nursingTechnician1 = await prisma.nursingTechnician.create({
        data: {
            name: "NursingTechnician1",
            coren: "COREN678",
            healthTeamId: healthTeam1.id,
            createdById: user1.id,
            updatedById: user2.id,
        },
    });

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
