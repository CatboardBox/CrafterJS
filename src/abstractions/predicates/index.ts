import {
  IPredicate,
  PredicateCondition,
  IPredicateAllOf,
  ResourceType,
  ResLocRef,
  IEntityPredicate,
  IPredicateReference,
  IPredicateInverted,
  IPredicateAnyOf,
  IPredicateEntityProperties,
  IPredicateRandomChance,
  INumberProvider,
  IBlockStatePropertiesPredicate,
  IItemPredicate,
  ILevelBasedValue,
  ILocationPredicate,
  IPredicateBlockStateProperty,
  IPredicateDamageSourceProperties,
  IPredicateEnchantmentActiveCheck,
  IPredicateEntityScores,
  IPredicateKilledByPlayer,
  IPredicateLocationCheck,
  IPredicateMatchTool,
  IPredicateRandomChanceWithEnchantedBonus,
  IPredicateSurvivesExplosion,
  IPredicateTableBonus,
  IPredicateTimeCheck,
  IPredicateValueCheck,
  IPredicateWeatherCheck,
  IDamageTypePredicate,
  Weather,
} from "../../schema";

export class Check {
  ifAll(...terms: IPredicate[]): IPredicateAllOf {
    return {
      condition: PredicateCondition.AllOf,
      terms: terms,
    };
  }

  ifAny(...terms: IPredicate[]): IPredicateAnyOf {
    return {
      condition: PredicateCondition.AnyOf,
      terms: terms,
    };
  }

  not(term: IPredicate): IPredicateInverted {
    return {
      condition: PredicateCondition.Inverted,
      term: term,
    };
  }

  ifNone(...terms: IPredicate[]): IPredicate {
    return this.not(this.ifAny(...terms));
  }

  reference(name: ResLocRef[ResourceType.Predicates]): IPredicateReference {
    return {
      condition: PredicateCondition.Reference,
      name: name,
    };
  }

  entityProperties(
    entity: "this" | "attacker" | "direct_attacker" | "attacking_player",
    predicate: IEntityPredicate
  ): IPredicateEntityProperties {
    return {
      condition: PredicateCondition.EntityProperties,
      entity: entity,
      predicate: predicate,
    };
  }

  randomChance(chance: number): IPredicateRandomChance {
    return {
      condition: PredicateCondition.RandomChance,
      chance: chance,
    };
  }

  time(
    value: { min: INumberProvider; max: INumberProvider } | number,
    period?: number
  ): IPredicateTimeCheck {
    return {
      condition: PredicateCondition.TimeCheck,
      value: value,
      period: period,
    };
  }

  value(
    value: INumberProvider,
    range: { min: INumberProvider; max: INumberProvider } | INumberProvider
  ): IPredicateValueCheck {
    return {
      condition: PredicateCondition.ValueCheck,
      value: value,
      range: range,
    };
  }

  weather(weather: Weather): IPredicateWeatherCheck {
    let raining = false;
    let thundering = false;
    switch (weather) {
      case Weather.Clear:
        break;
      case Weather.Rain:
        raining = true;
        break;
      case Weather.Thunder:
        thundering = true;
        break;
    }
    return {
      condition: PredicateCondition.WeatherCheck,
      raining,
      thundering,
    };
  }

  blockStateProperty(
    block: ResLocRef[ResourceType.Block],
    properties?: {
      name: ResLocRef[ResourceType.Block];
      properties?: IBlockStatePropertiesPredicate;
    }
  ): IPredicateBlockStateProperty {
    return {
      condition: PredicateCondition.BlockStateProperty,
      block: block,
      properties: properties,
    };
  }

  damageSourceProperties(
    predicate: IDamageTypePredicate
  ): IPredicateDamageSourceProperties {
    return {
      condition: PredicateCondition.DamageSourceProperties,
      predicate: predicate,
    };
  }

  enchantmentActive(active: boolean): IPredicateEnchantmentActiveCheck {
    return {
      condition: PredicateCondition.EnchantmentActiveCheck,
      active: active,
    };
  }

  entityScores(
    entity: "this" | "attacker" | "direct_attacker" | "attacking_player",
    scores: {
      [key: string]:
        | {
            min: INumberProvider;
            max: INumberProvider;
          }
        | number;
    }
  ): IPredicateEntityScores {
    return {
      condition: PredicateCondition.EntityScores,
      entity: entity,
      scores: scores,
    };
  }

  killedByPlayer(): IPredicateKilledByPlayer {
    return {
      condition: PredicateCondition.KilledByPlayer,
    };
  }

  location(
    offsetX: number,
    offsetY: number,
    offsetZ: number,
    predicate: ILocationPredicate
  ): IPredicateLocationCheck {
    return {
      condition: PredicateCondition.LocationCheck,
      offsetX: offsetX,
      offsetY: offsetY,
      offsetZ: offsetZ,
      predicate: predicate,
    };
  }

  matchTool(predicate: IItemPredicate): IPredicateMatchTool {
    return {
      condition: PredicateCondition.MatchTool,
      predicate: predicate,
    };
  }

  randomChanceWithEnchantedBonus(
    unenchanted_chance: number,
    enchanted_chance: ILevelBasedValue,
    enchantment: ResLocRef[ResourceType.Enchantment]
  ): IPredicateRandomChanceWithEnchantedBonus {
    return {
      condition: PredicateCondition.RandomChanceWithEnchantedBonus,
      unenchanted_chance: unenchanted_chance,
      enchanted_chance: enchanted_chance,
      enchantment: enchantment,
    };
  }

  survivesExplosion(): IPredicateSurvivesExplosion {
    return {
      condition: PredicateCondition.SurvivesExplosion,
    };
  }

  tableBonus(
    enchantment: ResLocRef[ResourceType.Enchantment],
    chances: number[]
  ): IPredicateTableBonus {
    return {
      condition: PredicateCondition.TableBonus,
      enchantment: enchantment,
      chances: chances,
    };
  }
}
