import { TagType, ResourceType } from "@crafter-js/mc-schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class CatVariantTag extends BaseTag<
  TagType.CatVariant, ResourceType.CatVariant
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.CatVariant, name, namespace);
  }
}
