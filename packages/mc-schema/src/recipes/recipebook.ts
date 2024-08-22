export enum RecipeCategory {
  Blocks = "blocks",
  Building = "building",
  Equipment = "equipment",
  Food = "food",
  Misc = "misc",
  Redstone = "redstone",
}

export interface IRecipeBookSupport {
  /**
   *  Controls to which recipe book category the recipe belongs to
   */
  category?: RecipeCategory;
  /**
   * Used to group multiple recipes together in the recipe book. Recipes with same group identifier but different categories splits into two different groups.
   */
  group?: string;
}
