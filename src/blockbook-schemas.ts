/** blockbook-schemas.ts */

export const BackendInfoSchema = {
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

export const InternalStateColumnSchema = {
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

export const BlockbookInfoSchema = {
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
            items: InternalStateColumnSchema,
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

export const SystemInfoSchema = {
    type: 'object',
    properties: {
        blockbook: BlockbookInfoSchema,
        backend: BackendInfoSchema,
    },
    required: ['blockbook', 'backend'],
};

export const GetBlockHashSchema = {
    type: 'object',
    properties: { blockHash: { type: 'string' } },
    required: ['blockHash'],
};

export const APIErrorSchema = {
    type: 'object',
    properties: {
        Text: { type: 'string' },
        Public: { type: 'boolean' },
    },
    required: ['Text', 'Public'],
};

export const AddressAliasSchema = {
    type: 'object',
    properties: {
        Type: { type: 'string' },
        Alias: { type: 'string' },
    },
    required: ['Type', 'Alias'],
};

export const EthereumInternalTransferSchema = {
    type: 'object',
    properties: {
        type: { type: 'number' },
        from: { type: 'string' },
        to: { type: 'string' },
        value: { type: 'string' },
    },
    required: ['type', 'from', 'to', 'value'],
};

export const EthereumParsedInputParamSchema = {
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

export const EthereumParsedInputDataSchema = {
    type: 'object',
    properties: {
        methodId: { type: 'string' },
        name: { type: 'string' },
        function: { type: 'string' },
        params: {
            type: 'array',
            items: EthereumParsedInputParamSchema,
        },
    },
    required: ['methodId', 'name'],
};

export const EthereumSpecificSchema = {
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
        parsedData: EthereumParsedInputDataSchema,
        internalTransfers: {
            type: 'array',
            items: EthereumInternalTransferSchema,
        },
    },
    required: ['status', 'nonce', 'gasLimit'],
};

export const MultiTokenValueSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        value: { type: 'string' },
    },
};

export const TokenTransferSchema = {
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
            items: MultiTokenValueSchema,
        },
    },
    //required: ['type', 'standard', 'from', 'to', 'contract', 'decimals'],
};

export const VoutSchema = {
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

export const VinSchema = {
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

export const TxSchema = {
    type: 'object',
    properties: {
        txid: { type: 'string' },
        version: { type: 'number' },
        lockTime: { type: 'number' },
        vin: {
            type: 'array',
            items: VinSchema,
        },
        vout: {
            type: 'array',
            items: VoutSchema,
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
            items: TokenTransferSchema,
        },
        ethereumSpecific: EthereumSpecificSchema,
        addressAliases: {
            type: 'object',
            additionalProperties: AddressAliasSchema,
        },
    },
    required: ['txid', 'vin', 'vout', 'blockHeight', 'confirmations', 'blockTime', 'value'],
};

export const ErrorSchema = {
    type: 'object',
    properties: {
        error: { type: 'string' },
    },
    required: ['error'],
};

export const TxSchemaOrError = {
    oneOf: [TxSchema, ErrorSchema],
};

export const FeeStatsSchema = {
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

export const StakingPoolSchema = {
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

export const ContractInfoSchema = {
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
    //required: ['type', 'standard', 'contract', 'name', 'symbol', 'decimals'],
};

export const TokenSchema = {
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
            items: MultiTokenValueSchema,
        },
        totalReceived: { type: 'string' },
        totalSent: { type: 'string' },
    },
    //required: ['type', 'standard', 'name', 'transfers', 'decimals'],
};

export const AddressSchema = {
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
            items: TxSchema,
        },
        txids: {
            type: 'array',
            items: { type: 'string' },
        },
        nonce: { type: 'string' },
        usedTokens: { type: 'number' },
        tokens: {
            type: 'array',
            items: TokenSchema,
        },
        secondaryValue: { type: 'number' },
        tokensBaseValue: { type: 'number' },
        tokensSecondaryValue: { type: 'number' },
        totalBaseValue: { type: 'number' },
        totalSecondaryValue: { type: 'number' },
        contractInfo: ContractInfoSchema,
        erc20Contract: ContractInfoSchema,
        addressAliases: {
            type: 'object',
            additionalProperties: AddressAliasSchema,
        },
        stakingPools: {
            type: 'array',
            items: StakingPoolSchema,
        },
    },
    required: ['address', 'balance', 'unconfirmedBalance', 'unconfirmedTxs', 'txs'],
};

export const AddressSchemaOrError = {
    oneOf: [AddressSchema, ErrorSchema],
};

export const UtxoSchema = {
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

export const UtxoArraySchemaOrError = {
    oneOf: [
        {
            type: 'array',
            items: UtxoSchema,
        },
        ErrorSchema,
    ],
};

export const BlockInfoSchema = {
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

export const BlocksSchema = {
    type: 'object',
    properties: {
        page: { type: 'number' },
        totalPages: { type: 'number' },
        itemsOnPage: { type: 'number' },
        blocks: {
            type: 'array',
            items: BlockInfoSchema,
        },
    },
    required: ['blocks'],
};

export const BlockSchema = {
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
            items: TxSchema,
        },
        addressAliases: {
            type: 'object',
            additionalProperties: AddressAliasSchema,
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

export const BlockSchemaOrError = {
    oneOf: [BlockSchema, ErrorSchema],
};

export const RawBlockSchema = {
    type: 'object',
    properties: {
        hex: { type: 'string' },
    },
    required: ['hex'],
};

export const RawBlockSchemaOrError = {
    oneOf: [RawBlockSchema, ErrorSchema],
};

export const SendTxSchema = {
    type: 'object',
    properties: {
        result: { type: 'string' },
    },
};

export const SendTxSchemaOrError = {
    oneOf: [
        SendTxSchema,
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

export const AvailableVsCurrenciesSchema = {
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

export const AvailableVsCurrenciesSchemaOrError = {
    oneOf: [AvailableVsCurrenciesSchema, ErrorSchema],
};

export const FiatTickerSchema = {
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

export const FiatTickerSchemaOrError = {
    oneOf: [FiatTickerSchema, ErrorSchema],
};

export const BalanceHistorySchema = {
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

export const BalanceHistoryArraySchema = {
    type: 'array',
    items: BalanceHistorySchema,
};

export const BalanceHistoryArraySchemaOrError = {
    oneOf: [BalanceHistoryArraySchema, ErrorSchema],
};

export const EstimateFeesSchema = {
    type: 'object',
    properties: {
        result: {
            type: 'string',
        },
    },
};

export const EstimateFeesSchemaOrError = {
    oneOf: [EstimateFeesSchema, ErrorSchema],
};
