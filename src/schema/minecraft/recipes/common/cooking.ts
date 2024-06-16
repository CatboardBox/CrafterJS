import { IRecipeBase, IRecipeIngredient, RecipeType } from "../common";
import { IRecipeBookSupport, RecipeCategory } from "../recipebook";

export interface ICookingRecipeBase extends IRecipeBase, IRecipeBookSupport {
  type:
    | RecipeType.Smelting
    | RecipeType.Smoking
    | RecipeType.Blasting
    | RecipeType.CampfireCooking;

  category?: RecipeCategory.Food | RecipeCategory.Blocks | RecipeCategory.Misc;

  ingredient: IRecipeIngredient;
  /**
   * The cook time of the recipe in ticks.
   */
  cookingtime?: number;
  /**
   * The output experience of the recipe.
   */
  experience?: number;
}
