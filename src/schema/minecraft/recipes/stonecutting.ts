import {
  IRecipeBase,
  IRecipeIngredient,
  IRecipeResultMultiple,
  RecipeType,
} from "./common";

export interface IStonecuttingRecipe extends IRecipeBase {
  type: RecipeType.Stonecutting;
  ingredient: IRecipeIngredient;
  result: IRecipeResultMultiple;
}
