import { IAdvancementCriteria } from "../../schema/minecraft/advancements/criteriaTriggers";
import { forceSnakeCase } from "../../util";

export class AdvancementCondition {
  private data: IAdvancementCriteria;
  public readonly id: string;
  constructor(name: string, data: IAdvancementCriteria) {
    this.data = { ...data };
    this.id = forceSnakeCase(name);
  }

  public getCriteria(): IAdvancementCriteria {
    return this.data;
  }
}
