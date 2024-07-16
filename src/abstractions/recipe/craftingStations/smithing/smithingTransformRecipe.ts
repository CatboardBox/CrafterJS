import {
  IItem,
  IRecipeIngredientSingle,
  ISmithingTransformRecipe,
  RecipeType,
} from "../../../../schema";
import { Namespace } from "../../../namespace";
import { SmithingRecipeBase } from "./smithingRecipeBase";

const defaultRecipe: ISmithingTransformRecipe = {
  type: RecipeType.SmithingTransform,
  template: undefined as unknown as IRecipeIngredientSingle,
  base: undefined as unknown as IRecipeIngredientSingle,
  addition: undefined as unknown as IRecipeIngredientSingle,
  result: undefined as unknown as IItem,
};

export abstract class SmithingTransformRecipe extends SmithingRecipeBase<ISmithingTransformRecipe> {
  constructor(params: { name: string; id?: string; namespace: Namespace }) {
    super({
      data: defaultRecipe,
      ...params,
    });
  }

  protected validate(): void {
    if (this.constructedData.result === undefined)
      throw new Error("Result is not defined");
    super.validate();
  }

  protected compileContent(): string {
    return super.compileContent();
  }
}
