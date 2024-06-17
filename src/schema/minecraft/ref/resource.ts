export type IResourceRef = string & {
  readonly __resourceBrand: unique symbol;
};

// enum value doubles as location in the datapack

// https://minecraft.fandom.com/wiki/Resource_location#Java_Edition_2
export enum ResourceType {
  // these are references to dynamic resources (data driven)
  Advancements = "advancements",
  // Attribute = "attribute",
  BannerPatterns = "banner_patterns",
  ChatType = "chat_type",
  DamageTypes = "damage_types",
  Dimension = "dimension",
  DimensionType = "dimension_type",
  Enchantment = "enchantment",
  EnchantmentProvider = "enchantment_provider",
  Function = "function",
  // GameEvents = "game_events",
  ItemModifiers = "item_modifiers",
  JukeboxSong = "jukebox_song",
  LootTables = "loot_tables",
  PaintingVariant = "painting_variant",
  Predicates = "predicates",
  Recipe = "recipe",
  Structures = "structures",
  Tags = "tags",
  TrimMaterial = "trim_material",
  TrimPattern = "trim_pattern",
  WolfVariant = "wolf_variant",
  Worldgen = "worldgen",

  // these are references to hardcoded resources (non data driven)

  Block = "block",
  Item = "item",
  Entity = "entity",
  Fluid = "fluid",
  GameEvent = "gameEvent",
  Biome = "biome",
  Structure = "structure",
  SoundEvents = "sound_events",
  FlatLevelGeneratorPreset = "flatLevelGeneratorPreset",
  WorldPreset = "worldPreset",
  CatVariant = "catVariant",
  BannerPattern = "bannerPattern",
  Instrument = "instrument",
  MobEffects = "mob_effects",
  Particle = "particles",
  PointOfInterestType = "pointOfInterestType",
  DamageType = "damageType",
}

type GenerateRef<T extends string> = IResourceRef & {
  readonly __refBrand: T;
};

// Generate tag types dynamically
export type IRef = {
  [K in ResourceType]: GenerateRef<K>;
};