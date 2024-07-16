import { ResLocRef, ResourceType } from "../../schema";
import { ContentGenerator } from "../content";
import { Namespace } from "../namespace";

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
    this.hasData = true;
  }

  protected compileContent(): string {
    return "";
  }
}
