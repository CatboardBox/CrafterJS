import { ResLocRef, TagRef, ResourceType, TagType } from "../../ref";

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
      item: ResLocRef[ResourceType.Item];
    }
  | {
      tag: TagRef[TagType.Item];
    };

export type IRecipeIngredient =
  | IRecipeIngredientSingle
  | IRecipeIngredientSingle[];

export interface IRecipeBase {
  type: RecipeType;
}
