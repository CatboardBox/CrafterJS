import { TagType, ResourceType } from "@crafter-js/mc-schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class ItemTag extends BaseTag<TagType.Item, ResourceType.Item> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Item, name, namespace);
  }
}
