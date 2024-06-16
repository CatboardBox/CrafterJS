export type IResourceRef = string & {
  readonly __resourceBrand: unique symbol;
};
/**
 * Entity data registries
Advancements

Custom advancements for achievements and goals.
Loot Tables

Custom loot tables to define what items are dropped from mobs, blocks, chests, etc.
Recipes

Custom crafting, smelting, blasting, smoking, stonecutting, and campfire recipes.
Structures

Custom structures for generation in the world.
Functions

Custom command functions to automate tasks.
Tags

Custom tags for blocks, items, entities, fluids, and functions.
Predicates

Custom predicates for conditional operations.
Dimension

Custom dimensions for new worlds or modifications to existing ones.
Dimension Type

Custom dimension types to define properties of dimensions.
Biome

Custom biomes for world generation.
Worldgen

Custom world generation settings including features, noise settings, surface builders, and more.
Item Modifiers

Custom item modifiers for changing item properties.
Damage Types

Custom damage types for defining new ways entities can take damage.
Mob Effects

Custom mob effects for new status effects.
Enchantment

Custom enchantments for items.
Sound Events

Custom sound events for new sounds.
Particles

Custom particle effects for visual effects.
Banner Patterns

Custom banner patterns for decorative banners.
Game Events

Custom game events for the new Sculk Sensor and other event-driven mechanics.
Trim Patterns

Custom patterns for armor trims.
Damage Types

Custom definitions for different types of damage sources.
 */
// https://minecraft.fandom.com/wiki/Resource_location#Java_Edition_2
export enum ResourceType {
  Advancements = "advancements",
  Attribute = "attribute",
  BannerPatterns = "banner_patterns",
  Biome = "biome",
  DamageTypes = "damage_types",
  Dimension = "dimension",
  DimensionType = "dimension_type",
  Enchantment = "enchantment",
  Function = "function",
  GameEvents = "game_events",
  ItemModifiers = "item_modifiers",
  LootTables = "loot_tables",
  MobEffects = "mob_effects",
  Particle = "particles",
  Predicates = "predicates",
  Recipe = "recipe",
  SoundEvents = "sound_events",
  Structures = "structures",
  Tags = "tags",
  TrimPatterns = "trim_patterns",
  Worldgen = "worldgen",
}

type GenerateRef<T extends string> = IResourceRef & {
  readonly __refBrand: T;
};

// Generate tag types dynamically
type Ref = {
  [K in keyof typeof ResourceType]: GenerateRef<
    (typeof ResourceType)[K]
  >;
};

// Extract individual ref types
export type IAdvancementRef = Ref["Advancements"];
export type IAttributeRef = Ref["Attribute"];
export type IBannerPatternRef = Ref["BannerPatterns"];
export type IBiomeRef = Ref["Biome"];
export type IDamageTypeRef = Ref["DamageTypes"];
export type IDimensionRef = Ref["Dimension"];
export type IDimensionTypeRef = Ref["DimensionType"];
export type IEnchantmentRef = Ref["Enchantment"];
export type IFunctionRef = Ref["Function"];
export type IGameEventRef = Ref["GameEvents"];
export type IItemModifierRef = Ref["ItemModifiers"];
export type ILootTableRef = Ref["LootTables"];
export type IMobEffectRef = Ref["MobEffects"];
export type IParticleRef = Ref["Particle"];
export type IPredicateRef = Ref["Predicates"];
export type IRecipeRef = Ref["Recipe"];
export type ISoundEventRef = Ref["SoundEvents"];
export type IStructureRef = Ref["Structures"];
export type ITagRef = Ref["Tags"];
export type ITrimPatternRef = Ref["TrimPatterns"];
export type IWorldgenRef = Ref["Worldgen"];