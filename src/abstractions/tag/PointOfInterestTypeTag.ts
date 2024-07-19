import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class PointOfInterestTypeTag extends BaseTag<
  TagType.PointOfInterestType, ResourceType.PointOfInterestType
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.PointOfInterestType, name, namespace);
  }
}
