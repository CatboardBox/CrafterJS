import { TagType, ResourceType, TagRef, ITag, ResLocRef } from "../../schema";
import { ContentGenerator } from "../content";
import { Namespace } from "../namespace";

export class BaseTag<
  Type extends TagType,
  Res extends ResourceType
> extends ContentGenerator<TagRef[Type], ITag<Type, Res>> {
  constructor(
    tagType: TagType,
    name: string,
    namespace: Namespace,
    additionalResourcePath: string[] = []
  ) {
    super({
      type: [ResourceType.Tags, tagType, ...additionalResourcePath],
      name,
      namespace,
      data: { values: [] },
      buildPriority: 100,
    });
  }

  public get ref(): TagRef[Type] {
    return `#${super.ref}` as TagRef[Type];
  }

  public addValue(
    ...value: (
      | TagRef[Type]
      | ResLocRef[Res]
      | ContentGenerator<ResLocRef[Res], unknown>
      | BaseTag<TagType, ResourceType>
    )[]
  ) {
    value.forEach((v) => {
      if (v instanceof BaseTag) {
        this.constructedData.values.push(v.ref);
      } else if (typeof v === "object" && "ref" in v) {
        this.constructedData.values.push(v.ref);
      } else {
        this.constructedData.values.push(v);
      }
    });
    return this;
  }
}
