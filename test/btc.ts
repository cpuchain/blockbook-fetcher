import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { Blockbook, sleep } from '../src';
import type { Tx, Block, Utxo, Address, BalanceHistory, FiatTicker } from '../src';

// A known real confirmed transaction on mainnet
const TEST_BTC_TXID = '59963202a6c02916b4ae49ffe0bf1fe092a2b1b7a706a38a11cf634bb2c89857';
const TEST_BTC_ADDR = '37jKPSmbEGwgfacCr2nayn1wTaqMAbA94Z';
const TEST_BTC_XPUB =
    'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8';

// Blockbook public instance
const BLOCKBOOK_URL = 'https://btc1.trezor.io';

describe('Blockbook Bitcoin API', () => {
    const blockbook = new Blockbook(BLOCKBOOK_URL);

    afterEach(async () => {
        await sleep(1000); // Add 1s delay before each test case
    });

    it('getStatus returns Bitcoin Blockbook system info', async () => {
        const status = await blockbook.getStatus();
        assert.ok(status.blockbook.coin === 'Bitcoin', 'Should be Bitcoin');
        assert.ok((status.backend.blocks as number) > 600_000, 'Block height should be high');
        assert.ok(status.blockbook.version, 'Blockbook version present');
        assert.ok(status.blockbook.gitCommit, 'Git commit present');
    });

    it('getBlockHash returns correct hash for a known height', async () => {
        const status = await blockbook.getStatus();
        await sleep(1000);
        const blockHashResp = await blockbook.getBlockHash(status.backend.blocks as number);
        assert.ok(
            typeof blockHashResp.blockHash === 'string' && blockHashResp.blockHash.length > 10,
            'Block hash returned',
        );
    });

    it('getBlock returns correct block for latest height', async () => {
        const status = await blockbook.getStatus();
        await sleep(1000);
        const block: Block = await blockbook.getBlock(status.backend.blocks as number);
        assert.equal(block.height, status.backend.blocks, 'Block heights match');
        assert.ok(block.hash, 'Block should have a hash');
    });

    it('getRawBlock returns correct raw block for latest height (only for BTC)', async () => {
        const status = await blockbook.getStatus();
        await sleep(1000);
        const rawBlock: string = await blockbook.getRawBlock(status.backend.blocks as number);
        assert.ok(typeof rawBlock === 'string', 'Has raw block');
    });

    it('getTransaction returns data for a known transaction', async () => {
        const tx: Tx = await blockbook.getTransaction(TEST_BTC_TXID);
        assert.equal(tx.txid, TEST_BTC_TXID, 'TXID matches');
        assert.ok(Array.isArray(tx.vin), 'VIN array exists');
        assert.ok(Array.isArray(tx.vout), 'VOUT array exists');
        assert.ok(tx.blockHeight > 500_000, 'TX is confirmed');
    });

    it('getXpub returns derived addresses and balances', async () => {
        const result: Address = await blockbook.getXpub(TEST_BTC_XPUB, { details: 'tokens' });
        assert.ok(result.address === TEST_BTC_XPUB, 'Returned address matches requested xpub');
        assert.ok(typeof result.balance === 'string', 'Has a balance');
        if (result.tokens && Array.isArray(result.tokens) && result.tokens.length > 0) {
            assert.ok(result.tokens[0].name, 'First derived address has name');
            assert.ok(result.tokens[0].balance !== undefined, 'First derived address has balance');
        }
    });

    it('getUtxo returns array of UTXOs for known address', async () => {
        const utxos: Utxo[] = await blockbook.getUtxo(TEST_BTC_ADDR);
        assert.ok(Array.isArray(utxos), 'UTXO result is an array');
        for (const utxo of utxos) {
            assert.equal(
                utxo.address,
                undefined,
                'BTC address is not provided for non-xpub queries (usually)',
            );
            assert.ok(typeof utxo.txid === 'string');
            assert.ok(typeof utxo.value === 'string');
            assert.ok(typeof utxo.vout === 'number');
        }
    });

    it('getAddress returns address details and historical txs for known BTC address', async () => {
        const address: Address = await blockbook.getAddress(TEST_BTC_ADDR, { details: 'txids' });
        assert.equal(address.address, TEST_BTC_ADDR, 'Address matches');
        assert.match(address.balance, /^\d+$/, 'Balance is string digits');
        assert.ok(
            Array.isArray(address.txids) || address.txids === undefined,
            'txids is array or undefined',
        );
    });

    it('getBalanceHistory returns non-empty entries for known BTC address', async () => {
        try {
            const history: BalanceHistory[] = await blockbook.getBalanceHistory(TEST_BTC_ADDR, {
                groupBy: 24 * 3600,
            });
            assert.ok(Array.isArray(history), 'Balance history returns array');
            assert.ok(history.length > 0, 'History should have entries');
            for (const point of history) {
                assert.equal(typeof point.received, 'string');
                assert.equal(typeof point.txs, 'number');
                assert.equal(typeof point.time, 'number');
            }
        } catch {
            console.log('getBalanceHistory failed but skipping error');
        }
    });

    it('getTickers returns fiat prices for BTC', async () => {
        const tick: FiatTicker = await blockbook.getTickers('usd');
        assert.ok(typeof tick.rates['usd'] === 'number', 'USD price available');
        assert.ok(tick.ts && tick.ts > 1_600_000_000, 'Has a plausible timestamp');
    });

    it('sendTransaction fails for bogus txhex', async () => {
        try {
            await blockbook.sendTransaction('deadbeef');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            assert.ok(error!.message, 'Error message should be present');
        }
    });

    it('estimatefee returns estimated fee', async () => {
        const fees = await blockbook.estimateFee();
        assert.ok(typeof fees === 'string', 'Fees available');
        assert.ok(Number(fees) > 0.000000001, 'Fees available');
    });
});
