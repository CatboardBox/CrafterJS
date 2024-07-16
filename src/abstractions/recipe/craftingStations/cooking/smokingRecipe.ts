import {
  IItem,
  IRecipeIngredient,
  ISmokingRecipe,
  RecipeType,
} from "../../../../schema";
import { Namespace } from "../../../namespace";
import { Recipe } from "../../recipe";

const defaultRecipe: ISmokingRecipe = {
  type: RecipeType.Smoking,
  ingredient: undefined as unknown as IRecipeIngredient,
  result: undefined as unknown as IItem,
};
export class SmokingRecipe extends Recipe<ISmokingRecipe> {
  constructor(params: { name: string; id?: string; namespace: Namespace }) {
    super({
      data: defaultRecipe,
      ...params,
    });
  }

  usingIngredient(ingredient: IRecipeIngredient): SmokingRecipe {
    this.constructedData.ingredient = ingredient;
    return this;
  }

  returnsResult(result: IItem): SmokingRecipe {
    this.constructedData.result = result;
    return this;
  }

  returnsXP(xp: number): SmokingRecipe {
    this.constructedData.experience = xp;
    return this;
  }

  takesTime(time: number): SmokingRecipe {
    this.constructedData.cookingtime = time;
    return this;
  }

  protected validate(): void {
    if (!this.constructedData.result) throw new Error("Result is not defined");
    if (!this.constructedData.ingredient)
      throw new Error("Ingredient is not defined");
  }
}
