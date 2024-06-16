import { RecipeType } from "./common";
import { ICookingRecipeBase } from "./common/cooking";
import { RecipeCategory } from "./recipebook";

/**
 * Represents a recipe in a `smoker`.
 */
export interface ISmokingRecipe extends ICookingRecipeBase {
  type: RecipeType.Smoking;
  /**
   * @inheritdoc
   *
   * Defaults to {@link RecipeCategory.Food}
   */
  category?: RecipeCategory.Food;
  /**
   * @inheritdoc
   *
   * Defaults to `100`.
   */
  cookingtime?: number;
}
