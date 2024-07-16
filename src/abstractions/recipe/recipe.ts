import {
  IRecipeBase,
  ResLocRef,
  RecipeCategory,
  ResourceType,
} from "../../schema";
import { ContentGenerator } from "../content";
import { Namespace } from "../namespace";
import { getCategory, getCategoryGroup } from "./recipeBook";

export class Recipe<T extends IRecipeBase> extends ContentGenerator<
  ResLocRef[ResourceType.Recipe],
  T
> {
  constructor(params: {
    name: string;
    id?: string;
    namespace: Namespace;
    data: T;
  }) {
    const id = params.id ?? params.name;
    const recipeType = params.data.type;
    super({
      type: [ResourceType.Recipe],
      ...params,
      id: `${recipeType.replace(":", "__")}_${id}`,
    });
  }

  protected compileContent(): string {
    if (!hasRecipeBookSupport(this.constructedData))
      return super.compileContent();
    this.constructedData.category = getCategory(this);
    this.constructedData.group = getCategoryGroup(this);
    return super.compileContent();
  }
}

function hasRecipeBookSupport<
  T extends RecipeCategory = RecipeCategory,
  G extends string = string
>(
  obj: unknown
): obj is {
  category?: T;
  group?: G;
} {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "category" in obj &&
    "group" in obj
  );
}
