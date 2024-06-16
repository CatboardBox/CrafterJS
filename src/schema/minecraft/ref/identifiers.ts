import { IResourceRef } from "./resource";

export type IResourceIdRef = IResourceRef & {
  readonly __resourceIdBrand: unique symbol;
};

enum IdentifiersTypes{
  Block = "block",
  Item = "item",
  Entity = "entity",
  Biome = "biome",
  SoundEvent = "sound_event",
  Particle = "particle",
  Enchantment = "enchantment",
  MobEffect = "mob_effect",
  Dimension = "dimension",
  Structure = "structure",
  LootTable = "loot_table",
  Recipe = "recipe",
  Tag = "tag",
  Attribute = "attribute",
  CustomModelData = "custom_model_data",
  Advancement = "advancement",
  Predicate = "predicate",
  TrimPattern = "trim_pattern",
  GameEvent = "game_event",
  Custom = "custom",
}

type GenerateRef<T extends string> = IResourceIdRef & {
  readonly __refBrand: T;
};

// Generate tag types dynamically
type Id = {
  [K in keyof typeof IdentifiersTypes as `${Capitalize<K>}`]: GenerateRef<
    (typeof IdentifiersTypes)[K]
  >;
};

// Extract individual id types
// export type IBlockRef = Id["Block"];
export type IItemRef = Id["Item"];
// export type IEntityRef = Id["Entity"];
// export type IBiomeRef = Id["Biome"];
// export type ISoundEventRef = Id["SoundEvent"];
// export type IParticleRef = Id["Particle"];
// export type IEnchantmentRef = Id["Enchantment"];
// export type IMobEffectRef = Id["MobEffect"];
// export type IDimensionRef = Id["Dimension"];
// export type IStructureRef = Id["Structure"];
// export type ILootTableRef = Id["LootTable"];
// export type IRecipeRef = Id["Recipe"];
// export type ITagRef = Id["Tag"];
// export type IAttributeRef = Id["Attribute"];
// export type ICustomModelDataRef = Id["CustomModelData"];
// export type IAdvancementRef = Id["Advancement"];
// export type IPredicateRef = Id["Predicate"];
// export type ITrimPatternRef = Id["TrimPattern"];
// export type IGameEventRef = Id["GameEvent"];
// export type ICustomRef = Id["Custom"];