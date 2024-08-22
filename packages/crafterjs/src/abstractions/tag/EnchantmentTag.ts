import { TagType, ResourceType } from "@crafter-js/mc-schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class EnchantmentTag extends BaseTag<
  TagType.Enchantment, ResourceType.Enchantment
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Enchantment, name, namespace);
  }
}
