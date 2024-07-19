import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class BiomeTag extends BaseTag<TagType.Biome, ResourceType.Biome> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Biome, name, namespace);
  }
}
