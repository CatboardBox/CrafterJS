import { ResLocRef, ResourceType } from "./resource";

export enum TagType {
  Block = "block",
  Item = "item",
  Entity = "entity",
  Fluid = "fluid",
  GameEvent = "game_event",
  Biome = "biome",
  Structure = "structure",
  FlatLevelGeneratorPreset = "flat_level_generator_preset",
  WorldPreset = "world_preset",
  CatVariant = "cat_variant",
  PaintingVariant = "painting_variant",
  BannerPattern = "banner_pattern",
  Instrument = "instrument",
  PointOfInterestType = "point_of_interest_type",
  DamageType = "damage_type",
  Enchantment = "enchantment",
  Function = "function",
}

// for datapacks that work with modded content
// copy paste this to extend the tag system
// Utility type to generate tag types from TagType enum
type GenerateTagRef<T extends string> = ResLocRef[ResourceType.Tags] & {
  readonly __tagTypeBrand: T;
};

// Generate tag types dynamically
export type TagRef = {
  [K in TagType]: GenerateTagRef<K>;
};

/**
 * needed due to tag inconsistencies
 * :(
 */
export type TagRefNoHash = {
  [K in TagType]: GenerateTagRef<K> & {
    readonly __tagWithoutHashBrand: unique symbol;
  };
};
