import { ResLocRef, ResourceType } from "../../schema";
import { ContentGenerator } from "../content";
import { Namespace } from "../namespace";

/**
 * Represents an existing recipe that is already defined in the game.
 * This is used to prevent the remove pre-defined recipes.
 * a better alternative would be to use define in game recipes WITH the actual recipe but it will not be happening soon due to complexity
 */
export class ExistingRecipe extends ContentGenerator<
  ResLocRef[ResourceType.Recipe],
  unknown
> {
  constructor(name: string, namespace: Namespace) {
    super({
      type: [ResourceType.Recipe],
      name,
      namespace,
      data: {},
    });
  }

  public delete(): void {
    this.isUsed = true;
  }

  protected compileContent(): string {
    return "";
  }
}
