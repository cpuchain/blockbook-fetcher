import { getRollupConfig } from '@cpuchain/rollup';

const config = [
    getRollupConfig({ input: './src/index.ts' }),
    getRollupConfig({
        input: './src/index.ts',
        browserName: 'blockbook',
        globals: {
            'Ajv': 'Ajv',
        },
        external: ['ajv'],
    }),
    getRollupConfig({
        input: './src/index.ts',
        browserName: 'blockbook',
        globals: {
            'Ajv': 'Ajv',
        },
        external: ['ajv'],
        minify: true,
    }),
]

export default config;