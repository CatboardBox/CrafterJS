import {
  ICampfireCookingRecipe,
  IRecipeIngredient,
  IRecipeResultSingle,
  RecipeType,
} from "../../../schema";
import { Namespace } from "../../namespace";
import { Recipe } from "../recipe";

const defaultRecipe: ICampfireCookingRecipe = {
  type: RecipeType.CampfireCooking,
  ingredient: undefined as unknown as IRecipeIngredient,
  result: undefined as unknown as IRecipeResultSingle,
};
export class CampfireCookingRecipe extends Recipe<ICampfireCookingRecipe> {
  constructor(params: { name: string; id?: string; namespace: Namespace }) {
    super({
      data: defaultRecipe,
      ...params,
    });
  }

  usingIngredient(ingredient: IRecipeIngredient): CampfireCookingRecipe {
    this.constructedData.ingredient = ingredient;
    return this;
  }

  returnsResult(result: IRecipeResultSingle): CampfireCookingRecipe {
    this.constructedData.result = result;
    return this;
  }

  takesTime(time: number): CampfireCookingRecipe {
    this.constructedData.cookingtime = time;
    return this;
  }

  protected validate(): void {
    if (!this.constructedData.result) throw new Error("Result is not defined");
    if (!this.constructedData.ingredient)
      throw new Error("Ingredient is not defined");
  }
}
