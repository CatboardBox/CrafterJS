import { ISmithingRecipeBase } from "./common/smithing";

/**
 * Represents a `trimming` recipe in a `smithing table`.
 * 
 * Adds NBT Tags for the trim to the base item.
 */
export interface ISmithingTrimRecipe
  // doesnt have a explicit result
  extends Omit<ISmithingRecipeBase, "result"> {}
