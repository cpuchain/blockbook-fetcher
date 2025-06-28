/** Iterate through blocks to see if our schema validator works */
import { Blockbook, sleep, Tx } from '../src/index.js';

async function main() {
    const blockbook = new Blockbook('https://ltc1.trezor.io');

    const latestBlock = (await blockbook.getStatus()).backend.blocks as number;
    await sleep(1000);

    /**
    const block = await blockbook.getBlock(latestBlock);

    for (const tx of block.txs as Tx[]) {
        try {
            await blockbook.getTransaction(tx.txid);
            console.log(tx.txid);
            await sleep(1000);
        } catch (error) {
            console.log(`tx ${tx.txid} failed`);
            console.log(error);
        }
    }
    **/

    for (let i = latestBlock - 100; i < latestBlock; ++i) {
        try {
            const block = await blockbook.getBlock(i);
            console.log(i);
            await sleep(1000);

            for (const tx of block.txs as Tx[]) {
                try {
                    await blockbook.getTransaction(tx.txid);
                    console.log(tx.txid);
                    await sleep(1000);
                } catch (error) {
                    console.log(`tx ${tx.txid} failed`);
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(`Block ${i} failed`);
            console.log(error);
        }
    }
}
main();
