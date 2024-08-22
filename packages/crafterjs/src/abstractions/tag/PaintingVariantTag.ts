import { TagType, ResourceType } from "@crafter-js/mc-schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class PaintingVariantTag extends BaseTag<
  TagType.PaintingVariant, ResourceType.PaintingVariant
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.PaintingVariant, name, namespace);
  }
}
