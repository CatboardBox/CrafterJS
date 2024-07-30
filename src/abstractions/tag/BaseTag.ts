import { TagType, ResourceType, TagRef, ITag, ResLocRef } from "../../schema";
import { ContentGenerator } from "../content";
import { Namespace } from "../namespace";

export class BaseTag<
  Type extends TagType,
  Res extends ResourceType
> extends ContentGenerator<TagRef[Type], ITag<Type, Res>> {
  private readonly _ref: TagRef[Type];
  private _isBuilt = false;
  private readonly _referencedTags: BaseTag<TagType, ResourceType>[] = [];
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

    const namespacePath = this.namespace.namespacePath;
    this._ref = `#${namespacePath}${this.id}` as TagRef[Type];
  }

  public get ref(): TagRef[Type] {
    this.isUsed = true;
    return this._ref;
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
        this._constructedData.values.push(v._ref);
        this._referencedTags.push(v);
      } else if (typeof v === "object" && "ref" in v) {
        this.constructedData.values.push(v.ref);
      } else {
        this.constructedData.values.push(v);
      }
    });
    return this;
  }

  protected build(): void {
    if (this._isBuilt) return;
    super.build();
  }

  protected compileContent(): string {
    this._isBuilt = true;
    this._referencedTags.forEach((tag) => {
      console.log(tag);
      tag.isUsed = true;
      tag.build();
    });
    return super.compileContent();
  }
}
