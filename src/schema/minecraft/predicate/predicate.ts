import { SubLootContext } from "../lootContext/common";
import { ILevelBasedValue, INumberProvider } from "../misc";
import { IRef, ResourceType } from "../ref";
import { IEntityCondition, IItemCondition } from "./conditions";
import { PredicateCondition } from "./predicateConditions";
import { IFilteredPredicate } from "./predicateGroups";

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
  name: IRef[ResourceType.Predicates];
}

export interface IPredicateEntityProperties {
  condition: PredicateCondition.EntityProperties;
  entity: "this" | "attacker" | "direct_attacker" | "attacking_player";
  predicate: IEntityCondition;
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

export interface IPredicateBlockStateProperty {
  condition: PredicateCondition.BlockStateProperty;
  block: unknown; //todo
  properties?: {
    [key: string]:
      | string
      | number
      | {
          min: number;
          max: number;
        };
  };
}

export interface IPredicateDamageSourceProperties {
  condition: PredicateCondition.DamageSourceProperties;
  predicate: unknown; //todo
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
  predicate: unknown; //todo
}

export interface IPredicateMatchTool {
  condition: PredicateCondition.MatchTool;
  predicate: IItemCondition;
}

export interface IPredicateRandomChanceWithEnchantedBonus {
  condition: PredicateCondition.RandomChanceWithEnchantedBonus;
  unenchanted_chance: number;
  enchanted_chance: ILevelBasedValue;
  enchantment: IRef[ResourceType.Enchantment];
}

export interface IPredicateSurvivesExplosion {
  condition: PredicateCondition.SurvivesExplosion;
}

export interface IPredicateTableBonus {
  condition: PredicateCondition.TableBonus;
  enchantment: IRef[ResourceType.Enchantment];
  chances: unknown; //todo
}

export type IPredicate<T extends SubLootContext[]> = (
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
