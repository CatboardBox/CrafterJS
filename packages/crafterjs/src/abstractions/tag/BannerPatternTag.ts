import { TagType, ResourceType } from "@crafter-js/mc-schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class BannerPatternTag extends BaseTag<
  TagType.BannerPattern, ResourceType.BannerPattern
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.BannerPattern, name, namespace);
  }
}
