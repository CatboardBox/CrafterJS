import { TagType, ResourceType } from "@crafter-js/mc-schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class FunctionTag extends BaseTag<
  TagType.Function, ResourceType.Function
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Function, name, namespace);
  }
}
