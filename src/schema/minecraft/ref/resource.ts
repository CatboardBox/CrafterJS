export type IRef = string & {
  readonly __resourceBrand: unique symbol;
};

// enum value doubles as location in the datapack

// https://minecraft.fandom.com/wiki/Resource_location#Java_Edition_2
// Ref Types should follow the structure of Namespace:Path/To/Resource
export enum ResourceType {
  // these are references to dynamic resources (data driven)
  Advancement = "advancement",
  // Attribute = "attribute",
  BannerPattern = "banner_pattern",
  ChatType = "chat_type",
  DamageType = "damage_type",
  Dimension = "dimension",
  DimensionType = "dimension_type",
  Enchantment = "enchantment",
  EnchantmentProvider = "enchantment_provider",
  Function = "function",
  // GameEvent = "game_event",
  ItemModifiers = "item_modifiers",
  JukeboxSong = "jukebox_song",
  LootTable = "loot_table",
  PaintingVariant = "painting_variant",
  Predicates = "predicates",
  Recipe = "recipe",
  Structures = "structures",
  Tags = "tags", // the only one that is pural
  TrimMaterial = "trim_material",
  TrimPattern = "trim_pattern",
  WolfVariant = "wolf_variant",
  Worldgen = "worldgen",

  // these are references to hardcoded resources (non data driven)
  // actual string values dont matter, only the type (for type checking)

  // Attribute = "attribute",
  Block = "block",
  Item = "item",
  Entity = "entity",
  Fluid = "fluid",
  GameEvent = "game_event",
  Biome = "biome",
  Structure = "structure",
  // Statistics = "statistics",
  SoundEvent = "sound_event",
  FlatLevelGeneratorPreset = "flat_level_generator_preset",
  WorldPreset = "world_preset",
  CatVariant = "cat_variant",
  Instrument = "instrument",
  MobEffect = "mob_effect",
  Particle = "particle",
  PointOfInterestType = "point_of_interestType",

  // AdvancementCriterion = "advancement_criterion",
}

// for datapacks that work with modded content
// copy paste this to extend the ref system
// refers to types like namespace:path/to/resource
export type IResLocRef = IRef & {
  readonly __resourceLocationBrand: unique symbol;
};
// // refers to types like namespace:path.to.resource
// export type IIdRef = IRef & {
//   readonly __idBrand: unique symbol;
// };

// Generate tag types dynamically
type GenerateResLocRef<T extends string> = IResLocRef & {
  readonly __typeBrand: T;
};

// type GenerateIdRef<T extends string> = IIdRef & {
//   readonly __typeBrand: T;
// };

// Generate types dynamically
export type ResLocRef = {
  [K in ResourceType]: GenerateResLocRef<K>;
};

// export type IdRef = {
//   [K in ResourceType]: GenerateIdRef<K>;
// };

