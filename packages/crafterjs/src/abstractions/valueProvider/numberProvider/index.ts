import {
  IBinomialNumberProvider,
  INumberProvider,
  IScoreboardRef,
  IScoreNumberProvider,
  IStorageNumberProvider,
  IUniformNumberProvider,
  NumberProviderType,
} from "@crafter-js/mc-schema";

import { EnchantmentLevel } from "./EnchantmentLevel";

function uniform(
  min: INumberProvider,
  max: INumberProvider
): IUniformNumberProvider {
  return {
    type: NumberProviderType.Uniform,
    min,
    max,
  };
}

function binomial(
  n: INumberProvider,
  p: INumberProvider
): IBinomialNumberProvider {
  return {
    type: NumberProviderType.Binomial,
    n,
    p,
  };
}

function score(
  target: IScoreNumberProvider["target"],
  score: IScoreboardRef,
  scale?: number
): IScoreNumberProvider {
  return {
    type: NumberProviderType.Score,
    target,
    score,
    scale,
  };
}

function storage(storage: string, path: string): IStorageNumberProvider {
  return {
    type: NumberProviderType.Storage,
    storage,
    path,
  };
}

class UnmodifiedEnchantmentLevel extends EnchantmentLevel {
  constructor() {
    super(EnchantmentLevel.current().amount);
  }
  /**
   * The value is based on the square of the level. The final value is `level ^ 2 + added`
   */
  public squared(added: number = 0) {
    return EnchantmentLevel.squared(added);
  }

  /**
   * Directly defines the value for each level, with a fallback for levels that aren't directly defined
   */
  public map<T extends [number, ...number[]]>(
    values: T,
    fallback: EnchantmentLevel = new EnchantmentLevel(values[0])
  ) {
    return EnchantmentLevel.map(values, fallback);
  }

  /**
   * The value is linearly increased (or decreased) per level. The final value is `base + per_level_above_first * (level - 1)`.
   */
  public linear(base: number, per_level_above_first: number) {
    return EnchantmentLevel.linear(base, per_level_above_first);
  }

  public multiply(multiplier: EnchantmentLevel | number): EnchantmentLevel {
    if (multiplier instanceof EnchantmentLevel) {
      return super.multiply(multiplier);
    }
    return this.linear(multiplier, multiplier);
  }
}

export * from "./EnchantmentLevel";
const enchantmentLevel = new UnmodifiedEnchantmentLevel();

export const NumberProvider = {
  random: { uniform, binomial },
  score,
  storage,
  enchantmentLevel,
};
