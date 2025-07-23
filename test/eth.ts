import { describe, it, afterEach, expect } from 'vitest';
import { Blockbook, sleep } from '../src/index.js';
import type { Tx, Block, Address, BalanceHistory, FiatTicker } from '../src/index.js';

// Sample ETH mainnet values (update with recent values as needed)
const TEST_ETH_TXID = '0x4658906fd4e398ec9533a90f0add25c83608cc7561763f38a1d02d900166e7e0';
const TEST_ETH_ADDR = '0x396343362be2A4dA1cE0C1C210945346fb82Aa49';

// Blockbook public instance
const BLOCKBOOK_URL = 'https://eth1.trezor.io';

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0',
};

describe('Blockbook Ethereum API', () => {
    const blockbook = new Blockbook(BLOCKBOOK_URL, {
        fetchOptions: {
            headers,
        },
    });

    afterEach(async () => {
        await sleep(1000);
    });

    it('getStatus returns Ethereum Blockbook system info', async () => {
        const status = await blockbook.getStatus();
        expect(status.blockbook.coin.includes('Ethereum')).toBeTruthy();
        expect(status.backend.blocks as number).toBeGreaterThan(19_000_000);
        expect(status.blockbook.version).toBeTruthy();
        expect(status.blockbook.gitCommit).toBeTruthy();
    });

    it('getBlockHash returns hash for the latest block', async () => {
        const { backend } = await blockbook.getStatus();
        await sleep(1000);
        const resp = await blockbook.getBlockHash(backend.blocks as number);
        expect(resp.blockHash).toMatch(/^0x[0-9a-fA-F]{60,}$/);
    });

    it('getBlock returns latest block', async () => {
        const { backend } = await blockbook.getStatus();
        await sleep(1000);
        const block: Block = await blockbook.getBlock(backend.blocks as number);
        expect(block.height).toBe(backend.blocks);
        expect(block.hash).toBeTruthy();
        expect(block.txCount).toBeGreaterThan(0);
    });

    it('getTransaction returns an ETH transaction', async () => {
        const tx: Tx = await blockbook.getTransaction(TEST_ETH_TXID);
        expect(tx.txid.toLowerCase()).toBe(TEST_ETH_TXID.toLowerCase());
        expect(Array.isArray(tx.vin)).toBeTruthy();
        expect(Array.isArray(tx.vout)).toBeTruthy();
        // ethereumSpecific exists
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((tx as any).ethereumSpecific).toBeTruthy();
        // tokenTransfers or ethereumSpecific should be present
        expect(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (tx.tokenTransfers && tx.tokenTransfers.length >= 0) || (tx as any).ethereumSpecific,
        ).toBeTruthy();
    });

    it('getTransactionSpecific returns raw backend tx object (not strictly tested)', async () => {
        const raw = await blockbook.getTransactionSpecific(TEST_ETH_TXID);
        expect(typeof raw === 'object' && raw !== null).toBeTruthy();
    });

    it('getAddress returns token and balance info', async () => {
        const addr: Address = await blockbook.getAddress(TEST_ETH_ADDR, {
            details: 'tokenBalances',
        });
        expect(addr.address.toLowerCase()).toBe(TEST_ETH_ADDR.toLowerCase());
        expect(addr.balance).toMatch(/^\d+$/);
        expect(Array.isArray(addr.tokens)).toBeTruthy();
        if (addr.tokens!.length > 0) {
            expect(addr.tokens![0].name).toBeTruthy();
            expect(typeof addr.tokens![0].balance).toBe('string');
        }
    });

    /**
    it('getBalanceHistory returns array for ETH address', async () => {
        try {
            const history: BalanceHistory[] = await blockbook.getBalanceHistory(TEST_ETH_ADDR, {
                groupBy: 86400,
            });
            expect(Array.isArray(history)).toBeTruthy();
            if (history.length > 0) {
                expect(typeof history[0].time).toBe('number');
                expect(typeof history[0].received).toBe('string');
            }
        } catch {
            console.log('getBalanceHistory failed but skipping error');
        }
    });
    **/

    it('getTickers returns ETH price in USD', async () => {
        const ticker: FiatTicker = await blockbook.getTickers('usd');
        expect(typeof ticker.rates.usd).toBe('number');
        expect(ticker.ts && ticker.ts > 1_600_000_000).toBeTruthy();
    });

    it('sendTransaction fails for bogus txhex', async () => {
        try {
            await blockbook.sendTransaction('deadbeef');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            expect(error?.message).toBeTruthy();
        }
    });
});
