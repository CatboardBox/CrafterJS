import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class DamageTypeTag extends BaseTag<
  TagType.DamageType, ResourceType.DamageType
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.DamageType, name, namespace);
  }
}
