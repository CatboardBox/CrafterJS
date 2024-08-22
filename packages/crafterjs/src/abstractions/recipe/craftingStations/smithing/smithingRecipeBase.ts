import {
  ISmithingRecipeBase,
  ResLocRef,
  ResourceType,
  TagRef,
  TagType,
} from "@crafter-js/mc-schema";
import { Recipe } from "../../recipe";

export abstract class SmithingRecipeBase<
  T extends ISmithingRecipeBase
> extends Recipe<T> {
  public usingTemplate(template: ResLocRef[ResourceType.Item]) {
    this.constructedData.template = { item: template };
    return this;
  }
  public usingTemplateTag(template: TagRef[TagType.Item]) {
    this.constructedData.template = { tag: template };
    return this;
  }

  public withBase(base: ResLocRef[ResourceType.Item]) {
    this.constructedData.base = { item: base };
    return this;
  }
  public withBaseTag(base: TagRef[TagType.Item]) {
    this.constructedData.base = { tag: base };
    return this;
  }

  public withAddition(addition: ResLocRef[ResourceType.Item]) {
    this.constructedData.addition = { item: addition };
    return this;
  }
  public withAdditionTag(addition: TagRef[TagType.Item]) {
    this.constructedData.addition = { tag: addition };
    return this;
  }

  protected validate(): void {
    if (this.constructedData.base === undefined)
      throw new Error("Base ingredient is not defined");
    if (this.constructedData.addition === undefined)
      throw new Error("Addition ingredient is not defined");
    if (this.constructedData.template === undefined)
      throw new Error("Template ingredient is not defined");
  }

  protected compileContent(): string {
    return super.compileContent();
  }
}
