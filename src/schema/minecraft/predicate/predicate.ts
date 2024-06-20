import { IBlockStatePropertiesPredicate } from "../generic";
import { SubLootContext } from "../lootContext/common";
import { ILevelBasedValue, INumberProvider } from "../misc";
import { ResLocRef, ResourceType } from "../ref";
import { IDamageTypePredicate } from "./damageTypePredicate";
import { IEntityPredicate } from "./entityPredicate";
import { IItemPredicate } from "./itemPredicate";
import { ILocationPredicate } from "./locationPredicate";
import { PredicateCondition } from "./predicateConditions";
import { IFilteredPredicate } from "./predicateDependencies";

export interface IPredicateAllOf<T extends SubLootContext[]> {
  condition: PredicateCondition.AllOf;
  terms: IPredicate<T>[];
}

export interface IPredicateAnyOf<T extends SubLootContext[]> {
  condition: PredicateCondition.AnyOf;
  terms: IPredicate<T>[];
}

export interface IPredicateInverted<T extends SubLootContext[]> {
  condition: PredicateCondition.Inverted;
  term: IPredicate<T>;
}

export interface IPredicateReference {
  condition: PredicateCondition.Reference;
  name: ResLocRef[ResourceType.Predicates];
}

export interface IPredicateEntityProperties {
  condition: PredicateCondition.EntityProperties;
  entity: "this" | "attacker" | "direct_attacker" | "attacking_player";
  predicate: IEntityPredicate;
}

export interface IPredicateRandomChance {
  condition: PredicateCondition.RandomChance;
  chance: number;
}

export interface IPredicateTimeCheck {
  condition: PredicateCondition.TimeCheck;
  /**
   * The time to compare the day time against.
   */
  value:
    | {
        min: INumberProvider;
        max: INumberProvider;
      }
    | number;
  /**
   *  If present, the day time is first reduced modulo the given number before being checked against value.
   *  For example, setting this to 24000 causes the checked time to be equal to the current daytime.
   */
  period?: number;
}

export interface IPredicateValueCheck {
  condition: PredicateCondition.ValueCheck;
  value: INumberProvider;
  range:
    | {
        min: INumberProvider;
        max: INumberProvider;
      }
    | INumberProvider;
}

export interface IPredicateWeatherCheck {
  condition: PredicateCondition.WeatherCheck;
  /**
   * If true, the condition passes only if it is raining or thundering.
   */
  raining: boolean;
  /**
   * If true, the condition passes only if it is thundering.
   */
  thundering: boolean;
}
/**
 * Requires block state provided by loot context, and always fails if not provided.
 */
export interface IPredicateBlockStateProperty {
  condition: PredicateCondition.BlockStateProperty;
  block: ResLocRef[ResourceType.Block];
  properties?: {
    name: ResLocRef[ResourceType.Block];

    /**
     * (Optional) Block state property key-value pair. The property must be possessed by the specified block.
     * Unspecified properties of the specified block will be set to their default values.
     */
    properties?: IBlockStatePropertiesPredicate;
  };
}

export interface IPredicateDamageSourceProperties {
  condition: PredicateCondition.DamageSourceProperties;
  predicate: IDamageTypePredicate;
}

export interface IPredicateEnchantmentActiveCheck {
  condition: PredicateCondition.EnchantmentActiveCheck;
  active: boolean;
}

export interface IPredicateEntityScores {
  condition: PredicateCondition.EntityScores;
  entity: "this" | "attacker" | "direct_attacker" | "attacking_player";
  scores: {
    [key: string]:
      | {
          min: INumberProvider;
          max: INumberProvider;
        }
      | number;
  };
}

export interface IPredicateKilledByPlayer {
  condition: PredicateCondition.KilledByPlayer;
}

export interface IPredicateLocationCheck {
  condition: PredicateCondition.LocationCheck;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  predicate: ILocationPredicate;
}

export interface IPredicateMatchTool {
  condition: PredicateCondition.MatchTool;
  predicate: IItemPredicate;
}

export interface IPredicateRandomChanceWithEnchantedBonus {
  condition: PredicateCondition.RandomChanceWithEnchantedBonus;
  unenchanted_chance: number;
  enchanted_chance: ILevelBasedValue;
  enchantment: ResLocRef[ResourceType.Enchantment];
}

export interface IPredicateSurvivesExplosion {
  condition: PredicateCondition.SurvivesExplosion;
}

export interface IPredicateTableBonus {
  condition: PredicateCondition.TableBonus;
  enchantment: ResLocRef[ResourceType.Enchantment];
  /**
   * List of probabilities for enchantment power, indexed from 0.
   */
  chances: number[];
}

export type IPredicate<T extends SubLootContext[] = []> = (
  | IPredicateAllOf<T>
  | IPredicateAnyOf<T>
  | IPredicateInverted<T>
  | IPredicateReference
  | IPredicateEntityProperties
  | IPredicateRandomChance
  | IPredicateTimeCheck
  | IPredicateValueCheck
  | IPredicateWeatherCheck
  | IPredicateBlockStateProperty
  | IPredicateDamageSourceProperties
  | IPredicateEnchantmentActiveCheck
  | IPredicateEntityScores
  | IPredicateKilledByPlayer
  | IPredicateLocationCheck
  | IPredicateMatchTool
  | IPredicateRandomChanceWithEnchantedBonus
  | IPredicateSurvivesExplosion
  | IPredicateTableBonus
) &
  IFilteredPredicate<T>;
