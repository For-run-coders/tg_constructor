import React from 'react';
import { NullableTgActionBase, TgActionBase } from '../../model/tg-action.base';
import { TgActionRequest } from '../../model/tg-action.request';

export interface ConstructorContextData {
    availableActions: TgActionBase[];
    currentActions: TgActionRequest[];
    selectedAction: NullableTgActionBase;
    changeSelectAction: (action: NullableTgActionBase) => void;
    changeCurrentAction: (newAction: TgActionRequest) => void;
    addCurrentAction: (newAction: TgActionRequest) => void;
}

export const ConstructorContext = React.createContext<ConstructorContextData>({
    availableActions: [],
    currentActions: [],
    selectedAction: null,
    changeSelectAction: () => {},
    changeCurrentAction: () => {},
    addCurrentAction: () => {},
});
