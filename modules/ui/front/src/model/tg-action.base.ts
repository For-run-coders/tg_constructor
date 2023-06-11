import { NullableType } from './nullable-type';

export interface TgActionBase {
    name: string;
    description: string;
    fields: TgActionField[];
}

export interface TgActionField {
    name: string;
    description: string;
    type: string;
}

export type NullableTgActionBase = NullableType<TgActionBase>;
