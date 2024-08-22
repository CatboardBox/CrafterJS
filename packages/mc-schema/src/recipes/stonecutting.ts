import { IItemStack } from "../item";
import {
  IRecipeBase,
  IRecipeIngredient,
  RecipeType,
} from "./common";

export interface IStonecuttingRecipe extends IRecipeBase {
  type: RecipeType.Stonecutting;
  ingredient: IRecipeIngredient;
  result: IItemStack;
}
