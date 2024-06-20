import { IRef } from "./resource";

export enum ResourceTextureType {
  Language = "lang",
  BlockStates = "blockstates",
  Models = "models",
  Textures = "textures",
  Atlases = "atlases",
  Font = "font",
  Text = "text",
  Particles = "particles",
  Shaders = "shaders",
}

// for datapacks that work with modded content
// copy paste this to extend the tag system
// Utility type to generate tag types from TagType enum
type GenerateResTexRef<T extends string> = IRef & {
  readonly __resourceTextureTypeBrand: T;
};

// Generate tag types dynamically
export type ResTexRef = {
  [K in ResourceTextureType]: GenerateResTexRef<K>;
};

export enum TextureType {
  Block = "block",
  ColorMap = "colormap",
  Effect = "effect",
  Entity = "entity",
  Environment = "environment",
  Font = "font",
  Gui = "gui",
  Item = "item",
  Map = "map",
  Misc = "misc",
  MobEffect = "mob_effect",
  Painting = "painting",
  Particle = "particle",
  Trims = "trims",
}

type GenerateTexRef<T extends string> =
  ResTexRef[ResourceTextureType.Textures] & {
    readonly __textureTypeBrand: T;
  };

export type TextureRef = {
  [K in TextureType]: GenerateTexRef<K>;
};

export enum ModelType {
  Block = "block",
  Item = "item",
}

type GenerateModelRef<T extends string> =
  ResTexRef[ResourceTextureType.Models] & {
    readonly __modelTypeBrand: T;
  };

export type ModelRef = {
  [K in TextureType]: GenerateModelRef<K>;
};
