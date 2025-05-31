/** blockbook-schemas.ts */
export declare const APIErrorSchema: {
    type: string;
    properties: {
        Text: {
            type: string;
        };
        Public: {
            type: string;
        };
    };
    required: string[];
};
export declare const AddressAliasSchema: {
    type: string;
    properties: {
        Type: {
            type: string;
        };
        Alias: {
            type: string;
        };
    };
    required: string[];
};
export declare const EthereumInternalTransferSchema: {
    type: string;
    properties: {
        type: {
            type: string;
        };
        from: {
            type: string;
        };
        to: {
            type: string;
        };
        value: {
            type: string;
        };
    };
    required: string[];
};
export declare const EthereumParsedInputParamSchema: {
    type: string;
    properties: {
        type: {
            type: string;
        };
        values: {
            type: string;
            items: {
                type: string;
            };
        };
    };
    required: string[];
};
export declare const EthereumParsedInputDataSchema: {
    type: string;
    properties: {
        methodId: {
            type: string;
        };
        name: {
            type: string;
        };
        function: {
            type: string;
        };
        params: {
            type: string;
            items: {
                type: string;
                properties: {
                    type: {
                        type: string;
                    };
                    values: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export declare const EthereumSpecificSchema: {
    type: string;
    properties: {
        type: {
            type: string;
        };
        createdContract: {
            type: string;
        };
        status: {
            type: string;
        };
        error: {
            type: string;
        };
        nonce: {
            type: string;
        };
        gasLimit: {
            type: string;
        };
        gasUsed: {
            type: string;
        };
        gasPrice: {
            type: string;
        };
        maxPriorityFeePerGas: {
            type: string;
        };
        maxFeePerGas: {
            type: string;
        };
        baseFeePerGas: {
            type: string;
        };
        l1Fee: {
            type: string;
        };
        l1FeeScalar: {
            type: string;
        };
        l1GasPrice: {
            type: string;
        };
        l1GasUsed: {
            type: string;
        };
        data: {
            type: string;
        };
        parsedData: {
            type: string;
            properties: {
                methodId: {
                    type: string;
                };
                name: {
                    type: string;
                };
                function: {
                    type: string;
                };
                params: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            type: {
                                type: string;
                            };
                            values: {
                                type: string;
                                items: {
                                    type: string;
                                };
                            };
                        };
                        required: string[];
                    };
                };
            };
            required: string[];
        };
        internalTransfers: {
            type: string;
            items: {
                type: string;
                properties: {
                    type: {
                        type: string;
                    };
                    from: {
                        type: string;
                    };
                    to: {
                        type: string;
                    };
                    value: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export declare const MultiTokenValueSchema: {
    type: string;
    properties: {
        id: {
            type: string;
        };
        value: {
            type: string;
        };
    };
};
export declare const TokenTransferSchema: {
    type: string;
    properties: {
        type: {
            type: string;
        };
        standard: {
            type: string;
        };
        from: {
            type: string;
        };
        to: {
            type: string;
        };
        contract: {
            type: string;
        };
        name: {
            type: string;
        };
        symbol: {
            type: string;
        };
        decimals: {
            type: string;
        };
        value: {
            type: string;
        };
        multiTokenValues: {
            type: string;
            items: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    value: {
                        type: string;
                    };
                };
            };
        };
    };
    required: string[];
};
export declare const VoutSchema: {
    type: string;
    properties: {
        value: {
            type: string;
        };
        n: {
            type: string;
        };
        spent: {
            type: string;
        };
        spentTxId: {
            type: string;
        };
        spentIndex: {
            type: string;
        };
        spentHeight: {
            type: string;
        };
        hex: {
            type: string;
        };
        asm: {
            type: string;
        };
        addresses: {
            type: string;
            items: {
                type: string;
            };
        };
        isAddress: {
            type: string;
        };
        isOwn: {
            type: string;
        };
        type: {
            type: string;
        };
    };
    required: string[];
};
export declare const VinSchema: {
    type: string;
    properties: {
        txid: {
            type: string;
        };
        vout: {
            type: string;
        };
        sequence: {
            type: string;
        };
        n: {
            type: string;
        };
        addresses: {
            type: string;
            items: {
                type: string;
            };
        };
        isAddress: {
            type: string;
        };
        isOwn: {
            type: string;
        };
        value: {
            type: string;
        };
        hex: {
            type: string;
        };
        asm: {
            type: string;
        };
        coinbase: {
            type: string;
        };
    };
    required: string[];
};
export declare const TxSchema: {
    type: string;
    properties: {
        txid: {
            type: string;
        };
        version: {
            type: string;
        };
        lockTime: {
            type: string;
        };
        vin: {
            type: string;
            items: {
                type: string;
                properties: {
                    txid: {
                        type: string;
                    };
                    vout: {
                        type: string;
                    };
                    sequence: {
                        type: string;
                    };
                    n: {
                        type: string;
                    };
                    addresses: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    isAddress: {
                        type: string;
                    };
                    isOwn: {
                        type: string;
                    };
                    value: {
                        type: string;
                    };
                    hex: {
                        type: string;
                    };
                    asm: {
                        type: string;
                    };
                    coinbase: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
        vout: {
            type: string;
            items: {
                type: string;
                properties: {
                    value: {
                        type: string;
                    };
                    n: {
                        type: string;
                    };
                    spent: {
                        type: string;
                    };
                    spentTxId: {
                        type: string;
                    };
                    spentIndex: {
                        type: string;
                    };
                    spentHeight: {
                        type: string;
                    };
                    hex: {
                        type: string;
                    };
                    asm: {
                        type: string;
                    };
                    addresses: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    isAddress: {
                        type: string;
                    };
                    isOwn: {
                        type: string;
                    };
                    type: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
        blockHash: {
            type: string;
        };
        blockHeight: {
            type: string;
        };
        confirmations: {
            type: string;
        };
        confirmationETABlocks: {
            type: string;
        };
        confirmationETASeconds: {
            type: string;
        };
        blockTime: {
            type: string;
        };
        size: {
            type: string;
        };
        vsize: {
            type: string;
        };
        value: {
            type: string;
        };
        valueIn: {
            type: string;
        };
        fees: {
            type: string;
        };
        hex: {
            type: string;
        };
        rbf: {
            type: string;
        };
        coinSpecificData: {};
        tokenTransfers: {
            type: string;
            items: {
                type: string;
                properties: {
                    type: {
                        type: string;
                    };
                    standard: {
                        type: string;
                    };
                    from: {
                        type: string;
                    };
                    to: {
                        type: string;
                    };
                    contract: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    symbol: {
                        type: string;
                    };
                    decimals: {
                        type: string;
                    };
                    value: {
                        type: string;
                    };
                    multiTokenValues: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                id: {
                                    type: string;
                                };
                                value: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
                required: string[];
            };
        };
        ethereumSpecific: {
            type: string;
            properties: {
                type: {
                    type: string;
                };
                createdContract: {
                    type: string;
                };
                status: {
                    type: string;
                };
                error: {
                    type: string;
                };
                nonce: {
                    type: string;
                };
                gasLimit: {
                    type: string;
                };
                gasUsed: {
                    type: string;
                };
                gasPrice: {
                    type: string;
                };
                maxPriorityFeePerGas: {
                    type: string;
                };
                maxFeePerGas: {
                    type: string;
                };
                baseFeePerGas: {
                    type: string;
                };
                l1Fee: {
                    type: string;
                };
                l1FeeScalar: {
                    type: string;
                };
                l1GasPrice: {
                    type: string;
                };
                l1GasUsed: {
                    type: string;
                };
                data: {
                    type: string;
                };
                parsedData: {
                    type: string;
                    properties: {
                        methodId: {
                            type: string;
                        };
                        name: {
                            type: string;
                        };
                        function: {
                            type: string;
                        };
                        params: {
                            type: string;
                            items: {
                                type: string;
                                properties: {
                                    type: {
                                        type: string;
                                    };
                                    values: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                    required: string[];
                };
                internalTransfers: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            type: {
                                type: string;
                            };
                            from: {
                                type: string;
                            };
                            to: {
                                type: string;
                            };
                            value: {
                                type: string;
                            };
                        };
                        required: string[];
                    };
                };
            };
            required: string[];
        };
        addressAliases: {
            type: string;
            additionalProperties: {
                type: string;
                properties: {
                    Type: {
                        type: string;
                    };
                    Alias: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export declare const FeeStatsSchema: {
    type: string;
    properties: {
        txCount: {
            type: string;
        };
        totalFeesSat: {
            type: string;
        };
        averageFeePerKb: {
            type: string;
        };
        decilesFeePerKb: {
            type: string;
            items: {
                type: string;
            };
        };
    };
    required: string[];
};
export declare const StakingPoolSchema: {
    type: string;
    properties: {
        contract: {
            type: string;
        };
        name: {
            type: string;
        };
        pendingBalance: {
            type: string;
        };
        pendingDepositedBalance: {
            type: string;
        };
        depositedBalance: {
            type: string;
        };
        withdrawTotalAmount: {
            type: string;
        };
        claimableAmount: {
            type: string;
        };
        restakedReward: {
            type: string;
        };
        autocompoundBalance: {
            type: string;
        };
    };
    required: string[];
};
export declare const ContractInfoSchema: {
    type: string;
    properties: {
        type: {
            type: string;
        };
        standard: {
            type: string;
        };
        contract: {
            type: string;
        };
        name: {
            type: string;
        };
        symbol: {
            type: string;
        };
        decimals: {
            type: string;
        };
        createdInBlock: {
            type: string;
        };
        destructedInBlock: {
            type: string;
        };
    };
    required: string[];
};
export declare const TokenSchema: {
    type: string;
    properties: {
        type: {
            type: string;
        };
        standard: {
            type: string;
        };
        name: {
            type: string;
        };
        path: {
            type: string;
        };
        contract: {
            type: string;
        };
        transfers: {
            type: string;
        };
        symbol: {
            type: string;
        };
        decimals: {
            type: string;
        };
        balance: {
            type: string;
        };
        baseValue: {
            type: string;
        };
        secondaryValue: {
            type: string;
        };
        ids: {
            type: string;
            items: {
                type: string;
            };
        };
        multiTokenValues: {
            type: string;
            items: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    value: {
                        type: string;
                    };
                };
            };
        };
        totalReceived: {
            type: string;
        };
        totalSent: {
            type: string;
        };
    };
    required: string[];
};
export declare const AddressSchema: {
    type: string;
    properties: {
        page: {
            type: string;
        };
        totalPages: {
            type: string;
        };
        itemsOnPage: {
            type: string;
        };
        address: {
            type: string;
        };
        balance: {
            type: string;
        };
        totalReceived: {
            type: string;
        };
        totalSent: {
            type: string;
        };
        unconfirmedBalance: {
            type: string;
        };
        unconfirmedTxs: {
            type: string;
        };
        unconfirmedSending: {
            type: string;
        };
        unconfirmedReceiving: {
            type: string;
        };
        txs: {
            type: string;
        };
        addrTxCount: {
            type: string;
        };
        nonTokenTxs: {
            type: string;
        };
        internalTxs: {
            type: string;
        };
        transactions: {
            type: string;
            items: {
                type: string;
                properties: {
                    txid: {
                        type: string;
                    };
                    version: {
                        type: string;
                    };
                    lockTime: {
                        type: string;
                    };
                    vin: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                txid: {
                                    type: string;
                                };
                                vout: {
                                    type: string;
                                };
                                sequence: {
                                    type: string;
                                };
                                n: {
                                    type: string;
                                };
                                addresses: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                isAddress: {
                                    type: string;
                                };
                                isOwn: {
                                    type: string;
                                };
                                value: {
                                    type: string;
                                };
                                hex: {
                                    type: string;
                                };
                                asm: {
                                    type: string;
                                };
                                coinbase: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                    vout: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                value: {
                                    type: string;
                                };
                                n: {
                                    type: string;
                                };
                                spent: {
                                    type: string;
                                };
                                spentTxId: {
                                    type: string;
                                };
                                spentIndex: {
                                    type: string;
                                };
                                spentHeight: {
                                    type: string;
                                };
                                hex: {
                                    type: string;
                                };
                                asm: {
                                    type: string;
                                };
                                addresses: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                isAddress: {
                                    type: string;
                                };
                                isOwn: {
                                    type: string;
                                };
                                type: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                    blockHash: {
                        type: string;
                    };
                    blockHeight: {
                        type: string;
                    };
                    confirmations: {
                        type: string;
                    };
                    confirmationETABlocks: {
                        type: string;
                    };
                    confirmationETASeconds: {
                        type: string;
                    };
                    blockTime: {
                        type: string;
                    };
                    size: {
                        type: string;
                    };
                    vsize: {
                        type: string;
                    };
                    value: {
                        type: string;
                    };
                    valueIn: {
                        type: string;
                    };
                    fees: {
                        type: string;
                    };
                    hex: {
                        type: string;
                    };
                    rbf: {
                        type: string;
                    };
                    coinSpecificData: {};
                    tokenTransfers: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                type: {
                                    type: string;
                                };
                                standard: {
                                    type: string;
                                };
                                from: {
                                    type: string;
                                };
                                to: {
                                    type: string;
                                };
                                contract: {
                                    type: string;
                                };
                                name: {
                                    type: string;
                                };
                                symbol: {
                                    type: string;
                                };
                                decimals: {
                                    type: string;
                                };
                                value: {
                                    type: string;
                                };
                                multiTokenValues: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            id: {
                                                type: string;
                                            };
                                            value: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                            required: string[];
                        };
                    };
                    ethereumSpecific: {
                        type: string;
                        properties: {
                            type: {
                                type: string;
                            };
                            createdContract: {
                                type: string;
                            };
                            status: {
                                type: string;
                            };
                            error: {
                                type: string;
                            };
                            nonce: {
                                type: string;
                            };
                            gasLimit: {
                                type: string;
                            };
                            gasUsed: {
                                type: string;
                            };
                            gasPrice: {
                                type: string;
                            };
                            maxPriorityFeePerGas: {
                                type: string;
                            };
                            maxFeePerGas: {
                                type: string;
                            };
                            baseFeePerGas: {
                                type: string;
                            };
                            l1Fee: {
                                type: string;
                            };
                            l1FeeScalar: {
                                type: string;
                            };
                            l1GasPrice: {
                                type: string;
                            };
                            l1GasUsed: {
                                type: string;
                            };
                            data: {
                                type: string;
                            };
                            parsedData: {
                                type: string;
                                properties: {
                                    methodId: {
                                        type: string;
                                    };
                                    name: {
                                        type: string;
                                    };
                                    function: {
                                        type: string;
                                    };
                                    params: {
                                        type: string;
                                        items: {
                                            type: string;
                                            properties: {
                                                type: {
                                                    type: string;
                                                };
                                                values: {
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                                required: string[];
                            };
                            internalTransfers: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        type: {
                                            type: string;
                                        };
                                        from: {
                                            type: string;
                                        };
                                        to: {
                                            type: string;
                                        };
                                        value: {
                                            type: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                        required: string[];
                    };
                    addressAliases: {
                        type: string;
                        additionalProperties: {
                            type: string;
                            properties: {
                                Type: {
                                    type: string;
                                };
                                Alias: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                };
                required: string[];
            };
        };
        txids: {
            type: string;
            items: {
                type: string;
            };
        };
        nonce: {
            type: string;
        };
        usedTokens: {
            type: string;
        };
        tokens: {
            type: string;
            items: {
                type: string;
                properties: {
                    type: {
                        type: string;
                    };
                    standard: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    path: {
                        type: string;
                    };
                    contract: {
                        type: string;
                    };
                    transfers: {
                        type: string;
                    };
                    symbol: {
                        type: string;
                    };
                    decimals: {
                        type: string;
                    };
                    balance: {
                        type: string;
                    };
                    baseValue: {
                        type: string;
                    };
                    secondaryValue: {
                        type: string;
                    };
                    ids: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    multiTokenValues: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                id: {
                                    type: string;
                                };
                                value: {
                                    type: string;
                                };
                            };
                        };
                    };
                    totalReceived: {
                        type: string;
                    };
                    totalSent: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
        secondaryValue: {
            type: string;
        };
        tokensBaseValue: {
            type: string;
        };
        tokensSecondaryValue: {
            type: string;
        };
        totalBaseValue: {
            type: string;
        };
        totalSecondaryValue: {
            type: string;
        };
        contractInfo: {
            type: string;
            properties: {
                type: {
                    type: string;
                };
                standard: {
                    type: string;
                };
                contract: {
                    type: string;
                };
                name: {
                    type: string;
                };
                symbol: {
                    type: string;
                };
                decimals: {
                    type: string;
                };
                createdInBlock: {
                    type: string;
                };
                destructedInBlock: {
                    type: string;
                };
            };
            required: string[];
        };
        erc20Contract: {
            type: string;
            properties: {
                type: {
                    type: string;
                };
                standard: {
                    type: string;
                };
                contract: {
                    type: string;
                };
                name: {
                    type: string;
                };
                symbol: {
                    type: string;
                };
                decimals: {
                    type: string;
                };
                createdInBlock: {
                    type: string;
                };
                destructedInBlock: {
                    type: string;
                };
            };
            required: string[];
        };
        addressAliases: {
            type: string;
            additionalProperties: {
                type: string;
                properties: {
                    Type: {
                        type: string;
                    };
                    Alias: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
        stakingPools: {
            type: string;
            items: {
                type: string;
                properties: {
                    contract: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    pendingBalance: {
                        type: string;
                    };
                    pendingDepositedBalance: {
                        type: string;
                    };
                    depositedBalance: {
                        type: string;
                    };
                    withdrawTotalAmount: {
                        type: string;
                    };
                    claimableAmount: {
                        type: string;
                    };
                    restakedReward: {
                        type: string;
                    };
                    autocompoundBalance: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export declare const UtxoSchema: {
    type: string;
    properties: {
        txid: {
            type: string;
        };
        vout: {
            type: string;
        };
        value: {
            type: string;
        };
        height: {
            type: string;
        };
        confirmations: {
            type: string;
        };
        address: {
            type: string;
        };
        path: {
            type: string;
        };
        lockTime: {
            type: string;
        };
        coinbase: {
            type: string;
        };
    };
    required: string[];
};
export declare const UtxoArraySchema: {
    type: string;
    items: {
        type: string;
        properties: {
            txid: {
                type: string;
            };
            vout: {
                type: string;
            };
            value: {
                type: string;
            };
            height: {
                type: string;
            };
            confirmations: {
                type: string;
            };
            address: {
                type: string;
            };
            path: {
                type: string;
            };
            lockTime: {
                type: string;
            };
            coinbase: {
                type: string;
            };
        };
        required: string[];
    };
};
export declare const BalanceHistorySchema: {
    type: string;
    properties: {
        time: {
            type: string;
        };
        txs: {
            type: string;
        };
        received: {
            type: string;
        };
        sent: {
            type: string;
        };
        sentToSelf: {
            type: string;
        };
        rates: {
            type: string;
            additionalProperties: {
                type: string;
            };
        };
        txid: {
            type: string;
        };
    };
    required: string[];
};
export declare const BalanceHistoryArraySchema: {
    type: string;
    items: {
        type: string;
        properties: {
            time: {
                type: string;
            };
            txs: {
                type: string;
            };
            received: {
                type: string;
            };
            sent: {
                type: string;
            };
            sentToSelf: {
                type: string;
            };
            rates: {
                type: string;
                additionalProperties: {
                    type: string;
                };
            };
            txid: {
                type: string;
            };
        };
        required: string[];
    };
};
export declare const BlockInfoSchema: {
    type: string;
    properties: {
        Hash: {
            type: string;
        };
        Time: {
            type: string;
        };
        Txs: {
            type: string;
        };
        Size: {
            type: string;
        };
        Height: {
            type: string;
        };
    };
    required: string[];
};
export declare const BlocksSchema: {
    type: string;
    properties: {
        page: {
            type: string;
        };
        totalPages: {
            type: string;
        };
        itemsOnPage: {
            type: string;
        };
        blocks: {
            type: string;
            items: {
                type: string;
                properties: {
                    Hash: {
                        type: string;
                    };
                    Time: {
                        type: string;
                    };
                    Txs: {
                        type: string;
                    };
                    Size: {
                        type: string;
                    };
                    Height: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export declare const BlockSchema: {
    type: string;
    properties: {
        page: {
            type: string;
        };
        totalPages: {
            type: string;
        };
        itemsOnPage: {
            type: string;
        };
        hash: {
            type: string;
        };
        previousBlockHash: {
            type: string;
        };
        nextBlockHash: {
            type: string;
        };
        height: {
            type: string;
        };
        confirmations: {
            type: string;
        };
        size: {
            type: string;
        };
        time: {
            type: string;
        };
        version: {
            type: string[];
        };
        merkleRoot: {
            type: string;
        };
        nonce: {
            type: string;
        };
        bits: {
            type: string;
        };
        difficulty: {
            type: string;
        };
        tx: {
            type: string;
            items: {
                type: string;
            };
        };
        txCount: {
            type: string;
        };
        txs: {
            type: string;
            items: {
                type: string;
                properties: {
                    txid: {
                        type: string;
                    };
                    version: {
                        type: string;
                    };
                    lockTime: {
                        type: string;
                    };
                    vin: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                txid: {
                                    type: string;
                                };
                                vout: {
                                    type: string;
                                };
                                sequence: {
                                    type: string;
                                };
                                n: {
                                    type: string;
                                };
                                addresses: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                isAddress: {
                                    type: string;
                                };
                                isOwn: {
                                    type: string;
                                };
                                value: {
                                    type: string;
                                };
                                hex: {
                                    type: string;
                                };
                                asm: {
                                    type: string;
                                };
                                coinbase: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                    vout: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                value: {
                                    type: string;
                                };
                                n: {
                                    type: string;
                                };
                                spent: {
                                    type: string;
                                };
                                spentTxId: {
                                    type: string;
                                };
                                spentIndex: {
                                    type: string;
                                };
                                spentHeight: {
                                    type: string;
                                };
                                hex: {
                                    type: string;
                                };
                                asm: {
                                    type: string;
                                };
                                addresses: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                isAddress: {
                                    type: string;
                                };
                                isOwn: {
                                    type: string;
                                };
                                type: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                    blockHash: {
                        type: string;
                    };
                    blockHeight: {
                        type: string;
                    };
                    confirmations: {
                        type: string;
                    };
                    confirmationETABlocks: {
                        type: string;
                    };
                    confirmationETASeconds: {
                        type: string;
                    };
                    blockTime: {
                        type: string;
                    };
                    size: {
                        type: string;
                    };
                    vsize: {
                        type: string;
                    };
                    value: {
                        type: string;
                    };
                    valueIn: {
                        type: string;
                    };
                    fees: {
                        type: string;
                    };
                    hex: {
                        type: string;
                    };
                    rbf: {
                        type: string;
                    };
                    coinSpecificData: {};
                    tokenTransfers: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                type: {
                                    type: string;
                                };
                                standard: {
                                    type: string;
                                };
                                from: {
                                    type: string;
                                };
                                to: {
                                    type: string;
                                };
                                contract: {
                                    type: string;
                                };
                                name: {
                                    type: string;
                                };
                                symbol: {
                                    type: string;
                                };
                                decimals: {
                                    type: string;
                                };
                                value: {
                                    type: string;
                                };
                                multiTokenValues: {
                                    type: string;
                                    items: {
                                        type: string;
                                        properties: {
                                            id: {
                                                type: string;
                                            };
                                            value: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                            required: string[];
                        };
                    };
                    ethereumSpecific: {
                        type: string;
                        properties: {
                            type: {
                                type: string;
                            };
                            createdContract: {
                                type: string;
                            };
                            status: {
                                type: string;
                            };
                            error: {
                                type: string;
                            };
                            nonce: {
                                type: string;
                            };
                            gasLimit: {
                                type: string;
                            };
                            gasUsed: {
                                type: string;
                            };
                            gasPrice: {
                                type: string;
                            };
                            maxPriorityFeePerGas: {
                                type: string;
                            };
                            maxFeePerGas: {
                                type: string;
                            };
                            baseFeePerGas: {
                                type: string;
                            };
                            l1Fee: {
                                type: string;
                            };
                            l1FeeScalar: {
                                type: string;
                            };
                            l1GasPrice: {
                                type: string;
                            };
                            l1GasUsed: {
                                type: string;
                            };
                            data: {
                                type: string;
                            };
                            parsedData: {
                                type: string;
                                properties: {
                                    methodId: {
                                        type: string;
                                    };
                                    name: {
                                        type: string;
                                    };
                                    function: {
                                        type: string;
                                    };
                                    params: {
                                        type: string;
                                        items: {
                                            type: string;
                                            properties: {
                                                type: {
                                                    type: string;
                                                };
                                                values: {
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                                required: string[];
                            };
                            internalTransfers: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        type: {
                                            type: string;
                                        };
                                        from: {
                                            type: string;
                                        };
                                        to: {
                                            type: string;
                                        };
                                        value: {
                                            type: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                        required: string[];
                    };
                    addressAliases: {
                        type: string;
                        additionalProperties: {
                            type: string;
                            properties: {
                                Type: {
                                    type: string;
                                };
                                Alias: {
                                    type: string;
                                };
                            };
                            required: string[];
                        };
                    };
                };
                required: string[];
            };
        };
        addressAliases: {
            type: string;
            additionalProperties: {
                type: string;
                properties: {
                    Type: {
                        type: string;
                    };
                    Alias: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export declare const BlockRawSchema: {
    type: string;
    properties: {
        hex: {
            type: string;
        };
    };
    required: string[];
};
export declare const BackendInfoSchema: {
    type: string;
    properties: {
        error: {
            type: string;
        };
        chain: {
            type: string;
        };
        blocks: {
            type: string;
        };
        headers: {
            type: string;
        };
        bestBlockHash: {
            type: string;
        };
        difficulty: {
            type: string;
        };
        sizeOnDisk: {
            type: string;
        };
        version: {
            type: string;
        };
        subversion: {
            type: string;
        };
        protocolVersion: {
            type: string;
        };
        timeOffset: {
            type: string;
        };
        warnings: {
            type: string;
        };
        consensus_version: {
            type: string;
        };
        consensus: {};
    };
};
export declare const InternalStateColumnSchema: {
    type: string;
    properties: {
        name: {
            type: string;
        };
        version: {
            type: string;
        };
        rows: {
            type: string;
        };
        keyBytes: {
            type: string;
        };
        valueBytes: {
            type: string;
        };
        updated: {
            type: string;
        };
    };
    required: string[];
};
export declare const BlockbookInfoSchema: {
    type: string;
    properties: {
        coin: {
            type: string;
        };
        network: {
            type: string;
        };
        host: {
            type: string;
        };
        version: {
            type: string;
        };
        gitCommit: {
            type: string;
        };
        buildTime: {
            type: string;
        };
        syncMode: {
            type: string;
        };
        initialSync: {
            type: string;
        };
        inSync: {
            type: string;
        };
        bestHeight: {
            type: string;
        };
        lastBlockTime: {
            type: string;
        };
        inSyncMempool: {
            type: string;
        };
        lastMempoolTime: {
            type: string;
        };
        mempoolSize: {
            type: string;
        };
        decimals: {
            type: string;
        };
        dbSize: {
            type: string;
        };
        hasFiatRates: {
            type: string;
        };
        hasTokenFiatRates: {
            type: string;
        };
        currentFiatRatesTime: {
            type: string;
        };
        historicalFiatRatesTime: {
            type: string;
        };
        historicalTokenFiatRatesTime: {
            type: string;
        };
        supportedStakingPools: {
            type: string;
            items: {
                type: string;
            };
        };
        dbSizeFromColumns: {
            type: string;
        };
        dbColumns: {
            type: string;
            items: {
                type: string;
                properties: {
                    name: {
                        type: string;
                    };
                    version: {
                        type: string;
                    };
                    rows: {
                        type: string;
                    };
                    keyBytes: {
                        type: string;
                    };
                    valueBytes: {
                        type: string;
                    };
                    updated: {
                        type: string;
                    };
                };
                required: string[];
            };
        };
        about: {
            type: string;
        };
    };
    required: string[];
};
export declare const SystemInfoSchema: {
    type: string;
    properties: {
        blockbook: {
            type: string;
            properties: {
                coin: {
                    type: string;
                };
                network: {
                    type: string;
                };
                host: {
                    type: string;
                };
                version: {
                    type: string;
                };
                gitCommit: {
                    type: string;
                };
                buildTime: {
                    type: string;
                };
                syncMode: {
                    type: string;
                };
                initialSync: {
                    type: string;
                };
                inSync: {
                    type: string;
                };
                bestHeight: {
                    type: string;
                };
                lastBlockTime: {
                    type: string;
                };
                inSyncMempool: {
                    type: string;
                };
                lastMempoolTime: {
                    type: string;
                };
                mempoolSize: {
                    type: string;
                };
                decimals: {
                    type: string;
                };
                dbSize: {
                    type: string;
                };
                hasFiatRates: {
                    type: string;
                };
                hasTokenFiatRates: {
                    type: string;
                };
                currentFiatRatesTime: {
                    type: string;
                };
                historicalFiatRatesTime: {
                    type: string;
                };
                historicalTokenFiatRatesTime: {
                    type: string;
                };
                supportedStakingPools: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                dbSizeFromColumns: {
                    type: string;
                };
                dbColumns: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                            };
                            version: {
                                type: string;
                            };
                            rows: {
                                type: string;
                            };
                            keyBytes: {
                                type: string;
                            };
                            valueBytes: {
                                type: string;
                            };
                            updated: {
                                type: string;
                            };
                        };
                        required: string[];
                    };
                };
                about: {
                    type: string;
                };
            };
            required: string[];
        };
        backend: {
            type: string;
            properties: {
                error: {
                    type: string;
                };
                chain: {
                    type: string;
                };
                blocks: {
                    type: string;
                };
                headers: {
                    type: string;
                };
                bestBlockHash: {
                    type: string;
                };
                difficulty: {
                    type: string;
                };
                sizeOnDisk: {
                    type: string;
                };
                version: {
                    type: string;
                };
                subversion: {
                    type: string;
                };
                protocolVersion: {
                    type: string;
                };
                timeOffset: {
                    type: string;
                };
                warnings: {
                    type: string;
                };
                consensus_version: {
                    type: string;
                };
                consensus: {};
            };
        };
    };
    required: string[];
};
export declare const AvailableVsCurrenciesSchema: {
    type: string;
    properties: {
        ts: {
            type: string;
            nullable: boolean;
        };
        available_currencies: {
            type: string;
            items: {
                type: string;
            };
        };
        error: {
            type: string;
            nullable: boolean;
        };
    };
    required: string[];
};
export declare const FiatTickerSchema: {
    type: string;
    properties: {
        ts: {
            type: string;
            nullable: boolean;
        };
        rates: {
            type: string;
            additionalProperties: {
                type: string;
            };
        };
        error: {
            type: string;
            nullable: boolean;
        };
    };
    required: string[];
};
export declare const SendTxSchema: {
    type: string;
    properties: {
        result: {
            type: string;
        };
        error: {
            type: string;
            properties: {
                message: {
                    type: string;
                };
            };
            required: string[];
        };
    };
};
export declare const GetBlockHashSchema: {
    type: string;
    properties: {
        blockHash: {
            type: string;
        };
    };
    required: string[];
};
export declare const EstimateFeesSchema: {
    type: string;
    properties: {
        result: {
            type: string;
        };
        error: {
            type: string;
        };
    };
};
