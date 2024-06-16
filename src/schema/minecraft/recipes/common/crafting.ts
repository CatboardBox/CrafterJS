import {
  IRecipeBase,
  IRecipeResultMultiple,
  RecipeType,
} from "../common";
import { IRecipeBookSupport, RecipeCategory } from "../recipebook";

export interface ICraftingRecipeBase extends IRecipeBase,IRecipeBookSupport {
  type: RecipeType.CraftingShaped | RecipeType.CraftingShapeless;
  /**
   * @inheritdoc
   * 
   * Defaults to {@link RecipeCategory.Misc}.
   */
  category?:
    | RecipeCategory.Equipment
    | RecipeCategory.Building
    | RecipeCategory.Misc
    | RecipeCategory.Redstone;
  result: IRecipeResultMultiple;
}
