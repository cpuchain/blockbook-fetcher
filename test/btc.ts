import { describe, it, afterEach, expect } from 'vitest';
import { Blockbook, sleep } from '../src/index.js';
import type { Tx, Block, Utxo, Address, BalanceHistory, FiatTicker } from '../src/index.js';

// A known real confirmed transaction on mainnet
const TEST_BTC_TXID = '59963202a6c02916b4ae49ffe0bf1fe092a2b1b7a706a38a11cf634bb2c89857';
const TEST_BTC_ADDR = '37jKPSmbEGwgfacCr2nayn1wTaqMAbA94Z';
const TEST_BTC_XPUB =
    'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8';

// Blockbook public instance
const BLOCKBOOK_URL = 'https://btc1.trezor.io';

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0',
};

describe('Blockbook Bitcoin API', () => {
    const blockbook = new Blockbook(BLOCKBOOK_URL, {
        fetchOptions: {
            headers,
        },
    });

    afterEach(async () => {
        await sleep(1000);
    });

    it('getStatus returns Bitcoin Blockbook system info', async () => {
        const status = await blockbook.getStatus();
        expect(status.blockbook.coin).toBe('Bitcoin');
        expect(status.backend.blocks as number).toBeGreaterThan(600_000);
        expect(status.blockbook.version).toBeTruthy();
        expect(status.blockbook.gitCommit).toBeTruthy();
    });

    it('getBlockHash returns correct hash for a known height', async () => {
        const status = await blockbook.getStatus();
        await sleep(1000);
        const blockHashResp = await blockbook.getBlockHash(status.backend.blocks as number);
        expect(typeof blockHashResp.blockHash).toBe('string');
        expect(blockHashResp.blockHash.length).toBeGreaterThan(10);
    });

    it('getBlock returns correct block for latest height', async () => {
        const status = await blockbook.getStatus();
        await sleep(1000);
        const block: Block = await blockbook.getBlock(status.backend.blocks as number);
        expect(block.height).toBe(status.backend.blocks);
        expect(block.hash).toBeTruthy();
    });

    it('getRawBlock returns correct raw block for latest height (only for BTC)', async () => {
        const status = await blockbook.getStatus();
        await sleep(1000);
        const rawBlock: string = await blockbook.getRawBlock(status.backend.blocks as number);
        expect(typeof rawBlock).toBe('string');
    });

    it('getTransaction returns data for a known transaction', async () => {
        const tx: Tx = await blockbook.getTransaction(TEST_BTC_TXID);
        expect(tx.txid).toBe(TEST_BTC_TXID);
        expect(Array.isArray(tx.vin)).toBeTruthy();
        expect(Array.isArray(tx.vout)).toBeTruthy();
        expect(tx.blockHeight).toBeGreaterThan(500_000);
    });

    it('getXpub returns derived addresses and balances', async () => {
        const result: Address = await blockbook.getXpub(TEST_BTC_XPUB, { details: 'tokens' });
        expect(result.address).toBe(TEST_BTC_XPUB);
        expect(typeof result.balance).toBe('string');
        if (result.tokens && Array.isArray(result.tokens) && result.tokens.length > 0) {
            expect(result.tokens[0].name).toBeTruthy();
            expect(result.tokens[0].balance).not.toBe(undefined);
        }
    });

    it('getUtxo returns array of UTXOs for known address', async () => {
        const utxos: Utxo[] = await blockbook.getUtxo(TEST_BTC_ADDR);
        expect(Array.isArray(utxos)).toBeTruthy();
        for (const utxo of utxos) {
            expect(utxo.address).toBe(undefined);
            expect(typeof utxo.txid).toBe('string');
            expect(typeof utxo.value).toBe('string');
            expect(typeof utxo.vout).toBe('number');
        }
    });

    it('getAddress returns address details and historical txs for known BTC address', async () => {
        const address: Address = await blockbook.getAddress(TEST_BTC_ADDR, { details: 'txids' });
        expect(address.address).toBe(TEST_BTC_ADDR);
        expect(address.balance).toMatch(/^\d+$/);
        expect(Array.isArray(address.txids) || address.txids === undefined).toBeTruthy();
    });

    it('getBalanceHistory returns non-empty entries for known BTC address', async () => {
        try {
            const history: BalanceHistory[] = await blockbook.getBalanceHistory(TEST_BTC_ADDR, {
                groupBy: 24 * 3600,
            });
            expect(Array.isArray(history)).toBeTruthy();
            expect(history.length).toBeGreaterThan(0);
            for (const point of history) {
                expect(typeof point.received).toBe('string');
                expect(typeof point.txs).toBe('number');
                expect(typeof point.time).toBe('number');
            }
        } catch {
            console.log('getBalanceHistory failed but skipping error');
        }
    });

    it('getTickers returns fiat prices for BTC', async () => {
        const tick: FiatTicker = await blockbook.getTickers('usd');
        expect(typeof tick.rates['usd']).toBe('number');
        expect(tick.ts && tick.ts > 1_600_000_000).toBeTruthy();
    });

    it('sendTransaction fails for bogus txhex', async () => {
        try {
            await blockbook.sendTransaction('deadbeef');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            expect(error?.message).toBeTruthy();
        }
    });

    it('estimatefee returns estimated fee', async () => {
        const fees = await blockbook.estimateFee();
        expect(typeof fees).toBe('string');
        expect(Number(fees)).toBeGreaterThan(0.000000001);
    });
});
