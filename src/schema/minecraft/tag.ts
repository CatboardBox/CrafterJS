import { IRef, ITagRef, ResourceType, TagType } from "./ref";

export interface ITag<Tag extends TagType, Res extends ResourceType> {
    values: (ITagRef[Tag] | IRef[Res])[];
    replace?: boolean;
  }