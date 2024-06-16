export enum LevelBasedValueType {
    Linear = "minecraft:linear",
    LevelsSquared = "minecraft:levels_squared",
    Clamped = "minecraft:clamped",
    Fraction = "minecraft:fraction",
    Lookup = "minecraft:lookup",
  }
  
  /**
   * A constant float can be used instead of a compound to set a value that doesn't depend on the level of the enchantment
   */
  export type IConstantAttribute = number;
  
  /**
   * The value is linearly increased (or decreased) per level. The final value is `base + per_level_above_first * (level - 1)`.
   */
  export type ILinearAttribute = {
    type: LevelBasedValueType.Linear;
    base: number;
    per_level_above_first: number;
  };
  /**
   * The value is based on the square of the level. The final value is `level ^ 2 + added`
   */
  export type ILevelsSquaredAttribute = {
    type: LevelBasedValueType.LevelsSquared;
    added: number;
  };
  
  /**
   * Uses another level-based value and clamps the resulting value to the range `[min, max]`.
   */
  export type IClampedAttribute = {
    type: LevelBasedValueType.Clamped;
    value: ILevelBasedValue;
    min: number;
    max: number;
  };
  
  /**
   * Calculates a fraction of 2 level-based values: `numerator / denominator`
   */
  export type IFractionAttribute = {
    type: LevelBasedValueType.Fraction;
    numerator: ILevelBasedValue;
    denominator: ILevelBasedValue;
  };
  
  /**
   * Directly defines the value for each level, with a fallback for levels that aren't directly defined
   */
  export type ILookupAttribute = {
    type: LevelBasedValueType.Lookup;
    /**
     * List of values to use for each level, indexed by level - 1
     */
    values: number[];
    /**
     *  Value to use when  values doesn't define a value for the given level.
     */
    fallback: ILevelBasedValue;
  };
  
  export type ILevelBasedValue =
    | IConstantAttribute
    | ILinearAttribute
    | ILevelsSquaredAttribute
    | IClampedAttribute
    | IFractionAttribute
    | ILookupAttribute;
  