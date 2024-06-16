import { ITagRef } from "./resource";

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
type GenerateTagRef<T extends string> = ITagRef & {
  readonly __refBrand: `tag_${T}`;
};

// Generate tag types dynamically
type TagRefs = {
  [K in keyof typeof TagType]: GenerateTagRef<(typeof TagType)[K]>;
};

// Extract individual tag types
export type IBlockTagRef = TagRefs["Block"];
export type IItemTagRef = TagRefs["Item"];
export type IEntityTagRef = TagRefs["Entity"];
export type IFluidTagRef = TagRefs["Fluid"];
export type IGameEventTagRef = TagRefs["GameEvent"];
export type IBiomeTagRef = TagRefs["Biome"];
export type IStructureTagRef = TagRefs["Structure"];
export type IFlatLevelGeneratorPresetTagRef =
  TagRefs["FlatLevelGeneratorPreset"];
export type IWorldPresetTagRef = TagRefs["WorldPreset"];
export type ICatVariantTagRef = TagRefs["CatVariant"];
export type IPaintingVariantTagRef = TagRefs["PaintingVariant"];
export type IBannerPatternTagRef = TagRefs["BannerPattern"];
export type IInstrumentTagRef = TagRefs["Instrument"];
export type IPointOfInterestTypeTagRef = TagRefs["PointOfInterestType"];
export type IDamageTypeTagRef = TagRefs["DamageType"];
export type IEnchantmentTagRef = TagRefs["Enchantment"];
export type IFunctionTagRef = TagRefs["Function"];
