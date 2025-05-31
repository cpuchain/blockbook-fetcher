const path = require('path');

const config = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',
                    target: 'es2022',
                }
            }
        ]
    },
    entry: './src/index.ts',
    output: {
        filename: 'blockbook.umd.js',
        path: path.resolve(__dirname, './lib'),
        library: 'blockbook',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            ajv: false,
        },
    },
    optimization: {
        minimize: false,
    },
}

module.exports = [
    config,
    {
        ...config,
        output: {
            filename: 'blockbook.umd.min.js',
            path: path.resolve(__dirname, './lib'),
            library: 'blockbook',
            libraryTarget: 'umd',
        },
        optimization: {},
    },
]