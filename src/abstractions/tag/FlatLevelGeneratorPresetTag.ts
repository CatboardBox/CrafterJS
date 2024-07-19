import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class FlatLevelGeneratorPresetTag extends BaseTag<
  TagType.FlatLevelGeneratorPreset, ResourceType.FlatLevelGeneratorPreset
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.FlatLevelGeneratorPreset, name, namespace);
  }
}
