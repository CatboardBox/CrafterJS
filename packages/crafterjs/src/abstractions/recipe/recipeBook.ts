import {
  IRecipeBase,
  ResLocRef,
  RecipeCategory,
  ResourceType,
} from "@crafter-js/mc-schema";
import { Recipe } from "./recipe";

const CategoryMap: Record<ResLocRef[ResourceType.Recipe], RecipeCategory> = {};
const CategoryGroupMap: Record<ResLocRef[ResourceType.Recipe], string> = {};

export function getCategory<T extends IRecipeBase = IRecipeBase>(
  recipe: Recipe<T>
): RecipeCategory | undefined {
  return CategoryMap[recipe.ref];
}

export function getCategoryGroup<T extends IRecipeBase = IRecipeBase>(
  recipe: Recipe<T>
): string | undefined {
  return CategoryGroupMap[recipe.ref];
}

class Category<
  C extends RecipeCategory,
  U extends Record<string, unknown> = Record<string, unknown>
> {
  protected readonly category: C;
  constructor(category: C) {
    this.category = category;
  }

  public add<T extends { category: C } & U & IRecipeBase>(
    recipe: Recipe<T>
  ): void {
    // Add recipe to category
    if (
      CategoryMap[recipe.ref] !== undefined &&
      CategoryMap[recipe.ref] !== this.category
    ) {
      throw new Error(
        `Recipe ${recipe.ref} is already added to a different category`
      );
    }
    CategoryMap[recipe.ref] = this.category;
  }

  public createGroup(group: string): CategoryGroup<C> {
    return new CategoryGroup(this.category, group);
  }
}

class CategoryGroup<C extends RecipeCategory> extends Category<
  C,
  { group: string }
> {
  protected readonly group: string;

  constructor(category: C, group: string) {
    super(category);
    this.group = group;
  }

  public add<T extends { category: C; group: string } & IRecipeBase>(
    recipe: Recipe<T>
  ): void {
    super.add(recipe);
    if (
      CategoryGroupMap[recipe.ref] !== undefined &&
      CategoryGroupMap[recipe.ref] !== this.group
    ) {
      throw new Error(
        `Recipe ${recipe.ref} is already added to different category group`
      );
    }
    CategoryGroupMap[recipe.ref] = this.group;
  }
}

export const RecipeBook = {
  Category,
  CategoryGroup,
};