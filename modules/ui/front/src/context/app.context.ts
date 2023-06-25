import {AppStore} from "../store/app.store";
import {AppApi} from "../api/app.api";
import React, {useContext} from "react";

type AppContextType = {
    store: AppStore,
    api: AppApi
}

export const AppContext = React.createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType => {
    return useContext(AppContext) as AppContextType;
}
