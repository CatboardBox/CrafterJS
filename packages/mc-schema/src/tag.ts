import { ResLocRef, TagRef, ResourceType, TagType } from "./ref";

export interface ITag<Tag extends TagType, Res extends ResourceType> {
    values: (TagRef[Tag] | ResLocRef[Res])[];
    replace?: boolean;
  }