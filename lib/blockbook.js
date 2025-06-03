"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockbook = exports.DEFAULT_TIMEOUT = void 0;
exports.sleep = sleep;
exports.fetchAndValidate = fetchAndValidate;
exports.toQueryString = toQueryString;
/* eslint-enable prettier/prettier */
const ajv_1 = require("./ajv");
const blockbook_schemas_1 = require("./blockbook-schemas");
exports.DEFAULT_TIMEOUT = 60000;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Fetch API endpoint with schema validation using Ajv.
 * @throws Error if response is not OK or schema validation fails.
 */
async function fetchAndValidate(url, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
params, validator) {
    const resp = await fetch(url, {
        ...(params || {}),
        signal: AbortSignal.timeout(params?.timeout || exports.DEFAULT_TIMEOUT),
    });
    if (!resp.ok) {
        throw new Error(`Failed to query Blockbook: ${resp.statusText}`);
    }
    const json = await resp.json();
    if (!validator || validator?.(json)) {
        return json;
    }
    throw new Error('Blockbook schema error: ' + JSON.stringify(validator.errors));
}
/** Helper for query strings */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toQueryString(params) {
    if (!params) {
        return '';
    }
    const filteredEntries = Object.entries(params).filter(([, v]) => v !== undefined);
    if (!filteredEntries.length) {
        return '';
    }
    return ('?' +
        filteredEntries
            .map(([k, v]) => Array.isArray(v)
            ? v.map((i) => `${encodeURIComponent(k)}=${encodeURIComponent(i)}`).join('&')
            : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&'));
}
class Blockbook {
    baseUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchOptions;
    disableTypeValidation;
    constructor(baseUrl, params) {
        // Remove trailing line
        this.baseUrl = baseUrl.replace(/\/+$/, '');
        this.fetchOptions = params?.fetchOptions;
        this.disableTypeValidation = params?.disableTypeValidation;
    }
    /** GET /api/status */
    async getStatus() {
        const validate = ajv_1.ajv.compile(blockbook_schemas_1.SystemInfoSchema);
        return fetchAndValidate(`${this.baseUrl}/api/v2`, this.fetchOptions, validate);
    }
    /** GET /api/v2/block-index/<block height> */
    async getBlockHash(blockHeight) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.GetBlockHashSchema)
            : undefined;
        return fetchAndValidate(`${this.baseUrl}/api/v2/block-index/${blockHeight}`, this.fetchOptions, validate);
    }
    /** GET /api/v2/tx/<txid> */
    async getTransaction(txid, spending) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.TxSchemaOrError)
            : undefined;
        const result = await fetchAndValidate(`${this.baseUrl}/api/v2/tx/${txid}${toQueryString({ spending })}`, this.fetchOptions, validate);
        if (result?.error) {
            throw new Error(result?.error);
        }
        return result;
    }
    /** GET /api/v2/tx-specific/<txid> */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getTransactionSpecific(txid) {
        // Accept any object (coin-specific, not normalized)
        const schema = { type: 'object' };
        const validate = !this.disableTypeValidation ? ajv_1.ajv.compile(schema) : undefined;
        return fetchAndValidate(`${this.baseUrl}/api/v2/tx-specific/${txid}`, this.fetchOptions, validate);
    }
    /** GET /api/v2/address/<address> */
    async getAddress(address, opts) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.AddressSchemaOrError)
            : undefined;
        const result = await fetchAndValidate(`${this.baseUrl}/api/v2/address/${address}${toQueryString(opts)}`, this.fetchOptions, validate);
        if (result?.error) {
            throw new Error(result?.error);
        }
        return result;
    }
    /** GET /api/v2/xpub/<xpub|descriptor> */
    async getXpub(xpubOrDescriptor, opts) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.AddressSchemaOrError)
            : undefined;
        const result = await fetchAndValidate(`${this.baseUrl}/api/v2/xpub/${xpubOrDescriptor}${toQueryString(opts)}`, this.fetchOptions, validate);
        if (result?.error) {
            throw new Error(result?.error);
        }
        return result;
    }
    /** GET /api/v2/utxo/<addr or xpub or descriptor> */
    async getUtxo(addrOrXpubOrDesc, opts) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.UtxoArraySchemaOrError)
            : undefined;
        const result = await fetchAndValidate(`${this.baseUrl}/api/v2/utxo/${addrOrXpubOrDesc}${toQueryString(opts)}`, this.fetchOptions, validate);
        if (result?.error) {
            throw new Error(result?.error);
        }
        return result;
    }
    /** GET /api/v2/block/<block height|block hash> */
    async getBlock(blockHeightOrHash, page) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.BlockSchemaOrError)
            : undefined;
        const result = await fetchAndValidate(`${this.baseUrl}/api/v2/block/${blockHeightOrHash}${toQueryString({ page })}`, this.fetchOptions, validate);
        if (result?.error) {
            throw new Error(result?.error);
        }
        return result;
    }
    /** GET /api/v2/rawblock/<block height|block hash> */
    async getRawBlock(blockHeightOrHash) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.RawBlockSchemaOrError)
            : undefined;
        const { hex, error } = await fetchAndValidate(`${this.baseUrl}/api/v2/rawblock/${blockHeightOrHash}`, this.fetchOptions, validate);
        if (error) {
            throw new Error(error);
        }
        return hex;
    }
    /** POST /api/v2/sendtx/ */
    async sendTransaction(txhex) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.SendTxSchemaOrError)
            : undefined;
        const { result, error } = await fetchAndValidate(`${this.baseUrl}/api/v2/sendtx/`, {
            ...this.fetchOptions,
            method: 'POST',
            headers: {
                ...(this.fetchOptions?.headers ?? {}),
                'Content-Type': 'text/plain',
            },
            body: txhex,
        }, validate);
        if (error) {
            throw new Error(error?.message || JSON.stringify(error));
        }
        return result;
    }
    /** GET /api/v2/tickers-list[?timestamp=] */
    async getTickersList(timestamp) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.AvailableVsCurrenciesSchemaOrError)
            : undefined;
        const result = await fetchAndValidate(`${this.baseUrl}/api/v2/tickers-list${toQueryString({ timestamp })}`, this.fetchOptions, validate);
        if (result?.error) {
            throw new Error(result?.error);
        }
        return result;
    }
    /** GET /api/v2/tickers[?currency=currency&timestamp=timestamp] */
    async getTickers(currency, timestamp) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.FiatTickerSchemaOrError)
            : undefined;
        const result = await fetchAndValidate(`${this.baseUrl}/api/v2/tickers${toQueryString({ currency, timestamp })}`, this.fetchOptions, validate);
        if (result?.error) {
            throw new Error(result?.error);
        }
        return result;
    }
    /** GET /api/v2/balancehistory/<XPUB | address>?...  */
    async getBalanceHistory(addrOrXpub, opts) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.BalanceHistoryArraySchemaOrError)
            : undefined;
        const result = await fetchAndValidate(`${this.baseUrl}/api/v2/balancehistory/${addrOrXpub}${toQueryString(opts)}`, this.fetchOptions, validate);
        if (result?.error) {
            throw new Error(result?.error);
        }
        return result;
    }
    /** GET /api/v2/estimatefee/<blocks> */
    async estimateFee(blocks = 1) {
        const validate = !this.disableTypeValidation
            ? ajv_1.ajv.compile(blockbook_schemas_1.EstimateFeesSchemaOrError)
            : undefined;
        const { result, error } = await fetchAndValidate(`${this.baseUrl}/api/v2/estimatefee/${blocks}`, this.fetchOptions, validate);
        if (error) {
            throw new Error(error);
        }
        return result;
    }
}
exports.Blockbook = Blockbook;
