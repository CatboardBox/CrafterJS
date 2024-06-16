import { RecipeType } from "./common";
import { ICookingRecipeBase } from "./common/cooking";
import { RecipeCategory } from "./recipebook";

/**
 * Represents a recipe in a `blast furnace`.
 */
export interface IBlastingRecipe extends ICookingRecipeBase {
  type: RecipeType.Blasting;
  /**
   * @inheritdoc
   *
   * Defaults to {@link RecipeCategory.Misc}
   */
  category?: RecipeCategory.Blocks | RecipeCategory.Misc;
  /**
   * @inheritdoc
   *
   * Defaults to `100`.
   */
  cookingtime?: number;
}