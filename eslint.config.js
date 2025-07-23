import tseslint from 'typescript-eslint';
import { getConfig } from '@cpuchain/eslint';

const config = getConfig(true);

if (config[1]?.rules?.['prettier/prettier']?.[1]?.printWidth) {
    config[1].rules['prettier/prettier'][1] = {
        tabWidth: 4,
        printWidth: 100,
        singleQuote: true,
    }
}

export default tseslint.config(config);
