import {AppStore} from "../store/app.store";
import {AxiosInstance} from "axios";
import {TgActionBase} from "../model/tg-action.base";

export class ConstructorApi {

    appStore: AppStore;

    client: AxiosInstance;

    constructor(appStore: AppStore, client: AxiosInstance) {
        this.appStore = appStore;
        this.client = client;
    }

    getActions = async () => {
        const result = await this.client.get<TgActionBase[]>('/actions');
        this.appStore.constructorStore.load(result.data);
    }

}
