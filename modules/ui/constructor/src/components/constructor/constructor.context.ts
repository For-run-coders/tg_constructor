import React from "react";
import {ActionBase} from "../../model/action.base";

export interface ConstructorContextData {
    actions: ActionBase[];
    isEnableToChooseAction: boolean;
    changeEnableToChooseAction: (value: boolean) => void;
}

export const ConstructorContext = React.createContext<ConstructorContextData>({
    actions: [],
    isEnableToChooseAction: false,
    changeEnableToChooseAction: () => {}
});
