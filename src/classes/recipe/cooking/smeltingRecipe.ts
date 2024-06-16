import {
  IRecipeIngredient,
  IRecipeResultSingle,
  ISmeltingRecipe,
  RecipeType,
} from "../../../schema";
import { Namespace } from "../../namespace";
import { Recipe } from "../recipe";
import { BlastingRecipe } from "./blastingRecipe";
import { CampfireCookingRecipe } from "./campfireCookingRecipe";
import { SmokingRecipe } from "./smokingRecipe";

const defaultRecipe: ISmeltingRecipe = {
  type: RecipeType.Smelting,
  ingredient: undefined as unknown as IRecipeIngredient,
  result: undefined as unknown as IRecipeResultSingle,
};
export class SmeltingRecipe extends Recipe<ISmeltingRecipe> {
  private readonly orignalName: string;
  constructor(params: { name: string; id?: string; namespace: Namespace }) {
    super({
      data: defaultRecipe,
      ...params,
    });
    this.orignalName = params.name;
  }

  usingIngredient(ingredient: IRecipeIngredient): SmeltingRecipe {
    this.constructedData.ingredient = ingredient;
    return this;
  }

  returnsResult(result: IRecipeResultSingle): SmeltingRecipe {
    this.constructedData.result = result;
    return this;
  }

  returnsXP(xp: number): SmeltingRecipe {
    this.constructedData.experience = xp;
    return this;
  }

  takesTime(time: number): SmeltingRecipe {
    this.constructedData.cookingtime = time;
    return this;
  }

  protected validate(): void {
    if (!this.constructedData.result) throw new Error("Result is not defined");
    if (!this.constructedData.ingredient)
      throw new Error("Ingredient is not defined");
  }

  public toBlastingEquivalent({
    experienceMultiplier = 1,
    cookingTimeMultiplier = 0.5,
  }: {
    experienceMultiplier?: number;
    cookingTimeMultiplier?: number;
  } = {}): BlastingRecipe {
    const recipe = new BlastingRecipe({
      name: `${this.orignalName} (Converted to Blasting)`,
      namespace: this.namespace,
      id: `converted_from_${this.id}`,
    })
      .usingIngredient(this.constructedData.ingredient)
      .returnsResult(this.constructedData.result);
    recipe.returnsXP(
      (this.constructedData.experience ?? 0) * experienceMultiplier
    );
    recipe.takesTime(
      Math.ceil(
        (this.constructedData.cookingtime ?? 200) * cookingTimeMultiplier
      )
    );
    return recipe;
  }

  public toCampfireCookingEquivalent({
    cookingTimeMultiplier = 3,
  }: {
    cookingTimeMultiplier?: number;
  } = {}): CampfireCookingRecipe {
    const recipe = new CampfireCookingRecipe({
      name: `${this.orignalName} (Converted to Campfire Cooking)`,
      namespace: this.namespace,
      id: `converted_from_${this.id}`,
    })
      .usingIngredient(this.constructedData.ingredient)
      .returnsResult(this.constructedData.result);
    //cannot use default cook time because for some reason its 6 times faster (100 ticks) than every other vanilla campfire recipe (600 tick)
    recipe.takesTime(
      Math.ceil(
        (this.constructedData.cookingtime ?? 200) * cookingTimeMultiplier
      )
    );
    return recipe;
  }

  public toSmokingEquivalent({
    experienceMultiplier = 1,
    cookingTimeMultiplier = 0.5,
  }: {
    experienceMultiplier?: number;
    cookingTimeMultiplier?: number;
  } = {}): SmokingRecipe {
    const recipe = new SmokingRecipe({
      name: `${this.orignalName} (Converted to Smoking)`,
      namespace: this.namespace,
      id: `converted_from_${this.id}`,
    })
      .usingIngredient(this.constructedData.ingredient)
      .returnsResult(this.constructedData.result);
    recipe.returnsXP(
      (this.constructedData.experience ?? 0) * experienceMultiplier
    );
    recipe.takesTime(
      Math.ceil(
        (this.constructedData.cookingtime ?? 200) * cookingTimeMultiplier
      )
    );
    return recipe;
  }
}
