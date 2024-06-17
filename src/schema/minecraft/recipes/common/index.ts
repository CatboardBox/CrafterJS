import {IRef,ITagRef, ResourceType, TagType } from "../../ref";

export enum RecipeType {
  Blasting = "minecraft:blasting",
  CampfireCooking = "minecraft:campfire_cooking",
  CraftingShaped = "minecraft:crafting_shaped",
  CraftingShapeless = "minecraft:crafting_shapeless",
  // CraftingSpecial = "minecraft:crafting_special", //todo
  Smelting = "minecraft:smelting",
  SmithingTransform = "minecraft:smithing_transform",
  SmithingTrim = "minecraft:smithing_trim",
  Smoking = "minecraft:smoking",
  Stonecutting = "minecraft:stonecutting",
}

export type IRecipeIngredientSingle =
  | {
      item: IRef[ResourceType.Item];
    }
  | {
      tag: ITagRef[TagType.Item];
    };

export type IRecipeIngredient =
  | IRecipeIngredientSingle
  | IRecipeIngredientSingle[];

export interface IRecipeBase {
  type: RecipeType;
  result: IRecipeResultSingle;
}

export interface IRecipeResultSingle {
  id: IRef[ResourceType.Item];
  components?: unknown; //todo
}

export interface IRecipeResultMultiple extends IRecipeResultSingle {
  count?: number;
}
