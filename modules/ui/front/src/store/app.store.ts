import {ConstructorStore} from "./constructor.store";

export class AppStore {
    constructorStore: ConstructorStore = new ConstructorStore(this);
}
