import { Dispatch, SetStateAction, useState } from 'react';

export const useObjectState = <T extends { [key: string]: any }>(initValue: T): [T, (field: keyof T, value: any) => void, Dispatch<SetStateAction<T>>] => {

    const [object, setObject] = useState<T>(initValue);

    const setObjectValueByField = (field: keyof T, value: any) => {
        setObject(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    return [object, setObjectValueByField, setObject];
};
