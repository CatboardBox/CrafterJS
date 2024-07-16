import {
  ICraftingShapelessRecipe,
  IItemStack,
  IRecipeIngredient,
  RecipeType,
} from "../../../../schema";
import { Namespace } from "../../../namespace";
import { Recipe } from "../../recipe";

const defaultShapelessRecipe: ICraftingShapelessRecipe = {
  type: RecipeType.CraftingShapeless,
  ingredients: undefined as unknown as Array<IRecipeIngredient>,
  result: undefined as unknown as IItemStack,
};
export class ShapelessRecipe extends Recipe<ICraftingShapelessRecipe> {
  constructor(params: { name: string; id?: string; namespace: Namespace }) {
    super({
      data: defaultShapelessRecipe,
      ...params,
    });
  }

  usingIngredients(keys: IRecipeIngredient[]): ShapelessRecipe {
    this.constructedData.ingredients = keys;
    return this;
  }

  returnsResult(result: IItemStack): ShapelessRecipe {
    this.constructedData.result = result;
    return this;
  }

  protected validate(): void {
    if (!this.constructedData.result)
      throw new Error("Result is not defined");
  }
}
