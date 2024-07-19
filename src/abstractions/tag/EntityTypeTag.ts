import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class EntityTypeTag extends BaseTag<TagType.EntityType, ResourceType.EntityType> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.EntityType, name, namespace);
  }
}
