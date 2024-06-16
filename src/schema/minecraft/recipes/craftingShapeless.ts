import {
  IRecipeIngredient,
  RecipeType,
} from "./common";
import { ICraftingRecipeBase } from "./common/crafting";

/**
 * Represents a shapeless crafting recipe in a `crafting table`.
 */
export interface ICraftingShapelessRecipe extends ICraftingRecipeBase {
  type: RecipeType.CraftingShapeless;
  ingredients: (IRecipeIngredient)[];
}
