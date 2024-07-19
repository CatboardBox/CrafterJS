import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class PaintingVariantTag extends BaseTag<
  TagType.PaintingVariant, ResourceType.PaintingVariant
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.PaintingVariant, name, namespace);
  }
}
