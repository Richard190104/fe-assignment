import { baseEslintConfig } from "@riesenia/fe-configs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
    {
        ignores: ["node_modules/", "dist/"],
    },

    ...baseEslintConfig.map((config) => {
        if (config.languageOptions?.parserOptions?.tsconfigRootDir) {
            return {
                ...config,
                languageOptions: {
                    ...config.languageOptions,
                    parserOptions: {
                        ...config.languageOptions.parserOptions,
                        tsconfigRootDir: __dirname,
                    },
                },
            };
        }
        return config;
    }),
];
