import { IRecipeBase, ResLocRef, RecipeCategory, ResourceType } from "../../schema";
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

function addCategory<T extends IRecipeBase = IRecipeBase>(
  recipe: Recipe<T>,
  category: RecipeCategory
): void {
  if (
    CategoryMap[recipe.ref] !== undefined &&
    CategoryMap[recipe.ref] !== category
  ) {
    throw new Error(
      `Recipe ${recipe.ref} is already added to a different category`
    );
  }
  CategoryMap[recipe.ref] = category;
}

function addCategoryGroup<T extends IRecipeBase = IRecipeBase>(
  recipe: Recipe<T>,
  category: RecipeCategory,
  group: string
): void {
  addCategory(recipe, category);
  if (
    CategoryGroupMap[recipe.ref] !== undefined &&
    CategoryGroupMap[recipe.ref] !== group
  ) {
    throw new Error(
      `Recipe ${recipe.ref} is already added to different category group`
    );
  }
  CategoryGroupMap[recipe.ref] = group;
}

export class Category<
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
    addCategory(recipe, this.category);
  }

  public createGroup(group: string): CategoryGroup<C> {
    return new CategoryGroup(this.category, group);
  }
}

export class CategoryGroup<C extends RecipeCategory> extends Category<
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
    // Add recipe to category
    addCategoryGroup(recipe, this.category, this.group);
  }
}
