import { IRef, ResourceType } from "./resource";

export enum TagType {
  Block = "block",
  Item = "item",
  Entity = "entity",
  Fluid = "fluid",
  GameEvent = "gameEvent",
  Biome = "biome",
  Structure = "structure",
  FlatLevelGeneratorPreset = "flatLevelGeneratorPreset",
  WorldPreset = "worldPreset",
  CatVariant = "catVariant",
  PaintingVariant = "paintingVariant",
  BannerPattern = "bannerPattern",
  Instrument = "instrument",
  PointOfInterestType = "pointOfInterestType",
  DamageType = "damageType",
  Enchantment = "enchantment",
  Function = "function",
}

// Utility type to generate tag types from TagType enum
type GenerateTagRef<T extends string> = IRef[ResourceType.Tags] & {
  readonly __refBrand: `tag_${T}`;
};

// Generate tag types dynamically
export type ITagRef = {
  [K in TagType]: GenerateTagRef<K>;
};