import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            ...importPlugin.configs.typescript.rules,
            ...prettierConfig.rules,
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "prettier/prettier": [
                "error",
                {
                    printWidth: 100,
                    tabWidth: 4,
                    singleQuote: false,
                    trailingComma: "all",
                    arrowParens: "always",
                    semi: true,
                    endOfLine: "auto", // Garante uma linha final ao estilo LF
                },
            ],
            "eol-last": ["error", "always"], // Garante uma linha em branco no final do arquivo
        },
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json",
                },
            },
        },
        ignores: ["node_modules/", "dist/"],
    },
];
