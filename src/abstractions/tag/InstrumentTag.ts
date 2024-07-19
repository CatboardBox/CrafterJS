import { TagType, ResourceType } from "../../schema";
import { Namespace } from "../namespace";
import { BaseTag } from "./BaseTag";


export class InstrumentTag extends BaseTag<
  TagType.Instrument, ResourceType.Instrument
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Instrument, name, namespace);
  }
}
