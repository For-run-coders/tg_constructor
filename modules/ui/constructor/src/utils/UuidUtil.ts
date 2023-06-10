import { v4 as uuid } from 'uuid';

export class UuidUtil {
    static getNewUuid = () => uuid().replace(/-/g, "").toUpperCase();
}
