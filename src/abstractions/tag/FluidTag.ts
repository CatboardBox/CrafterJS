import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class FluidTag extends BaseTag<TagType.Fluid, ResourceType.Fluid> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Fluid, name, namespace);
  }
}
