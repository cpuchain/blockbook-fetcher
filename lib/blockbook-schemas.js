"use strict";
/** blockbook-schemas.ts */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimateFeesSchemaOrError = exports.EstimateFeesSchema = exports.BalanceHistoryArraySchemaOrError = exports.BalanceHistoryArraySchema = exports.BalanceHistorySchema = exports.FiatTickerSchemaOrError = exports.FiatTickerSchema = exports.AvailableVsCurrenciesSchemaOrError = exports.AvailableVsCurrenciesSchema = exports.SendTxSchemaOrError = exports.SendTxSchema = exports.RawBlockSchemaOrError = exports.RawBlockSchema = exports.BlockSchemaOrError = exports.BlockSchema = exports.BlocksSchema = exports.BlockInfoSchema = exports.UtxoArraySchemaOrError = exports.UtxoSchema = exports.AddressSchemaOrError = exports.AddressSchema = exports.TokenSchema = exports.ContractInfoSchema = exports.StakingPoolSchema = exports.FeeStatsSchema = exports.TxSchemaOrError = exports.ErrorSchema = exports.TxSchema = exports.VinSchema = exports.VoutSchema = exports.TokenTransferSchema = exports.MultiTokenValueSchema = exports.EthereumSpecificSchema = exports.EthereumParsedInputDataSchema = exports.EthereumParsedInputParamSchema = exports.EthereumInternalTransferSchema = exports.AddressAliasSchema = exports.APIErrorSchema = exports.GetBlockHashSchema = exports.SystemInfoSchema = exports.BlockbookInfoSchema = exports.InternalStateColumnSchema = exports.BackendInfoSchema = void 0;
exports.BackendInfoSchema = {
    type: 'object',
    properties: {
        error: { type: 'string' },
        chain: { type: 'string' },
        blocks: { type: 'number' },
        headers: { type: 'number' },
        bestBlockHash: { type: 'string' },
        difficulty: { type: 'string' },
        sizeOnDisk: { type: 'number' },
        version: { type: 'string' },
        subversion: { type: 'string' },
        protocolVersion: { type: 'string' },
        timeOffset: { type: 'number' },
        warnings: { type: 'string' },
        consensus_version: { type: 'string' },
        consensus: {},
    },
};
exports.InternalStateColumnSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        version: { type: 'number' },
        rows: { type: 'number' },
        keyBytes: { type: 'number' },
        valueBytes: { type: 'number' },
        updated: { type: 'string' },
    },
    required: ['name', 'version', 'rows', 'keyBytes', 'valueBytes', 'updated'],
};
exports.BlockbookInfoSchema = {
    type: 'object',
    properties: {
        coin: { type: 'string' },
        network: { type: 'string' },
        host: { type: 'string' },
        version: { type: 'string' },
        gitCommit: { type: 'string' },
        buildTime: { type: 'string' },
        syncMode: { type: 'boolean' },
        initialSync: { type: 'boolean' },
        inSync: { type: 'boolean' },
        bestHeight: { type: 'number' },
        lastBlockTime: { type: 'string' },
        inSyncMempool: { type: 'boolean' },
        lastMempoolTime: { type: 'string' },
        mempoolSize: { type: 'number' },
        decimals: { type: 'number' },
        dbSize: { type: 'number' },
        hasFiatRates: { type: 'boolean' },
        hasTokenFiatRates: { type: 'boolean' },
        currentFiatRatesTime: { type: 'string' },
        historicalFiatRatesTime: { type: 'string' },
        historicalTokenFiatRatesTime: { type: 'string' },
        supportedStakingPools: {
            type: 'array',
            items: { type: 'string' },
        },
        dbSizeFromColumns: { type: 'number' },
        dbColumns: {
            type: 'array',
            items: exports.InternalStateColumnSchema,
        },
        about: { type: 'string' },
    },
    required: [
        'coin',
        'network',
        'host',
        'version',
        'gitCommit',
        'buildTime',
        'syncMode',
        'initialSync',
        'inSync',
        'bestHeight',
        'lastBlockTime',
        'inSyncMempool',
        'lastMempoolTime',
        'mempoolSize',
        'decimals',
        'dbSize',
        'about',
    ],
};
exports.SystemInfoSchema = {
    type: 'object',
    properties: {
        blockbook: exports.BlockbookInfoSchema,
        backend: exports.BackendInfoSchema,
    },
    required: ['blockbook', 'backend'],
};
exports.GetBlockHashSchema = {
    type: 'object',
    properties: { blockHash: { type: 'string' } },
    required: ['blockHash'],
};
exports.APIErrorSchema = {
    type: 'object',
    properties: {
        Text: { type: 'string' },
        Public: { type: 'boolean' },
    },
    required: ['Text', 'Public'],
};
exports.AddressAliasSchema = {
    type: 'object',
    properties: {
        Type: { type: 'string' },
        Alias: { type: 'string' },
    },
    required: ['Type', 'Alias'],
};
exports.EthereumInternalTransferSchema = {
    type: 'object',
    properties: {
        type: { type: 'number' },
        from: { type: 'string' },
        to: { type: 'string' },
        value: { type: 'string' },
    },
    required: ['type', 'from', 'to', 'value'],
};
exports.EthereumParsedInputParamSchema = {
    type: 'object',
    properties: {
        type: { type: 'string' },
        values: {
            type: 'array',
            items: { type: 'string' },
        },
    },
    required: ['type'],
};
exports.EthereumParsedInputDataSchema = {
    type: 'object',
    properties: {
        methodId: { type: 'string' },
        name: { type: 'string' },
        function: { type: 'string' },
        params: {
            type: 'array',
            items: exports.EthereumParsedInputParamSchema,
        },
    },
    required: ['methodId', 'name'],
};
exports.EthereumSpecificSchema = {
    type: 'object',
    properties: {
        type: { type: 'number' },
        createdContract: { type: 'string' },
        status: { type: 'number' },
        error: { type: 'string' },
        nonce: { type: 'number' },
        gasLimit: { type: 'number' },
        gasUsed: { type: 'number' },
        gasPrice: { type: 'string' },
        maxPriorityFeePerGas: { type: 'string' },
        maxFeePerGas: { type: 'string' },
        baseFeePerGas: { type: 'string' },
        l1Fee: { type: 'number' },
        l1FeeScalar: { type: 'string' },
        l1GasPrice: { type: 'string' },
        l1GasUsed: { type: 'number' },
        data: { type: 'string' },
        parsedData: exports.EthereumParsedInputDataSchema,
        internalTransfers: {
            type: 'array',
            items: exports.EthereumInternalTransferSchema,
        },
    },
    required: ['status', 'nonce', 'gasLimit'],
};
exports.MultiTokenValueSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        value: { type: 'string' },
    },
};
exports.TokenTransferSchema = {
    type: 'object',
    properties: {
        type: { type: 'string' }, // enum, but allow as string for compatibility
        standard: { type: 'string' },
        from: { type: 'string' },
        to: { type: 'string' },
        contract: { type: 'string' },
        name: { type: 'string' },
        symbol: { type: 'string' },
        decimals: { type: 'number' },
        value: { type: 'string' },
        multiTokenValues: {
            type: 'array',
            items: exports.MultiTokenValueSchema,
        },
    },
    required: ['type', 'standard', 'from', 'to', 'contract', 'decimals'],
};
exports.VoutSchema = {
    type: 'object',
    properties: {
        value: { type: 'string' },
        n: { type: 'number' },
        spent: { type: 'boolean' },
        spentTxId: { type: 'string' },
        spentIndex: { type: 'number' },
        spentHeight: { type: 'number' },
        hex: { type: 'string' },
        asm: { type: 'string' },
        addresses: {
            // Blockbook sometimes return null for ETH coins
            type: ['array', 'null'],
            items: { type: 'string' },
        },
        isAddress: { type: 'boolean' },
        isOwn: { type: 'boolean' },
        type: { type: 'string' },
    },
    required: ['n', 'addresses', 'isAddress'],
};
exports.VinSchema = {
    type: 'object',
    properties: {
        txid: { type: 'string' },
        vout: { type: 'number' },
        sequence: { type: 'number' },
        n: { type: 'number' },
        addresses: {
            type: 'array',
            items: { type: 'string' },
        },
        isAddress: { type: 'boolean' },
        isOwn: { type: 'boolean' },
        value: { type: 'string' },
        hex: { type: 'string' },
        asm: { type: 'string' },
        coinbase: { type: 'string' },
    },
    required: ['n', 'isAddress'],
};
exports.TxSchema = {
    type: 'object',
    properties: {
        txid: { type: 'string' },
        version: { type: 'number' },
        lockTime: { type: 'number' },
        vin: {
            type: 'array',
            items: exports.VinSchema,
        },
        vout: {
            type: 'array',
            items: exports.VoutSchema,
        },
        blockHash: { type: 'string' },
        blockHeight: { type: 'number' },
        confirmations: { type: 'number' },
        confirmationETABlocks: { type: 'number' },
        confirmationETASeconds: { type: 'number' },
        blockTime: { type: 'number' },
        size: { type: 'number' },
        vsize: { type: 'number' },
        value: { type: 'string' },
        valueIn: { type: 'string' },
        fees: { type: 'string' },
        hex: { type: 'string' },
        rbf: { type: 'boolean' },
        coinSpecificData: {},
        tokenTransfers: {
            type: 'array',
            items: exports.TokenTransferSchema,
        },
        ethereumSpecific: exports.EthereumSpecificSchema,
        addressAliases: {
            type: 'object',
            additionalProperties: exports.AddressAliasSchema,
        },
    },
    required: ['txid', 'vin', 'vout', 'blockHeight', 'confirmations', 'blockTime', 'value'],
};
exports.ErrorSchema = {
    type: 'object',
    properties: {
        error: { type: 'string' },
    },
    required: ['error'],
};
exports.TxSchemaOrError = {
    oneOf: [exports.TxSchema, exports.ErrorSchema],
};
exports.FeeStatsSchema = {
    type: 'object',
    properties: {
        txCount: { type: 'number' },
        totalFeesSat: { type: 'string' },
        averageFeePerKb: { type: 'number' },
        decilesFeePerKb: {
            type: 'array',
            items: { type: 'number' },
        },
    },
    required: ['txCount', 'totalFeesSat', 'averageFeePerKb', 'decilesFeePerKb'],
};
exports.StakingPoolSchema = {
    type: 'object',
    properties: {
        contract: { type: 'string' },
        name: { type: 'string' },
        pendingBalance: { type: 'string' },
        pendingDepositedBalance: { type: 'string' },
        depositedBalance: { type: 'string' },
        withdrawTotalAmount: { type: 'string' },
        claimableAmount: { type: 'string' },
        restakedReward: { type: 'string' },
        autocompoundBalance: { type: 'string' },
    },
    required: [
        'contract',
        'name',
        'pendingBalance',
        'pendingDepositedBalance',
        'depositedBalance',
        'withdrawTotalAmount',
        'claimableAmount',
        'restakedReward',
        'autocompoundBalance',
    ],
};
exports.ContractInfoSchema = {
    type: 'object',
    properties: {
        type: { type: 'string' },
        standard: { type: 'string' },
        contract: { type: 'string' },
        name: { type: 'string' },
        symbol: { type: 'string' },
        decimals: { type: 'number' },
        createdInBlock: { type: 'number' },
        destructedInBlock: { type: 'number' },
    },
    required: ['type', 'standard', 'contract', 'name', 'symbol', 'decimals'],
};
exports.TokenSchema = {
    type: 'object',
    properties: {
        type: { type: 'string' },
        standard: { type: 'string' },
        name: { type: 'string' },
        path: { type: 'string' },
        contract: { type: 'string' },
        transfers: { type: 'number' },
        symbol: { type: 'string' },
        decimals: { type: 'number' },
        balance: { type: 'string' },
        baseValue: { type: 'number' },
        secondaryValue: { type: 'number' },
        ids: {
            type: 'array',
            items: { type: 'string' },
        },
        multiTokenValues: {
            type: 'array',
            items: exports.MultiTokenValueSchema,
        },
        totalReceived: { type: 'string' },
        totalSent: { type: 'string' },
    },
    required: ['type', 'standard', 'name', 'transfers', 'decimals'],
};
exports.AddressSchema = {
    type: 'object',
    properties: {
        page: { type: 'number' },
        totalPages: { type: 'number' },
        itemsOnPage: { type: 'number' },
        address: { type: 'string' },
        balance: { type: 'string' },
        totalReceived: { type: 'string' },
        totalSent: { type: 'string' },
        unconfirmedBalance: { type: 'string' },
        unconfirmedTxs: { type: 'number' },
        unconfirmedSending: { type: 'string' },
        unconfirmedReceiving: { type: 'string' },
        txs: { type: 'number' },
        addrTxCount: { type: 'number' },
        nonTokenTxs: { type: 'number' },
        internalTxs: { type: 'number' },
        transactions: {
            type: 'array',
            items: exports.TxSchema,
        },
        txids: {
            type: 'array',
            items: { type: 'string' },
        },
        nonce: { type: 'string' },
        usedTokens: { type: 'number' },
        tokens: {
            type: 'array',
            items: exports.TokenSchema,
        },
        secondaryValue: { type: 'number' },
        tokensBaseValue: { type: 'number' },
        tokensSecondaryValue: { type: 'number' },
        totalBaseValue: { type: 'number' },
        totalSecondaryValue: { type: 'number' },
        contractInfo: exports.ContractInfoSchema,
        erc20Contract: exports.ContractInfoSchema,
        addressAliases: {
            type: 'object',
            additionalProperties: exports.AddressAliasSchema,
        },
        stakingPools: {
            type: 'array',
            items: exports.StakingPoolSchema,
        },
    },
    required: ['address', 'balance', 'unconfirmedBalance', 'unconfirmedTxs', 'txs'],
};
exports.AddressSchemaOrError = {
    oneOf: [exports.AddressSchema, exports.ErrorSchema],
};
exports.UtxoSchema = {
    type: 'object',
    properties: {
        txid: { type: 'string' },
        vout: { type: 'number' },
        value: { type: 'string' },
        height: { type: 'number' },
        confirmations: { type: 'number' },
        address: { type: 'string' },
        path: { type: 'string' },
        lockTime: { type: 'number' },
        coinbase: { type: 'boolean' },
    },
    required: ['txid', 'vout', 'value', 'confirmations'],
};
exports.UtxoArraySchemaOrError = {
    oneOf: [
        {
            type: 'array',
            items: exports.UtxoSchema,
        },
        exports.ErrorSchema,
    ],
};
exports.BlockInfoSchema = {
    type: 'object',
    properties: {
        Hash: { type: 'string' },
        Time: { type: 'number' },
        Txs: { type: 'number' },
        Size: { type: 'number' },
        Height: { type: 'number' },
    },
    required: ['Hash', 'Time', 'Txs', 'Size', 'Height'],
};
exports.BlocksSchema = {
    type: 'object',
    properties: {
        page: { type: 'number' },
        totalPages: { type: 'number' },
        itemsOnPage: { type: 'number' },
        blocks: {
            type: 'array',
            items: exports.BlockInfoSchema,
        },
    },
    required: ['blocks'],
};
exports.BlockSchema = {
    type: 'object',
    properties: {
        page: { type: 'number' },
        totalPages: { type: 'number' },
        itemsOnPage: { type: 'number' },
        hash: { type: 'string' },
        previousBlockHash: { type: 'string' },
        nextBlockHash: { type: 'string' },
        height: { type: 'number' },
        confirmations: { type: 'number' },
        size: { type: 'number' },
        time: { type: 'number' },
        version: { type: ['string', 'number'] },
        merkleRoot: { type: 'string' },
        nonce: { type: 'string' },
        bits: { type: 'string' },
        difficulty: { type: 'string' },
        tx: {
            type: 'array',
            items: { type: 'string' },
        },
        txCount: { type: 'number' },
        txs: {
            type: 'array',
            items: exports.TxSchema,
        },
        addressAliases: {
            type: 'object',
            additionalProperties: exports.AddressAliasSchema,
        },
    },
    required: [
        'hash',
        'height',
        'confirmations',
        'size',
        'merkleRoot',
        'bits',
        'difficulty',
        'txCount',
    ],
};
exports.BlockSchemaOrError = {
    oneOf: [exports.BlockSchema, exports.ErrorSchema],
};
exports.RawBlockSchema = {
    type: 'object',
    properties: {
        hex: { type: 'string' },
    },
    required: ['hex'],
};
exports.RawBlockSchemaOrError = {
    oneOf: [exports.RawBlockSchema, exports.ErrorSchema],
};
exports.SendTxSchema = {
    type: 'object',
    properties: {
        result: { type: 'string' },
    },
};
exports.SendTxSchemaOrError = {
    oneOf: [
        exports.SendTxSchema,
        {
            type: 'object',
            properties: {
                error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                    required: ['message'],
                },
            },
            required: ['error'],
        },
    ],
};
exports.AvailableVsCurrenciesSchema = {
    type: 'object',
    properties: {
        ts: { type: 'number', nullable: true },
        available_currencies: {
            type: 'array',
            items: { type: 'string' },
        },
        error: { type: 'string', nullable: true },
    },
    required: ['available_currencies'],
};
exports.AvailableVsCurrenciesSchemaOrError = {
    oneOf: [exports.AvailableVsCurrenciesSchema, exports.ErrorSchema],
};
exports.FiatTickerSchema = {
    type: 'object',
    properties: {
        ts: { type: 'number', nullable: true },
        rates: {
            type: 'object',
            additionalProperties: { type: 'number' },
        },
        error: { type: 'string', nullable: true },
    },
    required: ['rates'],
};
exports.FiatTickerSchemaOrError = {
    oneOf: [exports.FiatTickerSchema, exports.ErrorSchema],
};
exports.BalanceHistorySchema = {
    type: 'object',
    properties: {
        time: { type: 'number' },
        txs: { type: 'number' },
        received: { type: 'string' },
        sent: { type: 'string' },
        sentToSelf: { type: 'string' },
        rates: {
            type: 'object',
            additionalProperties: { type: 'number' },
        },
        txid: { type: 'string' },
    },
    required: ['time', 'txs', 'received', 'sent', 'sentToSelf'],
};
exports.BalanceHistoryArraySchema = {
    type: 'array',
    items: exports.BalanceHistorySchema,
};
exports.BalanceHistoryArraySchemaOrError = {
    oneOf: [exports.BalanceHistoryArraySchema, exports.ErrorSchema],
};
exports.EstimateFeesSchema = {
    type: 'object',
    properties: {
        result: {
            type: 'string',
        },
    },
};
exports.EstimateFeesSchemaOrError = {
    oneOf: [exports.EstimateFeesSchema, exports.ErrorSchema],
};
