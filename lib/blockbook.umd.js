(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["blockbook"] = factory();
	else
		root["blockbook"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 363:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 634:
/***/ (() => {

"use strict";



/***/ }),

/***/ 680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ ajv)
/* harmony export */ });
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(363);
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_0__);


const Ajv = globalThis?.Ajv || globalThis?.ajv2020 || (ajv__WEBPACK_IMPORTED_MODULE_0___default());
const ajv = new Ajv({
  allErrors: true,
  allowUnionTypes: true
});


/***/ }),

/***/ 807:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _l: () => (/* binding */ fetchAndValidate),
/* harmony export */   cS: () => (/* binding */ DEFAULT_TIMEOUT),
/* harmony export */   lV: () => (/* binding */ Blockbook),
/* harmony export */   yy: () => (/* binding */ sleep),
/* harmony export */   zJ: () => (/* binding */ toQueryString)
/* harmony export */ });
/* harmony import */ var _ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(680);
/* harmony import */ var _blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(882);



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
    throw new Error(`Failed to query Blockbook: ${resp.status} ${resp.statusText}`);
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
  if (filteredEntries.length) {
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
    const validate = _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .SystemInfoSchema */ .n2);
    return fetchAndValidate(
      `${this.baseUrl}/api/status`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/block-index/<block height> */
  async getBlockHash(blockHeight) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .GetBlockHashSchema */ .H0) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/block-index/${blockHeight}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/tx/<txid> */
  async getTransaction(txid) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .TxSchema */ .co) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/tx/${txid}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/tx-specific/<txid> */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getTransactionSpecific(txid) {
    const schema = { type: "object" };
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(schema) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/tx-specific/${txid}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/address/<address> */
  async getAddress(address, opts) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .AddressSchema */ .eu) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/address/${address}${toQueryString(opts)}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/xpub/<xpub|descriptor> */
  async getXpub(xpubOrDescriptor, opts) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .AddressSchema */ .eu) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/xpub/${xpubOrDescriptor}${toQueryString(opts)}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/utxo/<addr or xpub or descriptor> */
  async getUtxo(addrOrXpubOrDesc, confirmed) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .UtxoArraySchema */ .HX) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/utxo/${addrOrXpubOrDesc}${toQueryString({ confirmed })}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/block/<block height|block hash> */
  async getBlock(blockHeightOrHash) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .BlockSchema */ .bP) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/block/${blockHeightOrHash}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/rawblock/<block height|block hash> */
  async getRawBlock(blockHeightOrHash) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .RawBlockSchema */ .$1) : void 0;
    const { hex, error } = await fetchAndValidate(
      `${this.baseUrl}/api/v2/rawblock/${blockHeightOrHash}`,
      this.fetchOptions,
      validate
    );
    if (error) {
      throw new Error(JSON.stringify(error));
    }
    return hex;
  }
  /** POST /api/v2/sendtx/ */
  async sendTransaction(txhex) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .SendTxSchema */ .UP) : void 0;
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
      throw new Error(JSON.stringify(error));
    }
    return result;
  }
  /** GET /api/v2/tickers-list[?timestamp=] */
  async getTickersList(timestamp) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .AvailableVsCurrenciesSchema */ .Jt) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/tickers-list${toQueryString({ timestamp })}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/tickers[?currency=currency&timestamp=timestamp] */
  async getTickers(currency, timestamp) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .FiatTickerSchema */ .cF) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/tickers${toQueryString({ currency, timestamp })}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/balancehistory/<XPUB | address>?...  */
  async getBalanceHistory(addrOrXpub, opts) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .BalanceHistoryArraySchema */ .x6) : void 0;
    return fetchAndValidate(
      `${this.baseUrl}/api/v2/balancehistory/${addrOrXpub}${toQueryString(opts)}`,
      this.fetchOptions,
      validate
    );
  }
  /** GET /api/v2/estimatefee/<blocks> */
  async estimateFee(blocks = 1) {
    const validate = !this.disableTypeValidation ? _ajv__WEBPACK_IMPORTED_MODULE_0__/* .ajv */ .S.compile(_blockbook_schemas__WEBPACK_IMPORTED_MODULE_1__/* .EstimateFeesSchema */ .LB) : void 0;
    const { result, error } = await fetchAndValidate(`${this.baseUrl}/api/v2/estimatefee/${blocks}`, this.fetchOptions, validate);
    if (error) {
      throw new Error(JSON.stringify(error));
    }
    return result;
  }
}


/***/ }),

/***/ 882:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $1: () => (/* binding */ RawBlockSchema),
/* harmony export */   CA: () => (/* binding */ APIErrorSchema),
/* harmony export */   CR: () => (/* binding */ UtxoSchema),
/* harmony export */   E1: () => (/* binding */ BlocksSchema),
/* harmony export */   H0: () => (/* binding */ GetBlockHashSchema),
/* harmony export */   HX: () => (/* binding */ UtxoArraySchema),
/* harmony export */   J$: () => (/* binding */ EthereumParsedInputParamSchema),
/* harmony export */   Jt: () => (/* binding */ AvailableVsCurrenciesSchema),
/* harmony export */   KN: () => (/* binding */ TokenTransferSchema),
/* harmony export */   LB: () => (/* binding */ EstimateFeesSchema),
/* harmony export */   LG: () => (/* binding */ BlockRawSchema),
/* harmony export */   MM: () => (/* binding */ AddressAliasSchema),
/* harmony export */   Ng: () => (/* binding */ FeeStatsSchema),
/* harmony export */   Oy: () => (/* binding */ InternalStateColumnSchema),
/* harmony export */   Q1: () => (/* binding */ ContractInfoSchema),
/* harmony export */   TK: () => (/* binding */ MultiTokenValueSchema),
/* harmony export */   UB: () => (/* binding */ EthereumParsedInputDataSchema),
/* harmony export */   UD: () => (/* binding */ BlockbookInfoSchema),
/* harmony export */   UP: () => (/* binding */ SendTxSchema),
/* harmony export */   Xv: () => (/* binding */ VinSchema),
/* harmony export */   bP: () => (/* binding */ BlockSchema),
/* harmony export */   cF: () => (/* binding */ FiatTickerSchema),
/* harmony export */   co: () => (/* binding */ TxSchema),
/* harmony export */   dX: () => (/* binding */ StakingPoolSchema),
/* harmony export */   eu: () => (/* binding */ AddressSchema),
/* harmony export */   h8: () => (/* binding */ BlockInfoSchema),
/* harmony export */   j1: () => (/* binding */ EthereumInternalTransferSchema),
/* harmony export */   mG: () => (/* binding */ VoutSchema),
/* harmony export */   n2: () => (/* binding */ SystemInfoSchema),
/* harmony export */   o5: () => (/* binding */ BackendInfoSchema),
/* harmony export */   oo: () => (/* binding */ BalanceHistorySchema),
/* harmony export */   re: () => (/* binding */ EthereumSpecificSchema),
/* harmony export */   x: () => (/* binding */ TokenSchema),
/* harmony export */   x6: () => (/* binding */ BalanceHistoryArraySchema)
/* harmony export */ });

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
  },
  required: ["type", "standard", "from", "to", "contract", "decimals"]
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
  },
  required: ["type", "standard", "contract", "name", "symbol", "decimals"]
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
  },
  required: ["type", "standard", "name", "transfers", "decimals"]
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
const UtxoArraySchema = {
  type: "array",
  items: UtxoSchema
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
const BlockRawSchema = {
  type: "object",
  properties: {
    hex: { type: "string" }
  },
  required: ["hex"]
};
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
const SendTxSchema = {
  type: "object",
  properties: {
    result: { type: "string" },
    error: {
      type: "object",
      properties: { message: { type: "string" } },
      required: ["message"]
    }
  }
};
const GetBlockHashSchema = {
  type: "object",
  properties: { blockHash: { type: "string" } },
  required: ["blockHash"]
};
const EstimateFeesSchema = {
  type: "object",
  properties: {
    result: {
      type: "string"
    },
    error: {
      type: "string"
    }
  }
};
const RawBlockSchema = {
  type: "object",
  properties: {
    hex: {
      type: "string"
    },
    error: {
      type: "string"
    }
  }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APIErrorSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.CA),
/* harmony export */   AddressAliasSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.MM),
/* harmony export */   AddressSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.eu),
/* harmony export */   AvailableVsCurrenciesSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.Jt),
/* harmony export */   BackendInfoSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.o5),
/* harmony export */   BalanceHistoryArraySchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.x6),
/* harmony export */   BalanceHistorySchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.oo),
/* harmony export */   BlockInfoSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.h8),
/* harmony export */   BlockRawSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.LG),
/* harmony export */   BlockSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.bP),
/* harmony export */   Blockbook: () => (/* reexport safe */ _blockbook__WEBPACK_IMPORTED_MODULE_3__.lV),
/* harmony export */   BlockbookInfoSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.UD),
/* harmony export */   BlocksSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.E1),
/* harmony export */   ContractInfoSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.Q1),
/* harmony export */   DEFAULT_TIMEOUT: () => (/* reexport safe */ _blockbook__WEBPACK_IMPORTED_MODULE_3__.cS),
/* harmony export */   EstimateFeesSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.LB),
/* harmony export */   EthereumInternalTransferSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.j1),
/* harmony export */   EthereumParsedInputDataSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.UB),
/* harmony export */   EthereumParsedInputParamSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.J$),
/* harmony export */   EthereumSpecificSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.re),
/* harmony export */   FeeStatsSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.Ng),
/* harmony export */   FiatTickerSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.cF),
/* harmony export */   GetBlockHashSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.H0),
/* harmony export */   InternalStateColumnSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.Oy),
/* harmony export */   MultiTokenValueSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.TK),
/* harmony export */   RawBlockSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.$1),
/* harmony export */   SendTxSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.UP),
/* harmony export */   StakingPoolSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.dX),
/* harmony export */   SystemInfoSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.n2),
/* harmony export */   TokenSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.x),
/* harmony export */   TokenTransferSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.KN),
/* harmony export */   TxSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.co),
/* harmony export */   UtxoArraySchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.HX),
/* harmony export */   UtxoSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.CR),
/* harmony export */   VinSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.Xv),
/* harmony export */   VoutSchema: () => (/* reexport safe */ _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__.mG),
/* harmony export */   ajv: () => (/* reexport safe */ _ajv__WEBPACK_IMPORTED_MODULE_0__.S),
/* harmony export */   fetchAndValidate: () => (/* reexport safe */ _blockbook__WEBPACK_IMPORTED_MODULE_3__._l),
/* harmony export */   sleep: () => (/* reexport safe */ _blockbook__WEBPACK_IMPORTED_MODULE_3__.yy),
/* harmony export */   toQueryString: () => (/* reexport safe */ _blockbook__WEBPACK_IMPORTED_MODULE_3__.zJ)
/* harmony export */ });
/* harmony import */ var _ajv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(680);
/* harmony import */ var _blockbook_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(634);
/* harmony import */ var _blockbook_api__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blockbook_api__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _blockbook_api__WEBPACK_IMPORTED_MODULE_1__) if(["default","ajv"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _blockbook_api__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _blockbook_schemas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(882);
/* harmony import */ var _blockbook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(807);






})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});