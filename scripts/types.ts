/** Update type definition from trezor/blockbook repository */
import { writeFile } from 'fs/promises';

const BLOCKBOOK_FILE =
    'https://raw.githubusercontent.com/trezor/blockbook/refs/heads/master/blockbook-api.ts';

async function main() {
    const resp = await fetch(BLOCKBOOK_FILE);

    if (!resp.ok) {
        throw new Error(resp.statusText);
    }

    await writeFile('./src/blockbook-api.ts', '/* eslint-disable */\n' + (await resp.text()));

    console.log('Wrote ./src/blockbook-api.ts');
}
main();
