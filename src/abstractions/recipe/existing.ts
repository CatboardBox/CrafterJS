import { Namespace } from "../namespace";
import { Recipe } from "./recipe";

/**
 * Represents an existing recipe that is already defined in the game.
 * This is used to prevent the remove pre-defined recipes.
 * a better alternative would be to use define in game recipes WITH the actual recipe but it will not be happening soon due to complexity
 */
export class ExistingRecipe extends Recipe<never> {
  constructor(name: string, namespace: Namespace, rawData: unknown) {
    super({
      name,
      namespace,
      data: rawData as never,
    });
  }
}
