import { IAdvancement } from "../../schema";
import { Namespace } from "../namespace";
import { AdvancementBase } from "./advancementBase";

export class ExistingAdvancement extends AdvancementBase<IAdvancement> {
  constructor(name: string, namespace: Namespace, data: unknown) {
    super({ name, namespace, defaultData: data as IAdvancement });
  }
}
