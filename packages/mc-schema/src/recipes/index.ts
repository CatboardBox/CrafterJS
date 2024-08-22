export * from "./common";
export * from "./common/cooking";
export * from "./common/crafting";
export * from "./common/smithing";

export * from "./recipebook";
export { IBlastingRecipe } from "./blasting";
export { ICampfireCookingRecipe } from "./campfireCooking";
export { ICraftingShapedRecipe } from "./craftingShaped";
export { ICraftingShapelessRecipe } from "./craftingShapeless";
export { ISmeltingRecipe } from "./smelting";
export { ISmithingTransformRecipe } from "./smithingTransform";
export { ISmithingTrimRecipe } from "./smithingTrim";
export { ISmokingRecipe } from "./smoking";
export { IStonecuttingRecipe } from "./stonecutting";

import { IBlastingRecipe } from "./blasting";
import { ICampfireCookingRecipe } from "./campfireCooking";
import { ICraftingShapedRecipe } from "./craftingShaped";
import { ICraftingShapelessRecipe } from "./craftingShapeless";
import { ISmeltingRecipe } from "./smelting";
import { ISmithingTransformRecipe } from "./smithingTransform";
import { ISmithingTrimRecipe } from "./smithingTrim";
import { ISmokingRecipe } from "./smoking";
import { IStonecuttingRecipe } from "./stonecutting";

export type IRecipe =
  | IBlastingRecipe
  | ICampfireCookingRecipe
  | ICraftingShapedRecipe
  | ICraftingShapelessRecipe
  | ISmeltingRecipe
  | ISmithingTransformRecipe
  | ISmithingTrimRecipe
  | ISmokingRecipe
  | IStonecuttingRecipe;
