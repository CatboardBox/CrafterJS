import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class WorldgenTag extends BaseTag<
  TagType.Worldgen, ResourceType.Worldgen
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.WorldPreset, name, namespace);
  }
}
