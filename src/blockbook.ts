import type { ValidateFunction } from 'ajv';
/* eslint-disable prettier/prettier */
import type {
    SystemInfo,            // /api/status
    Address,               // /api/v2/address
    Tx,                    // /api/v2/tx
    Block,                 // /api/v2/block
    Utxo,                  // /api/v2/utxo
    BalanceHistory,        // /api/v2/balancehistory
    AvailableVsCurrencies, // /api/v2/tickers-list
    FiatTicker,            // /api/v2/tickers
} from './blockbook-api.js';
/* eslint-enable prettier/prettier */
import { ajv } from './ajv.js';
import {
    SystemInfoSchema,
    GetBlockHashSchema,
    TxSchemaOrError,
    AddressSchemaOrError,
    UtxoArraySchemaOrError,
    BlockSchemaOrError,
    RawBlockSchemaOrError,
    SendTxSchemaOrError,
    AvailableVsCurrenciesSchemaOrError,
    FiatTickerSchemaOrError,
    BalanceHistoryArraySchemaOrError,
    EstimateFeesSchemaOrError,
} from './blockbook-schemas.js';

export const DEFAULT_TIMEOUT = 60000;

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch API endpoint with schema validation using Ajv.
 * @throws Error if response is not OK or schema validation fails.
 */
export async function fetchAndValidate<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any,
    validator?: ValidateFunction<T>,
): Promise<T> {
    const resp = await fetch(url, {
        ...(params || {}),
        signal: AbortSignal.timeout(params?.timeout || DEFAULT_TIMEOUT),
    });

    if (!resp.ok) {
        throw new Error(`Failed to query Blockbook: ${resp.statusText}`);
    }

    const json = await resp.json();

    if (!validator || validator?.(json)) {
        return json as T;
    }

    throw new Error('Blockbook schema error: ' + JSON.stringify(validator.errors));
}

/** Helper for query strings */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toQueryString(params?: Record<string, any>): string {
    if (!params) {
        return '';
    }

    const filteredEntries = Object.entries(params).filter(([, v]) => v !== undefined);

    if (!filteredEntries.length) {
        return '';
    }

    return (
        '?' +
        filteredEntries
            .map(([k, v]) =>
                Array.isArray(v)
                    ? v.map((i) => `${encodeURIComponent(k)}=${encodeURIComponent(i)}`).join('&')
                    : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
            )
            .join('&')
    );
}

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchOptions?: any;
    disableTypeValidation?: boolean;
}

export class Blockbook {
    readonly baseUrl: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly fetchOptions?: any;
    readonly disableTypeValidation?: boolean;

    constructor(baseUrl: string, params?: BlockbookParams) {
        // Remove trailing line
        this.baseUrl = baseUrl.replace(/\/+$/, '');
        this.fetchOptions = params?.fetchOptions;
        this.disableTypeValidation = params?.disableTypeValidation;
    }

    /** GET /api/status */
    async getStatus(): Promise<SystemInfo> {
        const validate = ajv.compile<SystemInfo>(SystemInfoSchema);
        return fetchAndValidate<SystemInfo>(`${this.baseUrl}/api/v2`, this.fetchOptions, validate);
    }

    /** GET /api/v2/block-index/<block height> */
    async getBlockHash(blockHeight: number): Promise<{ blockHash: string }> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<{ blockHash: string }>(GetBlockHashSchema)
            : undefined;

        return fetchAndValidate<{ blockHash: string }>(
            `${this.baseUrl}/api/v2/block-index/${blockHeight}`,
            this.fetchOptions,
            validate,
        );
    }

    /** GET /api/v2/tx/<txid> */
    async getTransaction(txid: string, spending?: boolean): Promise<Tx> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<Tx | { error: string }>(TxSchemaOrError)
            : undefined;

        const result = await fetchAndValidate<Tx | { error: string }>(
            `${this.baseUrl}/api/v2/tx/${txid}${toQueryString({ spending })}`,
            this.fetchOptions,
            validate,
        );

        if ((result as { error?: string })?.error) {
            throw new Error((result as { error: string })?.error);
        }

        return result as Tx;
    }

    /** GET /api/v2/tx-specific/<txid> */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getTransactionSpecific<T = any>(txid: string): Promise<T> {
        // Accept any object (coin-specific, not normalized)
        const schema = { type: 'object' };
        const validate = !this.disableTypeValidation ? ajv.compile<T>(schema) : undefined;
        return fetchAndValidate<T>(
            `${this.baseUrl}/api/v2/tx-specific/${txid}`,
            this.fetchOptions,
            validate,
        );
    }

    /** GET /api/v2/address/<address> */
    async getAddress(address: string, opts?: GetAddressOpts): Promise<Address> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<Address | { error: string }>(AddressSchemaOrError)
            : undefined;

        const result = await fetchAndValidate<Address | { error: string }>(
            `${this.baseUrl}/api/v2/address/${address}${toQueryString(opts)}`,
            this.fetchOptions,
            validate,
        );

        if ((result as { error?: string })?.error) {
            throw new Error((result as { error: string })?.error);
        }

        return result as Address;
    }

    /** GET /api/v2/xpub/<xpub|descriptor> */
    async getXpub(xpubOrDescriptor: string, opts?: GetXpubOpts): Promise<Address> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<Address | { error: string }>(AddressSchemaOrError)
            : undefined;

        const result = await fetchAndValidate<Address | { error: string }>(
            `${this.baseUrl}/api/v2/xpub/${xpubOrDescriptor}${toQueryString(opts)}`,
            this.fetchOptions,
            validate,
        );

        if ((result as { error?: string })?.error) {
            throw new Error((result as { error: string })?.error);
        }

        return result as Address;
    }

    /** GET /api/v2/utxo/<addr or xpub or descriptor> */
    async getUtxo(addrOrXpubOrDesc: string, opts?: GetUtxoOpts): Promise<Utxo[]> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<Utxo[] | { error: string }>(UtxoArraySchemaOrError)
            : undefined;

        const result = await fetchAndValidate<Utxo[] | { error: string }>(
            `${this.baseUrl}/api/v2/utxo/${addrOrXpubOrDesc}${toQueryString(opts)}`,
            this.fetchOptions,
            validate,
        );

        if ((result as { error?: string })?.error) {
            throw new Error((result as { error: string })?.error);
        }

        return result as Utxo[];
    }

    /** GET /api/v2/block/<block height|block hash> */
    async getBlock(blockHeightOrHash: string | number, page?: number): Promise<Block> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<Block | { error: string }>(BlockSchemaOrError)
            : undefined;

        const result = await fetchAndValidate<Block | { error: string }>(
            `${this.baseUrl}/api/v2/block/${blockHeightOrHash}${toQueryString({ page })}`,
            this.fetchOptions,
            validate,
        );

        if ((result as { error?: string })?.error) {
            throw new Error((result as { error: string })?.error);
        }

        return result as Block;
    }

    /** GET /api/v2/rawblock/<block height|block hash> */
    async getRawBlock(blockHeightOrHash: string | number): Promise<string> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<{ hex?: string; error?: string }>(RawBlockSchemaOrError)
            : undefined;

        const { hex, error } = await fetchAndValidate<{ hex?: string; error?: string }>(
            `${this.baseUrl}/api/v2/rawblock/${blockHeightOrHash}`,
            this.fetchOptions,
            validate,
        );

        if (error) {
            throw new Error(error);
        }

        return hex as string;
    }

    /** POST /api/v2/sendtx/ */
    async sendTransaction(txhex: string): Promise<string> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<{ result?: string; error?: { message: string } }>(SendTxSchemaOrError)
            : undefined;

        const { result, error } = await fetchAndValidate<{
            result?: string;
            error?: { message: string };
        }>(
            `${this.baseUrl}/api/v2/sendtx/`,
            {
                ...this.fetchOptions,
                method: 'POST',
                headers: {
                    ...(this.fetchOptions?.headers ?? {}),
                    'Content-Type': 'text/plain',
                },
                body: txhex,
            },
            validate,
        );

        if (error) {
            throw new Error(error?.message || JSON.stringify(error));
        }

        return result as string;
    }

    /** GET /api/v2/tickers-list[?timestamp=] */
    async getTickersList(timestamp: number): Promise<AvailableVsCurrencies> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<AvailableVsCurrencies | { error: string }>(
                  AvailableVsCurrenciesSchemaOrError,
              )
            : undefined;

        const result = await fetchAndValidate<AvailableVsCurrencies | { error: string }>(
            `${this.baseUrl}/api/v2/tickers-list${toQueryString({ timestamp })}`,
            this.fetchOptions,
            validate,
        );

        if ((result as { error?: string })?.error) {
            throw new Error((result as { error: string })?.error);
        }

        return result as AvailableVsCurrencies;
    }

    /** GET /api/v2/tickers[?currency=currency&timestamp=timestamp] */
    async getTickers(currency?: string, timestamp?: number): Promise<FiatTicker> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<FiatTicker | { error: string }>(FiatTickerSchemaOrError)
            : undefined;

        const result = await fetchAndValidate<FiatTicker | { error: string }>(
            `${this.baseUrl}/api/v2/tickers${toQueryString({ currency, timestamp })}`,
            this.fetchOptions,
            validate,
        );

        if ((result as { error?: string })?.error) {
            throw new Error((result as { error: string })?.error);
        }

        return result as FiatTicker;
    }

    /** GET /api/v2/balancehistory/<XPUB | address>?...  */
    async getBalanceHistory(
        addrOrXpub: string,
        opts?: GetBalanceHistoryOpts,
    ): Promise<BalanceHistory[]> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<BalanceHistory[] | { error: string }>(BalanceHistoryArraySchemaOrError)
            : undefined;

        const result = await fetchAndValidate<BalanceHistory[] | { error: string }>(
            `${this.baseUrl}/api/v2/balancehistory/${addrOrXpub}${toQueryString(opts)}`,
            this.fetchOptions,
            validate,
        );

        if ((result as { error?: string })?.error) {
            throw new Error((result as { error: string })?.error);
        }

        return result as BalanceHistory[];
    }

    /** GET /api/v2/estimatefee/<blocks> */
    async estimateFee(blocks = 1): Promise<string> {
        const validate = !this.disableTypeValidation
            ? ajv.compile<{ result?: string; error?: string }>(EstimateFeesSchemaOrError)
            : undefined;

        const { result, error } = await fetchAndValidate<{
            result?: string;
            error?: string;
        }>(`${this.baseUrl}/api/v2/estimatefee/${blocks}`, this.fetchOptions, validate);

        if (error) {
            throw new Error(error);
        }

        return result as string;
    }
}
