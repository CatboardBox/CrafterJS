import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class StructureTag extends BaseTag<
  TagType.Structure, ResourceType.Structure
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Structure, name, namespace);
  }
}
