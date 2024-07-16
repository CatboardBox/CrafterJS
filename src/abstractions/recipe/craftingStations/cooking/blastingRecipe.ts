import {
  IBlastingRecipe,
  IItem,
  IRecipeIngredient,
  RecipeType,
} from "../../../../schema";
import { Namespace } from "../../../namespace";
import { Recipe } from "../../recipe";

const defaultRecipe: IBlastingRecipe = {
  type: RecipeType.Blasting,
  ingredient: undefined as unknown as IRecipeIngredient,
  result: undefined as unknown as IItem,
};
export class BlastingRecipe extends Recipe<IBlastingRecipe> {
  constructor(params: { name: string; id?: string; namespace: Namespace }) {
    super({
      data: defaultRecipe,
      ...params,
    });
  }

  usingIngredient(ingredient: IRecipeIngredient): BlastingRecipe {
    this.constructedData.ingredient = ingredient;
    return this;
  }

  returnsResult(result: IItem): BlastingRecipe {
    this.constructedData.result = result;
    return this;
  }

  returnsXP(xp: number): BlastingRecipe {
    this.constructedData.experience = xp;
    return this;
  }

  takesTime(time: number): BlastingRecipe {
    this.constructedData.cookingtime = time;
    return this;
  }

  protected validate(): void {
    if (!this.constructedData.result) throw new Error("Result is not defined");
    if (!this.constructedData.ingredient)
      throw new Error("Ingredient is not defined");
  }
}
