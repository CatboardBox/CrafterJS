import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class BannerPatternTag extends BaseTag<
  TagType.BannerPattern, ResourceType.BannerPattern
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.BannerPattern, name, namespace);
  }
}
