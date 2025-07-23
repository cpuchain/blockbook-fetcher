import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        watch: false,
        //fileParallelism: false,
        testTimeout: 50000,
        include: ['test/**/*.ts'],
        coverage: {
            enabled: true,
            include: [
                'src/**/*.ts',
            ],
            exclude: [
                'src/ajv.ts',
                'src/blockbook-api.ts',
                'src/blockbook-schemas.ts',
            ],
            reporter: [
                "text",
                "json-summary",
                "html"
            ],
            reportsDirectory: './coverage',
        },
    },
});