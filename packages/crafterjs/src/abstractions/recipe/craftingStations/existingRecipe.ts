import { ResLocRef, ResourceType } from "@crafter-js/mc-schema";
import { ContentGenerator } from "../../content";
import { Namespace } from "../../namespace";

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
}
