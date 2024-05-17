module.exports = {
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": [
            "ts-jest",
            {
                tsconfig: {
                    target: "es5",
                    module: "commonjs",
                    // ... outras opções do tsconfig que você deseja incluir
                },
            },
        ],
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    setupFilesAfterEnv: ["jest-extended/all"],
};
