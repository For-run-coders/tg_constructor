import React from "react";
import {ActionBase} from "../../model/action.base";

export interface ConstructorContextData {
    actions: ActionBase[];
}

export const ConstructorContext = React.createContext<ConstructorContextData>({
    actions: []
});
