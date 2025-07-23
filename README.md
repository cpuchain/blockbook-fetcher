# Blockbook Fetcher

[![NPM Version](https://img.shields.io/npm/v/blockbook-fetcher)](https://www.npmjs.com/package/blockbook-fetcher)

Blockbook API fetcher for Browser / Node.js with AJV schema validator written in TypeScript

### Features

- Powered by [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which is globally available on Browser / Node.js

- Imported types from [trezor/blockbook](https://github.com/trezor/blockbook/blob/master/blockbook-api.ts) repo

- Schema validation by AJV

- Tested by Node.js's native test runner (Use `yarn test` to run those)

### Documentation / Example usage

Since the code is really simple I recommend reading the source code [./src/blockbook.ts](./src/blockbook.ts) itself.

Refer test cases under `./test` or refer [./example.html](./example.html) of how it could be used.

### LICENSE

MIT License, see [./LICENSE](./LICENSE)