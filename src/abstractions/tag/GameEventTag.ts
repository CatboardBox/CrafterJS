import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class GameEventTag extends BaseTag<
  TagType.GameEvent, ResourceType.GameEvent
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.GameEvent, name, namespace);
  }
}
