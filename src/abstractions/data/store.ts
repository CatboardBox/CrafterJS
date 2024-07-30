import { IDataStoreRef } from "../../schema";
import { DataConstructor } from "../content";
import { Namespace } from "../namespace";

export class DataStore<T> extends DataConstructor<IDataStoreRef,T>{
  constructor(name: string, namespace: Namespace, data: T) {
    super({
      name,
      namespace,
      data,
    });
  }
}
    