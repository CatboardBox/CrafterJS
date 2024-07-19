import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class FunctionTag extends BaseTag<
  TagType.Function, ResourceType.Function
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Function, name, namespace);
  }
}
