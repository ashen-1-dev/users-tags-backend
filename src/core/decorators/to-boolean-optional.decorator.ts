import {Transform} from "class-transformer";

const optionalBooleanMapper = new Map([
    ['undefined', undefined],
    ['true', true],
    ['', true],
    ['false', false]
]);

export const ToBooleanOptional = () =>
    Transform(({ value }) => optionalBooleanMapper.get(value));