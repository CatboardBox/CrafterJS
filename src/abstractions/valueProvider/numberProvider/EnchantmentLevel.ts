import {
  IClampedAttribute,
  IEnchantmentLevelNumberProvider,
  ILevelBasedValue,
  LevelBasedValueType,
  NumberProviderType,
} from "../../../schema";

// javascript minimum number is way lower than java's minimum number
// so we hardcode it to the minimum float number in java
const MinNumber = -3.4028235e38;

// javascript maximum number is way higher than java's maximum number
// so we hardcode it to the maximum float number in java
const MaxNumber = 3.4028235e38;

export class EnchantmentLevel implements IEnchantmentLevelNumberProvider {
  public readonly type = NumberProviderType.EnchantmentLevel;
  public readonly amount: ILevelBasedValue;

  protected constructor(amount: ILevelBasedValue) {
    this.amount = amount;
  }

  /**
   * Directly gets the value for the current level
   */
  public static current() {
    return EnchantmentLevel.linear(1, 1);
  }

  // commented out because its kinda pointless to be at root level
  // public static constant(newValue: number) {
  //   return new EnchantmentLevel(newValue);
  // }

  /**
   * The value is based on the square of the level. The final value is `level ^ 2 + added`
   */
  public static squared(added: number = 0) {
    return new EnchantmentLevel({
      type: LevelBasedValueType.LevelsSquared,
      added,
    });
  }

  /**
   * Directly defines the value for each level, with a fallback for levels that aren't directly defined
   */
  public static map<T extends [number, ...number[]]>(
    values: T,
    fallback: EnchantmentLevel = new EnchantmentLevel(values[0])
  ) {
    return new EnchantmentLevel({
      type: LevelBasedValueType.Lookup,
      values,
      fallback: fallback.amount,
    });
  }

  /**
   * The value is linearly increased (or decreased) per level. The final value is `base + per_level_above_first * (level - 1)`.
   */
  public static linear(base: number, per_level_above_first: number) {
    return new EnchantmentLevel({
      type: LevelBasedValueType.Linear,
      base,
      per_level_above_first,
    });
  }

  /**
   * Calculates a fraction of 2 level-based values: `numerator / denominator`
   */
  public static fraction(
    numerator: EnchantmentLevel | number,
    denominator: EnchantmentLevel | number
  ) {
    const numeratorValue: ILevelBasedValue =
      typeof numerator === "number" ? numerator : numerator.amount;
    const denominatorValue: ILevelBasedValue =
      typeof denominator === "number" ? denominator : denominator.amount;
    return new EnchantmentLevel({
      type: LevelBasedValueType.Fraction,
      numerator: numeratorValue,
      denominator: denominatorValue,
    });
  }

  /**
   * Uses another level-based value and clamps the resulting value to the range `[min, max]`.
   */
  public clamp(min: number, max: number) {
    const amount: IClampedAttribute = {
      type: LevelBasedValueType.Clamped,
      value: this.amount,
      min,
      max,
    };
    return new EnchantmentLevel(amount);
  }

  public min(min: number) {
    return this.clamp(min, MaxNumber);
  }

  public max(max: number) {
    return this.clamp(MinNumber, max);
  }

  public divide(denominator: EnchantmentLevel | number) {
    return EnchantmentLevel.fraction(this, denominator);
  }

  // idk why no native multiply method exists
  public multiply(multiplier: EnchantmentLevel | number) {
    if (typeof multiplier === "number") {
      return EnchantmentLevel.fraction(this, 1 / multiplier);
    }
    const denominator = EnchantmentLevel.fraction(1, multiplier);
    return EnchantmentLevel.fraction(this, denominator);
  }
}
