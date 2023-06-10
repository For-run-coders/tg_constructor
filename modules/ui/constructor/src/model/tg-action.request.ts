import { TgActionField } from './tg-action.base';

export interface TgActionRequest {
    id: string;
    name: string;
    fields: TgActionFieldRequest[];
}

export interface TgActionFieldRequest extends TgActionField {
    value: string;
}
