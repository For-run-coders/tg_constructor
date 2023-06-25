import axios from "axios";
import {ConstructorApi} from "./constructor.api";
import {AppStore} from "../store/app.store";

export class AppApi {
    client = axios.create({
        baseURL: 'http://localhost:8080',
    })

    constructorApi: ConstructorApi;

    constructor(store: AppStore) {
        this.constructorApi = new ConstructorApi(store, this.client);
    }
}
