import { IItem } from "../item";
import { ISmithingRecipeBase } from "./common/smithing";

/**
 * Represents a `upgrading` recipe in a `smithing table`.
 *
 * The resulting item copies the components of the base item.
 */
export interface ISmithingTransformRecipe
  // doesnt have a explicit result
  extends ISmithingRecipeBase {
  result: IItem;
}
