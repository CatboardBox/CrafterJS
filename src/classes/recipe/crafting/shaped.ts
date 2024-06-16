import {
  ICraftingShapedRecipe,
  IRecipeIngredient,
  IRecipeIngredientSingle,
  IRecipeResultMultiple,
  RecipeType,
} from "../../../schema";
import { Namespace } from "../../namespace";
import { Recipe } from "../recipe";
import { IPattern, parsePattern } from "./pattern";

const defaultShapedRecipe: ICraftingShapedRecipe = {
  type: RecipeType.CraftingShaped,
  pattern: undefined as unknown as Array<string>,
  key: {} as unknown as Record<string, IRecipeIngredient>,
  result: undefined as unknown as IRecipeResultMultiple,
};
export class ShapedRecipe extends Recipe<ICraftingShapedRecipe> {
  private keyToSymbol: Record<string, string> = {};
  private keyToIngredient: Record<string, IRecipeIngredient> = {};
  constructor(params: { name: string; id?: string; namespace: Namespace }) {
    super({
      data: defaultShapedRecipe,
      ...params,
    });
  }

  showNotification(show: boolean = true): ShapedRecipe {
    this.constructedData.show_notification = show;
    return this;
  }

  fromPattern(pattern: IPattern): ShapedRecipe {
    const { keyMap, craftingPattern } = parsePattern(pattern);
    this.constructedData.pattern = craftingPattern;
    this.keyToSymbol = keyMap;
    return this;
  }

  fromInlinedPattern(pattern: IPattern): ShapedRecipe {
    this.fromPattern(pattern);
    const keyToIngredient = Object.entries(this.keyToSymbol).reduce(
      (acc, [key]) => {
        acc[key] = {
          item: key,
        } as IRecipeIngredientSingle;
        return acc;
      },
      {} as Record<string, IRecipeIngredient>
    );
    this.usingIngredients(keyToIngredient);
    return this;
  }

  usingIngredients(keys: Record<string, IRecipeIngredient>): ShapedRecipe {
    this.keyToIngredient = keys;
    return this;
  }

  returnsResult(result: IRecipeResultMultiple): ShapedRecipe {
    this.constructedData.result = result;
    return this;
  }

  protected validate(): void {
    if (!this.constructedData.pattern)
      throw new Error("Pattern is not defined");
    if (!this.constructedData.key) throw new Error("Key is not defined");
    if (!this.constructedData.result) throw new Error("Result is not defined");
  }

  private mapSymbolToIngredient(): void {
    const keySet = new Set(Object.keys(this.keyToIngredient));
    this.constructedData.key = Object.entries(this.keyToIngredient).reduce(
      (acc, [key, value]) => {
        const newKey = this.keyToSymbol[key];
        keySet.delete(key);
        acc[newKey] = value;
        return acc;
      },
      {} as Record<string, IRecipeIngredient>
    );

    if (keySet.size > 0)
      throw new Error(`Unused keys: ${Array.from(keySet).join(", ")}`);
  }

  protected compileContent(): string {
    this.mapSymbolToIngredient();
    return super.compileContent();
  }
}
