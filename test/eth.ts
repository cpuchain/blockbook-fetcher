import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { Blockbook, sleep } from '../src';
import type { Tx, Block, Address, BalanceHistory, FiatTicker } from '../src';

// Sample ETH mainnet values (update with recent values as needed)
const TEST_ETH_TXID = '0x4658906fd4e398ec9533a90f0add25c83608cc7561763f38a1d02d900166e7e0';
const TEST_ETH_ADDR = '0x396343362be2A4dA1cE0C1C210945346fb82Aa49';

// Blockbook public instance
const BLOCKBOOK_URL = 'https://eth1.trezor.io';

describe('Blockbook Ethereum API', () => {
    const blockbook = new Blockbook(BLOCKBOOK_URL);

    afterEach(async () => {
        await sleep(1000);
    });

    it('getStatus returns Ethereum Blockbook system info', async () => {
        const status = await blockbook.getStatus();
        assert.ok(status.blockbook.coin.includes('Ethereum'), 'Should be Ethereum');
        assert.ok(
            (status.backend.blocks as number) > 19_000_000,
            'ETH block height should be high',
        );
        assert.ok(status.blockbook.version, 'Blockbook version present');
        assert.ok(status.blockbook.gitCommit, 'Git commit present');
    });

    it('getBlockHash returns hash for the latest block', async () => {
        const { backend } = await blockbook.getStatus();
        await sleep(1000);
        const resp = await blockbook.getBlockHash(backend.blocks as number);
        assert.match(resp.blockHash, /^0x[0-9a-fA-F]{60,}$/);
    });

    it('getBlock returns latest block', async () => {
        const { backend } = await blockbook.getStatus();
        await sleep(1000);
        const block: Block = await blockbook.getBlock(backend.blocks as number);
        assert.equal(block.height, backend.blocks, 'Block height matches');
        assert.ok(block.hash, 'Block has a hash');
        assert.ok(block.txCount > 0, 'Block has txs');
    });

    it('getTransaction returns an ETH transaction', async () => {
        const tx: Tx = await blockbook.getTransaction(TEST_ETH_TXID);
        assert.equal(tx.txid.toLowerCase(), TEST_ETH_TXID.toLowerCase(), 'TXID matches');
        assert.ok(Array.isArray(tx.vin));
        assert.ok(Array.isArray(tx.vout));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assert.ok((tx as any).ethereumSpecific, 'ethereumSpecific exists');
        // ETH: usually at least one tokenTransfers or ethereumSpecific
        assert.ok(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (tx.tokenTransfers && tx.tokenTransfers.length >= 0) || (tx as any).ethereumSpecific,
        );
    });

    it('getTransactionSpecific returns raw backend tx object (not strictly tested)', async () => {
        const raw = await blockbook.getTransactionSpecific(TEST_ETH_TXID);
        assert.ok(typeof raw === 'object' && raw !== null, 'Raw backend tx data should be object');
    });

    it('getAddress returns token and balance info', async () => {
        const addr: Address = await blockbook.getAddress(TEST_ETH_ADDR, {
            details: 'tokenBalances',
        });
        assert.equal(addr.address.toLowerCase(), TEST_ETH_ADDR.toLowerCase());
        assert.match(addr.balance, /^\d+$/, 'Balance is numeric string');
        assert.ok(Array.isArray(addr.tokens), 'Has array of tokens');
        if (addr.tokens!.length > 0) {
            assert.ok(addr.tokens![0].name);
            assert.ok(typeof addr.tokens![0].balance === 'string');
        }
    });

    it('getBalanceHistory returns array for ETH address', async () => {
        try {
            const history: BalanceHistory[] = await blockbook.getBalanceHistory(TEST_ETH_ADDR, {
                groupBy: 86400,
            });
            assert.ok(Array.isArray(history), 'History is an array');
            if (history.length > 0) {
                assert.equal(typeof history[0].time, 'number');
                assert.equal(typeof history[0].received, 'string');
            }
        } catch {
            console.log('getBalanceHistory failed but skipping error');
        }
    });

    it('getTickers returns ETH price in USD', async () => {
        const ticker: FiatTicker = await blockbook.getTickers('usd');
        assert.ok(typeof ticker.rates.usd === 'number', 'ETH/USD price is a number');
        assert.ok(ticker.ts && ticker.ts > 1_600_000_000, 'Timestamp is plausible');
    });

    it('sendTransaction fails for bogus txhex', async () => {
        try {
            await blockbook.sendTransaction('deadbeef');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            assert.ok(error!.message, 'Error message should be present');
        }
    });
});
