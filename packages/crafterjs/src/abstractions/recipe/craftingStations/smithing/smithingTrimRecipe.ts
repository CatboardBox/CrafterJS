import {
    IRecipeIngredientSingle,
    ISmithingTrimRecipe,
    RecipeType,
  } from "@crafter-js/mc-schema";
  import { Namespace } from "../../../namespace";
  import { SmithingRecipeBase } from "./smithingRecipeBase";
  
  const defaultRecipe: ISmithingTrimRecipe = {
    type: RecipeType.SmithingTransform,
    template: undefined as unknown as IRecipeIngredientSingle,
    base: undefined as unknown as IRecipeIngredientSingle,
    addition: undefined as unknown as IRecipeIngredientSingle,
  };
  
  export abstract class SmithingTrimRecipe extends SmithingRecipeBase<ISmithingTrimRecipe> {
    constructor(params: { name: string; id?: string; namespace: Namespace }) {
      super({
        data: defaultRecipe,
        ...params,
      });
    }
  
    
  
    protected compileContent(): string {
      return super.compileContent();
    }
  }
  