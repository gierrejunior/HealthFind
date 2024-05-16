import { Config } from "jest";

const config: Config = {
    transform: {
        "^.+\\.(t|j)s?$": "@swc/jest",
    },
    moduleNameMapper: {
        "@app/shared/(.*)": "<rootDir>/libs/shared/src/$1",
        "@app/shared": "<rootDir>/libs/shared/src",
        "@apps/fieldscan/(.*)": "<rootDir>/apps/fieldscan/src/$1",
    },
    setupFilesAfterEnv: ["jest-extended/all"],
    coverageProvider: "v8",
    collectCoverageFrom: [
        "apps/fieldscan/src/**/*.ts",
        "libs/shared/src/**/*.ts",
        "!**/*.interface.ts",
        "!**/*.dto.ts",
        "!**/*.module.ts",
        "!**/prisma.repository.ts",
        "!**/*.enum.ts",
    ],
    clearMocks: true,
};

export default config;
