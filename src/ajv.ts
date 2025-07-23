import { Ajv as _Ajv } from 'ajv';

// Singleton Ajv instance
const Ajv =
    (globalThis as { Ajv?: typeof _Ajv })?.Ajv ||
    (globalThis as { ajv2020?: typeof _Ajv })?.ajv2020 ||
    _Ajv;

export const ajv = new Ajv({
    allErrors: true,
    allowUnionTypes: true,
});
