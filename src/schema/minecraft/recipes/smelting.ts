import { IRecipeResultSingle, RecipeType } from "./common";
import { ICookingRecipeBase } from "./common/cooking";
import { RecipeCategory } from "./recipebook";

/**
 * Represents a recipe in a `furnace`.
 */
export interface ISmeltingRecipe extends ICookingRecipeBase {
  type: RecipeType.Smelting;
  /**
   * @inheritdoc
   *
   * Defaults to {@link RecipeCategory.Misc}.
   */
  category?: RecipeCategory.Food | RecipeCategory.Blocks | RecipeCategory.Misc;
  result: IRecipeResultSingle;
  experience?: number;
  /**
   * @inheritdoc
   *
   * Defaults to `200`.
   */
  cookingtime?: number;
}
