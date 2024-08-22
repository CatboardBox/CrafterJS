export enum PredicateCondition {
  // logical predicates
  /**
   * Evaluates a list of predicates and passes if all of them pass. Invokable from `any context`.
   */
  AllOf = "minecraft:all_of",
  /**
   * Evaluates a list of predicates and passes if all of them pass. Invokable from `any context`.
   */
  AnyOf = "minecraft:any_of",
  /**
   * Inverts another predicate condition. Invokable from `any context`.
   */
  Inverted = "minecraft:inverted",

  // reference predicates
  /**
   * Invokes a predicate file and returns its result. Invokable from `any context`.
   */
  Reference = "minecraft:reference",
  // normal predicates

  // any context

  /**
   * Checks properties of an entity. Invokable from `any context`.
   */
  EntityProperties = "minecraft:entity_properties",
  /**
   * Generates a random number between 0.0 and 1.0, and checks if it is less than a specified value. Invokable from `any context`.
   */
  RandomChance = "minecraft:random_chance",
  /**
   * Compares the current day time (or rather, `24000 * day count + day time`) against given values. Invokable from `any context`.
   */
  TimeCheck = "minecraft:time_check",
  /**
   * Compares a number against another number or range of numbers. Invokable from `any context`.
   */
  ValueCheck = "minecraft:value_check",
  /**
   * Checks the current game weather. Invokable from `any context`.
   */
  WeatherCheck = "minecraft:weather_check",

  // requires context

  /**
   * Checks the mined block and its block states. Requires `block state` provided by loot context, and always `fails` if not provided.
   */
  BlockStateProperty = "minecraft:block_state_property",
  /**
   * Checks properties of the damage source. Requires `origin` and `damage source` provided by loot context, and always `fails` if not provided.
   */
  DamageSourceProperties = "minecraft:damage_source_properties",
  /**
   * Checks if the enchantment has been active. Requires `enchantment active status` provided by loot context, and always `fails` if not provided. It is therefore only usable from the `enchanted_location` loot context.
   */
  EnchantmentActiveCheck = "minecraft:enchantment_active_check",
  /**
   * Checks the scoreboard scores of an entity. Requires `the specified entity` provided by loot context, and always `fails` if not provided.
   */
  EntityScores = "minecraft:entity_scores",
  /**
   * Checks if there is a `attacking_player` entity provided by loot context. Requires `attacking_player` `entity` provided by loot context, and always `fails` if not provided.
   */
  KilledByPlayer = "minecraft:killed_by_player",
  /**
   * Checks the current location against location criteria. Requires `origin` provided by loot context, and always `fails` if not provided.
   */
  LocationCheck = "minecraft:location_check",
  /**
   * Checks tool used to mine the block. Requires `tool` provided by loot context, and always `fails` if not provided.
   */
  MatchTool = "minecraft:match_tool",
  /**
   * Generates a random number between 0.0 and 1.0, and checks if it is less than the value determined using the level of a given enchantment.
   * Requires `attacker` `entity` provided by loot context, and if not provided, the enchantment level is regarded as 0.
   */
  RandomChanceWithEnchantedBonus = "minecraft:random_chance_with_enchanted_bonus",
  /**
   * Returns success with `1 ÷ explosion radius` probability. Requires `explosion radius` provided by loot context, and always `success` if not provided.
   */
  SurvivesExplosion = "minecraft:survives_explosion",
  /**
   * Passes with probability picked from a list, indexed by enchantment power. Requires `tool` provided by loot context. If not provided, the enchantment level is regarded as 0.
   */
  TableBonus = "minecraft:table_bonus",
}