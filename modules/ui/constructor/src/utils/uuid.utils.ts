import { v4 as uuid } from 'uuid';

export class UuidUtils {
    static getNewUuid = () => uuid().replace(/-/g, '').toUpperCase();
}
