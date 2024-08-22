import { IRecipeBase,  IRecipeIngredientSingle, RecipeType } from "../common";


export interface ISmithingRecipeBase extends IRecipeBase {
  type: RecipeType.SmithingTransform | RecipeType.SmithingTrim;
  base: IRecipeIngredientSingle;
  addition: IRecipeIngredientSingle;
  template: IRecipeIngredientSingle;
}
