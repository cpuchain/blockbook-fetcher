import { Ajv as Ajv$1 } from 'ajv';

const Ajv = globalThis?.Ajv || globalThis?.ajv2020 || Ajv$1;
const ajv = new Ajv({
  allErrors: true,
  allowUnionTypes: true
});

const BackendInfoSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
    chain: { type: "string" },
    blocks: { type: "number" },
    headers: { type: "number" },
    bestBlockHash: { type: "string" },
    difficulty: { type: "string" },
    sizeOnDisk: { type: "number" },
    version: { type: "string" },
    subversion: { type: "string" },
    protocolVersion: { type: "string" },
    timeOffset: { type: "number" },
    warnings: { type: "string" },
    consensus_version: { type: "string" },
    consensus: {}
  }
};
const InternalStateColumnSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    version: { type: "number" },
    rows: { type: "number" },
    keyBytes: { type: "number" },
    valueBytes: { type: "number" },
    updated: { type: "string" }
  },
  required: ["name", "version", "rows", "keyBytes", "valueBytes", "updated"]
};
const BlockbookInfoSchema = {
  type: "object",
  properties: {
    coin: { type: "string" },
    network: { type: "string" },
    host: { type: "string" },
    version: { type: "string" },
    gitCommit: { type: "string" },
    buildTime: { type: "string" },
    syncMode: { type: "boolean" },
    initialSync: { type: "boolean" },
    inSync: { type: "boolean" },
    bestHeight: { type: "number" },
    lastBlockTime: { type: "string" },
    inSyncMempool: { type: "boolean" },
    lastMempoolTime: { type: "string" },
    mempoolSize: { type: "number" },
    decimals: { type: "number" },
    dbSize: { type: "number" },
    hasFiatRates: { type: "boolean" },
    hasTokenFiatRates: { type: "boolean" },
    currentFiatRatesTime: { type: "string" },
    historicalFiatRatesTime: { type: "string" },
    historicalTokenFiatRatesTime: { type: "string" },
    supportedStakingPools: {
      type: "array",
      items: { type: "string" }
    },
    dbSizeFromColumns: { type: "number" },
    dbColumns: {
      type: "array",
      items: InternalStateColumnSchema
    },
    about: { type: "string" }
  },
  required: [
    "coin",
    "network",
    "host",
    "version",
    "gitCommit",
    "buildTime",
    "syncMode",
    "initialSync",
    "inSync",
    "bestHeight",
    "lastBlockTime",
    "inSyncMempool",
    "lastMempoolTime",
    "mempoolSize",
    "decimals",
    "dbSize",
    "about"
  ]
};
const SystemInfoSchema = {
  type: "object",
  properties: {
    blockbook: BlockbookInfoSchema,
    backend: BackendInfoSchema
  },
  required: ["blockbook", "backend"]
};
const GetBlockHashSchema = {
  type: "object",
  properties: { blockHash: { type: "string" } },
  required: ["blockHash"]
};
const APIErrorSchema = {
  type: "object",
  properties: {
    Text: { type: "string" },
    Public: { type: "boolean" }
  },
  required: ["Text", "Public"]
};
const AddressAliasSchema = {
  type: "object",
  properties: {
    Type: { type: "string" },
    Alias: { type: "string" }
  },
  required: ["Type", "Alias"]
};
const EthereumInternalTransferSchema = {
  type: "object",
  properties: {
    type: { type: "number" },
    from: { type: "string" },
    to: { type: "string" },
    value: { type: "string" }
  },
  required: ["type", "from", "to", "value"]
};
const EthereumParsedInputParamSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    values: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["type"]
};
const EthereumParsedInputDataSchema = {
  type: "object",
  properties: {
    methodId: { type: "string" },
    name: { type: "string" },
    function: { type: "string" },
    params: {
      type: "array",
      items: EthereumParsedInputParamSchema
    }
  },
  required: ["methodId", "name"]
};
const EthereumSpecificSchema = {
  type: "object",
  properties: {
    type: { type: "number" },
    createdContract: { type: "string" },
    status: { type: "number" },
    error: { type: "string" },
    nonce: { type: "number" },
    gasLimit: { type: "number" },
    gasUsed: { type: "number" },
    gasPrice: { type: "string" },
    maxPriorityFeePerGas: { type: "string" },
    maxFeePerGas: { type: "string" },
    baseFeePerGas: { type: "string" },
    l1Fee: { type: "number" },
    l1FeeScalar: { type: "string" },
    l1GasPrice: { type: "string" },
    l1GasUsed: { type: "number" },
    data: { type: "string" },
    parsedData: EthereumParsedInputDataSchema,
    internalTransfers: {
      type: "array",
      items: EthereumInternalTransferSchema
    }
  },
  required: ["status", "nonce", "gasLimit"]
};
const MultiTokenValueSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    value: { type: "string" }
  }
};
const TokenTransferSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    // enum, but allow as string for compatibility
    standard: { type: "string" },
    from: { type: "string" },
    to: { type: "string" },
    contract: { type: "string" },
    name: { type: "string" },
    symbol: { type: "string" },
    decimals: { type: "number" },
    value: { type: "string" },
    multiTokenValues: {
      type: "array",
      items: MultiTokenValueSchema
    }
  }
  //required: ['type', 'standard', 'from', 'to', 'contract', 'decimals'],
};
const VoutSchema = {
  type: "object",
  properties: {
    value: { type: "string" },
    n: { type: "number" },
    spent: { type: "boolean" },
    spentTxId: { type: "string" },
    spentIndex: { type: "number" },
    spentHeight: { type: "number" },
    hex: { type: "string" },
    asm: { type: "string" },
    addresses: {
      // Blockbook sometimes return null for ETH coins
      type: ["array", "null"],
      items: { type: "string" }
    },
    isAddress: { type: "boolean" },
    isOwn: { type: "boolean" },
    type: { type: "string" }
  },
  required: ["n", "addresses", "isAddress"]
};
const VinSchema = {
  type: "object",
  properties: {
    txid: { type: "string" },
    vout: { type: "number" },
    sequence: { type: "number" },
    n: { type: "number" },
    addresses: {
      type: "array",
      items: { type: "string" }
    },
    isAddress: { type: "boolean" },
    isOwn: { type: "boolean" },
    value: { type: "string" },
    hex: { type: "string" },
    asm: { type: "string" },
    coinbase: { type: "string" }
  },
  required: ["n", "isAddress"]
};
const TxSchema = {
  type: "object",
  properties: {
    txid: { type: "string" },
    version: { type: "number" },
    lockTime: { type: "number" },
    vin: {
      type: "array",
      items: VinSchema
    },
    vout: {
      type: "array",
      items: VoutSchema
    },
    blockHash: { type: "string" },
    blockHeight: { type: "number" },
    confirmations: { type: "number" },
    confirmationETABlocks: { type: "number" },
    confirmationETASeconds: { type: "number" },
    blockTime: { type: "number" },
    size: { type: "number" },
    vsize: { type: "number" },
    value: { type: "string" },
    valueIn: { type: "string" },
    fees: { type: "string" },
    hex: { type: "string" },
    rbf: { type: "boolean" },
    coinSpecificData: {},
    tokenTransfers: {
      type: "array",
      items: TokenTransferSchema
    },
    ethereumSpecific: EthereumSpecificSchema,
    addressAliases: {
      type: "object",
      additionalProperties: AddressAliasSchema
    }
  },
  required: ["txid", "vin", "vout", "blockHeight", "confirmations", "blockTime", "value"]
};
const ErrorSchema = {
  type: "object",
  properties: {
    error: { type: "string" }
  },
  required: ["error"]
};
const TxSchemaOrError = {
  oneOf: [TxSchema, ErrorSchema]
};
const FeeStatsSchema = {
  type: "object",
  properties: {
    txCount: { type: "number" },
    totalFeesSat: { type: "string" },
    averageFeePerKb: { type: "number" },
    decilesFeePerKb: {
      type: "array",
      items: { type: "number" }
    }
  },
  required: ["txCount", "totalFeesSat", "averageFeePerKb", "decilesFeePerKb"]
};
const StakingPoolSchema = {
  type: "object",
  properties: {
    contract: { type: "string" },
    name: { type: "string" },
    pendingBalance: { type: "string" },
    pendingDepositedBalance: { type: "string" },
    depositedBalance: { type: "string" },
    withdrawTotalAmount: { type: "string" },
    claimableAmount: { type: "string" },
    restakedReward: { type: "string" },
    autocompoundBalance: { type: "string" }
  },
  required: [
    "contract",
    "name",
    "pendingBalance",
    "pendingDepositedBalance",
    "depositedBalance",
    "withdrawTotalAmount",
    "claimableAmount",
    "restakedReward",
    "autocompoundBalance"
  ]
};
const ContractInfoSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    standard: { type: "string" },
    contract: { type: "string" },
    name: { type: "string" },
    symbol: { type: "string" },
    decimals: { type: "number" },
    createdInBlock: { type: "number" },
    destructedInBlock: { type: "number" }
  }
  //required: ['type', 'standard', 'contract', 'name', 'symbol', 'decimals'],
};
const TokenSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    standard: { type: "string" },
    name: { type: "string" },
    path: { type: "string" },
    contract: { type: "string" },
    transfers: { type: "number" },
    symbol: { type: "string" },
    decimals: { type: "number" },
    balance: { type: "string" },
    baseValue: { type: "number" },
    secondaryValue: { type: "number" },
    ids: {
      type: "array",
      items: { type: "string" }
    },
    multiTokenValues: {
      type: "array",
      items: MultiTokenValueSchema
    },
    totalReceived: { type: "string" },
    totalSent: { type: "string" }
  }
  //required: ['type', 'standard', 'name', 'transfers', 'decimals'],
};
const AddressSchema = {
  type: "object",
  properties: {
    page: { type: "number" },
    totalPages: { type: "number" },
    itemsOnPage: { type: "number" },
    address: { type: "string" },
    balance: { type: "string" },
    totalReceived: { type: "string" },
    totalSent: { type: "string" },
    unconfirmedBalance: { type: "string" },
    unconfirmedTxs: { type: "number" },
    unconfirmedSending: { type: "string" },
    unconfirmedReceiving: { type: "string" },
    txs: { type: "number" },
    addrTxCount: { type: "number" },
    nonTokenTxs: { type: "number" },
    internalTxs: { type: "number" },
    transactions: {
      type: "array",
      items: TxSchema
    },
    txids: {
      type: "array",
      items: { type: "string" }
    },
    nonce: { type: "string" },
    usedTokens: { type: "number" },
    tokens: {
      type: "array",
      items: TokenSchema
    },
    secondaryValue: { type: "number" },
    tokensBaseValue: { type: "number" },
    tokensSecondaryValue: { type: "number" },
    totalBaseValue: { type: "number" },
    totalSecondaryValue: { type: "number" },
    contractInfo: ContractInfoSchema,
    erc20Contract: ContractInfoSchema,
    addressAliases: {
      type: "object",
      additionalProperties: AddressAliasSchema
    },
    stakingPools: {
      type: "array",
      items: StakingPoolSchema
    }
  },
  required: ["address", "balance", "unconfirmedBalance", "unconfirmedTxs", "txs"]
};
const AddressSchemaOrError = {
  oneOf: [AddressSchema, ErrorSchema]
};
const UtxoSchema = {
  type: "object",
  properties: {
    txid: { type: "string" },
    vout: { type: "number" },
    value: { type: "string" },
    height: { type: "number" },
    confirmations: { type: "number" },
    address: { type: "string" },
    path: { type: "string" },
    lockTime: { type: "number" },
    coinbase: { type: "boolean" }
  },
  required: ["txid", "vout", "value", "confirmations"]
};
const UtxoArraySchemaOrError = {
  oneOf: [
    {
      type: "array",
      items: UtxoSchema
    },
    ErrorSchema
  ]
};
const BlockInfoSchema = {
  type: "object",
  properties: {
    Hash: { type: "string" },
    Time: { type: "number" },
    Txs: { type: "number" },
    Size: { type: "number" },
    Height: { type: "number" }
  },
  required: ["Hash", "Time", "Txs", "Size", "Height"]
};
const BlocksSchema = {
  type: "object",
  properties: {
    page: { type: "number" },
    totalPages: { type: "number" },
    itemsOnPage: { type: "number" },
    blocks: {
      type: "array",
      items: BlockInfoSchema
    }
  },
  required: ["blocks"]
};
const BlockSchema = {
  type: "object",
  properties: {
    page: { type: "number" },
    totalPages: { type: "number" },
    itemsOnPage: { type: "number" },
    hash: { type: "string" },
    previousBlockHash: { type: "string" },
    nextBlockHash: { type: "string" },
    height: { type: "number" },
    confirmations: { type: "number" },
    size: { type: "number" },
    time: { type: "number" },
    version: { type: ["string", "number"] },
    merkleRoot: { type: "string" },
    nonce: { type: "string" },
    bits: { type: "string" },
    difficulty: { type: "string" },
    tx: {
      type: "array",
      items: { type: "string" }
    },
    txCount: { type: "number" },
    txs: {
      type: "array",
      items: TxSchema
    },
    addressAliases: {
      type: "object",
      additionalProperties: AddressAliasSchema
    }
  },
  required: [
    "hash",
    "height",
    "confirmations",
    "size",
    "merkleRoot",
    "bits",
    "difficulty",
    "txCount"
  ]
};
const BlockSchemaOrError = {
  oneOf: [BlockSchema, ErrorSchema]
};
const RawBlockSchema = {
  type: "object",
  properties: {
    hex: { type: "string" }
  },
  required: ["hex"]
};
const RawBlockSchemaOrError = {
  oneOf: [RawBlockSchema, ErrorSchema]
};
const SendTxSchema = {
  type: "object",
  properties: {
    result: { type: "string" }
  }
};
const SendTxSchemaOrError = {
  oneOf: [
    SendTxSchema,
    {
      type: "object",
      properties: {
        error: {
          type: "object",
          properties: {
            message: { type: "string" }
          },
          required: ["message"]
        }
      },
      required: ["error"]
    }
  ]
};
const AvailableVsCurrenciesSchema = {
  type: "object",
  properties: {
    ts: { type: "number", nullable: true },
    available_currencies: {
      type: "array",
      items: { type: "string" }
    },
    error: { type: "string", nullable: true }
  },
  required: ["available_currencies"]
};
const AvailableVsCurrenciesSchemaOrError = {
  oneOf: [AvailableVsCurrenciesSchema, ErrorSchema]
};
const FiatTickerSchema = {
  type: "object",
  properties: {
    ts: { type: "number", nullable: true },
    rates: {
      type: "object",
      additionalProperties: { type: "number" }
    },
    error: { type: "string", nullable: true }
  },
  required: ["rates"]
};
const FiatTickerSchemaOrError = {
  oneOf: [FiatTickerSchema, ErrorSchema]
};
const BalanceHistorySchema = {
  type: "object",
  properties: {
    time: { type: "number" },
    txs: { type: "number" },
    received: { type: "string" },
    sent: { type: "string" },
    sentToSelf: { type: "string" },
    rates: {
      type: "object",
      additionalProperties: { type: "number" }
    },
    txid: { type: "string" }
  },
  required: ["time", "txs", "received", "sent", "sentToSelf"]
};
const BalanceHistoryArraySchema = {
  type: "array",
  items: BalanceHistorySchema
};
const BalanceHistoryArraySchemaOrError = {
  oneOf: [BalanceHistoryArraySchema, ErrorSchema]
};
const EstimateFeesSchema = {
  type: "object",
  properties: {
    result: {
      type: "string"
    }
  }
};
const EstimateFeesSchemaOrError = {
  oneOf: [EstimateFeesSchema, ErrorSchema]
};

const DEFAULT_TIMEOUT = 6e4;
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function fetchAndValidate(url, params, validator) {
  const resp = await fetch(url, {
    ...params || {},
    signal: AbortSignal.timeout(params?.timeout || DEFAULT_TIMEOUT)
  });
  if (!resp.ok) {
    throw new Error(`Failed to query Blockbook: ${resp.statusText}`);
  }
  const json = await resp.json();
  if (!validator || validator?.(json)) {
    return json;
  }
  throw new Error("Blockbook schema error: " + JSON.stringify(validator.errors));
}
function toQueryString(params) {
  if (!params) {
    return "";
  }
  const filteredEntries = Object.entries(params).filter(([, v]) => v !== void 0);
  if (!filteredEntries.length) {
    return "";
  }
  return "?" + filteredEntries.map(
    ([k, v]) => Array.isArray(v) ? v.map((i) => `${encodeURIComponent(k)}=${encodeURIComponent(i)}`).join("&") : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  ).join("&");
}
class Blockbook {
  baseUrl;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchOptions;
  disableTypeValidation;
  constructor(baseUrl, params) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.fetchOptions = params?.fetchOptions;
    this.disableTypeValidation = params?.disableTypeValidation;
  }
  /** GET /api/status */
  async getStatus() {
    const validate = ajv.compile(SystemInfoSchema);
    return fetchAndValidate(`${this.baseUrl}/api/v2`, this.fetchOptions, validate);
  }
  /** GET /api/v2/block-index/<block height> */
  async getBlockHash(blockHeight) {
    const validate = !this.disableTypeValidation ? ajv.compile(GetBlockHashSchema) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/block-index/${blockHeight}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/tx/<txid> */
  async getTransaction(txid, spending) {
    const validate = !this.disableTypeValidation ? ajv.compile(TxSchemaOrError) : void 0;
    const result = await fetchAndValidate(
      `${this.baseUrl}/api/v2/tx/${txid}${toQueryString({ spending })}`,
      this.fetchOptions,
      validate
    );
    if (result?.error) {
      throw new Error(result?.error);
    }
    return result;
  }
  /** GET /api/v2/tx-specific/<txid> */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getTransactionSpecific(txid) {
    const schema = { type: "object" };
    const validate = !this.disableTypeValidation ? ajv.compile(schema) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/tx-specific/${txid}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/address/<address> */
  async getAddress(address, opts) {
    const validate = !this.disableTypeValidation ? ajv.compile(AddressSchemaOrError) : void 0;
    const result = await fetchAndValidate(
      `${this.baseUrl}/api/v2/address/${address}${toQueryString(opts)}`,
      this.fetchOptions,
      validate
    );
    if (result?.error) {
      throw new Error(result?.error);
    }
    return result;
  }
  /** GET /api/v2/xpub/<xpub|descriptor> */
  async getXpub(xpubOrDescriptor, opts) {
    const validate = !this.disableTypeValidation ? ajv.compile(AddressSchemaOrError) : void 0;
    const result = await fetchAndValidate(
      `${this.baseUrl}/api/v2/xpub/${xpubOrDescriptor}${toQueryString(opts)}`,
      this.fetchOptions,
      validate
    );
    if (result?.error) {
      throw new Error(result?.error);
    }
    return result;
  }
  /** GET /api/v2/utxo/<addr or xpub or descriptor> */
  async getUtxo(addrOrXpubOrDesc, opts) {
    const validate = !this.disableTypeValidation ? ajv.compile(UtxoArraySchemaOrError) : void 0;
    const result = await fetchAndValidate(
      `${this.baseUrl}/api/v2/utxo/${addrOrXpubOrDesc}${toQueryString(opts)}`,
      this.fetchOptions,
      validate
    );
    if (result?.error) {
      throw new Error(result?.error);
    }
    return result;
  }
  /** GET /api/v2/block/<block height|block hash> */
  async getBlock(blockHeightOrHash, page) {
    const validate = !this.disableTypeValidation ? ajv.compile(BlockSchemaOrError) : void 0;
    const result = await fetchAndValidate(
      `${this.baseUrl}/api/v2/block/${blockHeightOrHash}${toQueryString({ page })}`,
      this.fetchOptions,
      validate
    );
    if (result?.error) {
      throw new Error(result?.error);
    }
    return result;
  }
  /** GET /api/v2/rawblock/<block height|block hash> */
  async getRawBlock(blockHeightOrHash) {
    const validate = !this.disableTypeValidation ? ajv.compile(RawBlockSchemaOrError) : void 0;
    const { hex, error } = await fetchAndValidate(
      `${this.baseUrl}/api/v2/rawblock/${blockHeightOrHash}`,
      this.fetchOptions,
      validate
    );
    if (error) {
      throw new Error(error);
    }
    return hex;
  }
  /** POST /api/v2/sendtx/ */
  async sendTransaction(txhex) {
    const validate = !this.disableTypeValidation ? ajv.compile(SendTxSchemaOrError) : void 0;
    const { result, error } = await fetchAndValidate(
      `${this.baseUrl}/api/v2/sendtx/`,
      {
        ...this.fetchOptions,
        method: "POST",
        headers: {
          ...this.fetchOptions?.headers ?? {},
          "Content-Type": "text/plain"
        },
        body: txhex
      },
      validate
    );
    if (error) {
      throw new Error(error?.message || JSON.stringify(error));
    }
    return result;
  }
  /** GET /api/v2/tickers-list[?timestamp=] */
  async getTickersList(timestamp) {
    const validate = !this.disableTypeValidation ? ajv.compile(
      AvailableVsCurrenciesSchemaOrError
    ) : void 0;
    const result = await fetchAndValidate(
      `${this.baseUrl}/api/v2/tickers-list${toQueryString({ timestamp })}`,
      this.fetchOptions,
      validate
    );
    if (result?.error) {
      throw new Error(result?.error);
    }
    return result;
  }
  /** GET /api/v2/tickers[?currency=currency&timestamp=timestamp] */
  async getTickers(currency, timestamp) {
    const validate = !this.disableTypeValidation ? ajv.compile(FiatTickerSchemaOrError) : void 0;
    const result = await fetchAndValidate(
      `${this.baseUrl}/api/v2/tickers${toQueryString({ currency, timestamp })}`,
      this.fetchOptions,
      validate
    );
    if (result?.error) {
      throw new Error(result?.error);
    }
    return result;
  }
  /** GET /api/v2/balancehistory/<XPUB | address>?...  */
  async getBalanceHistory(addrOrXpub, opts) {
    const validate = !this.disableTypeValidation ? ajv.compile(BalanceHistoryArraySchemaOrError) : void 0;
    const result = await fetchAndValidate(
      `${this.baseUrl}/api/v2/balancehistory/${addrOrXpub}${toQueryString(opts)}`,
      this.fetchOptions,
      validate
    );
    if (result?.error) {
      throw new Error(result?.error);
    }
    return result;
  }
  /** GET /api/v2/estimatefee/<blocks> */
  async estimateFee(blocks = 1) {
    const validate = !this.disableTypeValidation ? ajv.compile(EstimateFeesSchemaOrError) : void 0;
    const { result, error } = await fetchAndValidate(`${this.baseUrl}/api/v2/estimatefee/${blocks}`, this.fetchOptions, validate);
    if (error) {
      throw new Error(error);
    }
    return result;
  }
}

export { APIErrorSchema, AddressAliasSchema, AddressSchema, AddressSchemaOrError, AvailableVsCurrenciesSchema, AvailableVsCurrenciesSchemaOrError, BackendInfoSchema, BalanceHistoryArraySchema, BalanceHistoryArraySchemaOrError, BalanceHistorySchema, BlockInfoSchema, BlockSchema, BlockSchemaOrError, Blockbook, BlockbookInfoSchema, BlocksSchema, ContractInfoSchema, DEFAULT_TIMEOUT, ErrorSchema, EstimateFeesSchema, EstimateFeesSchemaOrError, EthereumInternalTransferSchema, EthereumParsedInputDataSchema, EthereumParsedInputParamSchema, EthereumSpecificSchema, FeeStatsSchema, FiatTickerSchema, FiatTickerSchemaOrError, GetBlockHashSchema, InternalStateColumnSchema, MultiTokenValueSchema, RawBlockSchema, RawBlockSchemaOrError, SendTxSchema, SendTxSchemaOrError, StakingPoolSchema, SystemInfoSchema, TokenSchema, TokenTransferSchema, TxSchema, TxSchemaOrError, UtxoArraySchemaOrError, UtxoSchema, VinSchema, VoutSchema, ajv, fetchAndValidate, sleep, toQueryString };
