import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";

export class BlockTag extends BaseTag<TagType.Block, ResourceType.Block> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Block, name, namespace);
  }
}
