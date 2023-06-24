import { TgActionBase, TgActionField } from '../model/tg-action.base';
import { TgActionRequest } from '../model/tg-action.request';

export class ActionUtils {

    static makeRequestAction = (action: TgActionBase, id: string): TgActionRequest => {
        return {
            id: id,
            name: action.name,
            childId: '',
            fields: [
                ...action.fields.map((field: TgActionField) => ({
                    ...field,
                    value: '',
                }))
            ],
        };
    };

}
