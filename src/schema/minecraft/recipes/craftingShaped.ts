import { IItemStack } from "../item";
import { IRecipeIngredient,  RecipeType } from "./common";
import { ICraftingRecipeBase } from "./common/crafting";
interface Keys {
  [key: string]: IRecipeIngredient;
}

/**
 * Represents a shaped crafting recipe in a `crafting table`.
 */
export interface ICraftingShapedRecipe extends ICraftingRecipeBase {
  type: RecipeType.CraftingShaped;
  /**
   * Determines if a notification is shown when unlocking the recipe.
   */
  show_notification?: boolean;
  pattern: Array<string>;
  key: Keys;
  result: IItemStack;
}
