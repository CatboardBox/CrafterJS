import { RecipeType } from "./common";
import { ICookingRecipeBase } from "./common/cooking";
import { IRecipeBookSupport } from "./recipebook";

/**
 * Represents a recipe in a `campfire`.
 */
export interface ICampfireCookingRecipe
  // campfire recipes never give experience nor support recipe book
  extends Omit<ICookingRecipeBase, "experience" | keyof IRecipeBookSupport> {
  type: RecipeType.CampfireCooking;

  /**
   * @inheritdoc
   *
   * Defaults to `100`.
   *
   * Even though all vanilla campfire cooking recipes have a cook time of `600` ticks, the default is `100` ticks.
   */
  cookingtime?: number;
}
