import {TgActionBase} from "../model/tg-action.base";
import {action, makeObservable, observable} from "mobx";
import {AppStore} from "./app.store";

export class ConstructorStore {
    actions: TgActionBase[] = [];

    constructor(private appStore: AppStore) {
        makeObservable(
            this,
            {
                actions: observable,
                load: action
            }
        );
    }

    load = (actions: TgActionBase[]) => {
        this.actions = actions;
    }
}
