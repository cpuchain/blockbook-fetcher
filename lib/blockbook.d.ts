import type { ValidateFunction } from 'ajv';
import type { SystemInfo, // /api/status
Address, // /api/v2/address
Tx, // /api/v2/tx
Block, // /api/v2/block
Utxo, // /api/v2/utxo
BalanceHistory, // /api/v2/balancehistory
AvailableVsCurrencies, // /api/v2/tickers-list
FiatTicker } from './blockbook-api';
export declare const DEFAULT_TIMEOUT = 60000;
export declare function sleep(ms: number): Promise<unknown>;
/**
 * Fetch API endpoint with schema validation using Ajv.
 * @throws Error if response is not OK or schema validation fails.
 */
export declare function fetchAndValidate<T>(url: string, params: any, validator?: ValidateFunction<T>): Promise<T>;
/** Helper for query strings */
export declare function toQueryString(params?: Record<string, any>): string;
export interface GetAddressOpts {
    page?: number;
    pageSize?: number;
    from?: number;
    to?: number;
    details?: 'basic' | 'tokens' | 'tokenBalances' | 'txids' | 'txslight' | 'txs';
    contract?: string;
    secondary?: string;
}
export interface GetXpubOpts {
    page?: number;
    pageSize?: number;
    from?: number;
    to?: number;
    details?: 'basic' | 'tokens' | 'tokenBalances' | 'txids' | 'txs';
    tokens?: 'derived' | 'used' | 'nonzero';
    secondary?: string;
}
export interface GetBalanceHistoryOpts {
    from?: number;
    to?: number;
    fiatcurrency?: string;
    groupBy?: number;
}
export interface GetUtxoOpts {
    confirmed?: boolean;
    gap?: number;
}
/**
 * Blockbook REST API class with Ajv validation for all endpoints.
 */
export interface BlockbookParams {
    fetchOptions?: any;
    disableTypeValidation?: boolean;
}
export declare class Blockbook {
    readonly baseUrl: string;
    readonly fetchOptions?: any;
    readonly disableTypeValidation?: boolean;
    constructor(baseUrl: string, params?: BlockbookParams);
    /** GET /api/status */
    getStatus(): Promise<SystemInfo>;
    /** GET /api/v2/block-index/<block height> */
    getBlockHash(blockHeight: number): Promise<{
        blockHash: string;
    }>;
    /** GET /api/v2/tx/<txid> */
    getTransaction(txid: string, spending?: boolean): Promise<Tx>;
    /** GET /api/v2/tx-specific/<txid> */
    getTransactionSpecific<T = any>(txid: string): Promise<T>;
    /** GET /api/v2/address/<address> */
    getAddress(address: string, opts?: GetAddressOpts): Promise<Address>;
    /** GET /api/v2/xpub/<xpub|descriptor> */
    getXpub(xpubOrDescriptor: string, opts?: GetXpubOpts): Promise<Address>;
    /** GET /api/v2/utxo/<addr or xpub or descriptor> */
    getUtxo(addrOrXpubOrDesc: string, opts?: GetUtxoOpts): Promise<Utxo[]>;
    /** GET /api/v2/block/<block height|block hash> */
    getBlock(blockHeightOrHash: string | number, page?: number): Promise<Block>;
    /** GET /api/v2/rawblock/<block height|block hash> */
    getRawBlock(blockHeightOrHash: string | number): Promise<string>;
    /** POST /api/v2/sendtx/ */
    sendTransaction(txhex: string): Promise<string>;
    /** GET /api/v2/tickers-list[?timestamp=] */
    getTickersList(timestamp: number): Promise<AvailableVsCurrencies>;
    /** GET /api/v2/tickers[?currency=currency&timestamp=timestamp] */
    getTickers(currency?: string, timestamp?: number): Promise<FiatTicker>;
    /** GET /api/v2/balancehistory/<XPUB | address>?...  */
    getBalanceHistory(addrOrXpub: string, opts?: GetBalanceHistoryOpts): Promise<BalanceHistory[]>;
    /** GET /api/v2/estimatefee/<blocks> */
    estimateFee(blocks?: number): Promise<string>;
}
