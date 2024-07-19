import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class WorldPresetTag extends BaseTag<
  TagType.WorldPreset, ResourceType.WorldPreset
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.WorldPreset, name, namespace);
  }
}
