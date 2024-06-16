import {
  IEnchantmentRef,
  IEnchantmentTagRef,
  IItemRef,
  IItemTagRef,
} from "../ref";
import { IDescription, RangeInclusive } from "../generic";
import { IEffectComponent } from "./effects";

interface IXpCost {
  /**
   * The minimum cost for a level I enchantment.
   */
  base: number;
  /**
   * The amount of levels added to the minimum for each level above level I.
   */
  per_level_above_first: number;
}

export type IEnchantmentSlots =
  | "mainhand"
  | "offhand"
  | "armor"
  | "feet"
  | "legs"
  | "chest"
  | "head";
//
export interface IEnchantment {
  description: IDescription;
  /**
   * Enchantments that are incompatible with this enchantment.
   *
   * Defaults to an empty list.
   */
  exclusive_set?: IEnchantmentRef | IEnchantmentRef[] | IEnchantmentTagRef;
  /**
   * Items on which this enchantment can be applied using an anvil or using the `/enchant` command.
   */
  supported_items: IItemRef | IItemRef[] | IItemTagRef;
  /**
   *  Items for which this enchantment appears in an `enchanting table`.
   */
  primary_items?: IItemRef | IItemRef[] | IItemTagRef;
  /**
   * Value between 1 and 1024 (inclusive) — Controls the probability of this enchantment when enchanting.
   * The probability is determined weight/total weight * 100%, where total_weight is the sum of the weights of all available enchantments.
   */
  weight: number;
  /**
   * Value between 1 and 255 (inclusive) — The maximum level of this enchantment.
   */
  max_level: RangeInclusive<255>;
  /**
   * The minimum possible cost of this enchantment in levels.
   */
  min_cost: IXpCost;
  /**
   * The maximum possible cost of this enchantment in levels.
   */
  max_cost: IXpCost;
  /**
   * The cost when applying this enchantment using an `anvil`. Halved when adding to a book, multiplied by the level of the enchantment.
   */
  anvil_cost: number;
  /**
   * List of equipment slots that this enchantment works in.
   */
  slots: IEnchantmentSlots[];
  effects: IEffectComponent;
}
