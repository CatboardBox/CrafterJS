import { Namespace } from "./namespace";
import { ResLocRef, ResourceType } from "../schema/minecraft/ref";
import {
  IEffectComponent,
  IEnchantment,
  RangeInclusive,
  EnchantmentSlot,
} from "../schema";
import { ContentGenerator } from "./content";
//https://minecraft.wiki/w/Enchantment_definition#Effect_components
const defaultEnchantment: IEnchantment = {
  description: "unnamed enchantment",
  anvil_cost: 1,
  effects: {},
  min_cost: {
    base: 1,
    per_level_above_first: 1,
  },
  max_cost: {
    base: 1,
    per_level_above_first: 1,
  },
  max_level: 1,
  slots: [],
  // exclusive_set: "",
  supported_items: undefined as unknown as IEnchantment["supported_items"],
  weight: 1,
};
interface IEnchantmentConstructor {
  id?: string;
  name: string;
  namespace: Namespace;
  buildPriority?: number;
}
export class Enchantment extends ContentGenerator<
  ResLocRef[ResourceType.Enchantment],
  IEnchantment
> {
  constructor({ name, namespace, ...others }: IEnchantmentConstructor) {
    super({
      type: [ResourceType.Enchantment],
      name,
      namespace: namespace,
      data: defaultEnchantment,
      ...others,
    });
    this.constructedData.description = {
      translate: this.translationKey,
      fallback: name,
    };
  }

  public validate() {
    if (this.constructedData.slots.length === 0)
      throw new Error("Enchantment must have at least one slot");
    if (this.constructedData.supported_items === "")
      throw new Error("Enchantment must have at a supported item/tag");
  }

  public setAnvilCost(cost: number) {
    this.constructedData.anvil_cost = cost;
    return this;
  }
  public setMinEnchantmentCost(cost: number, perLevel: number) {
    this.constructedData.min_cost = {
      base: cost,
      per_level_above_first: perLevel,
    };
    return this;
  }

  public setMaxEnchantmentCost(cost: number, perLevel: number) {
    this.constructedData.max_cost = {
      base: cost,
      per_level_above_first: perLevel,
    };
    return this;
  }

  public setWeight(weight: number) {
    this.constructedData.weight = weight;
    return this;
  }

  public setMaxLevel(level: RangeInclusive<255>) {
    this.constructedData.max_level = level;
    return this;
  }

  public addSlot(...slot: EnchantmentSlot[]) {
    this.constructedData.slots = [...this.constructedData.slots, ...slot];
    return this;
  }

  public addSupportedItem(
    item:
      | { ref: IEnchantment["supported_items"] }
      | IEnchantment["supported_items"]
  ) {
    if (typeof item === "string" || Array.isArray(item)) {
      this.constructedData.supported_items = item;
      return this;
    }
    this.constructedData.supported_items = item.ref;
    return this;
  }

  public addEffectRaw(effect: IEffectComponent) {
    this.constructedData.effects = {
      ...this.constructedData.effects,
      ...effect,
    };
    return this;
  }

  public addEffect<K extends keyof IEffectComponent>(
    key: K,
    ...values: ElementOf<IEffectComponent[K]>[]
  ) {
    if (!this.constructedData.effects[key])
      this.constructedData.effects[key] = [];
    this.constructedData.effects[key] = [
      ...(this.constructedData.effects[key] as ElementOf<
        IEffectComponent[K]
      >[]),
      ...values,
    ] as IEffectComponent[K];
    return this;
  }
}

type ElementOf<T> = T extends (infer U)[] ? U : never;
