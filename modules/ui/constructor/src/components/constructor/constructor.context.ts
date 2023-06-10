import React from 'react';
import { NullableTgActionBase, TgActionBase } from '../../model/tg-action.base';

export interface ConstructorContextData {
    actions: TgActionBase[];
    isEnableToChooseAction: boolean;
    changeEnableToChooseAction: (value: boolean) => void;
    selectedAction: NullableTgActionBase;
    changeSelectAction: (action: NullableTgActionBase) => void;
}

export const ConstructorContext = React.createContext<ConstructorContextData>({
    actions: [],
    isEnableToChooseAction: false,
    changeEnableToChooseAction: () => {},
    selectedAction: null,
    changeSelectAction: () => {},
});
