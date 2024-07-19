import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class EnchantmentTag extends BaseTag<
  TagType.Enchantment, ResourceType.Enchantment
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Enchantment, name, namespace);
  }
}
