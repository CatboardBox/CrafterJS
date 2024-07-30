import { logger } from "../../logger";
import {
  IAdvancement,
  IAdvancementCriteriaRef,
  IRootAdvancement,
  ResLocRef,
  ResourceType,
} from "../../schema";
import { IAdvancementCriteria } from "../../schema/minecraft/advancements/criteriaTriggers";
import { ContentGenerator } from "../content";
import { Namespace, NestedNamespace } from "../namespace";

export class Advancement extends ContentGenerator<
  ResLocRef[ResourceType.Advancement],
  IAdvancement
> {
  public constructor({
    name,
    parent,
  }: {
    name: string;
    parent: Advancement | AdvancementTab;
  }) {
    super({
      type: [ResourceType.Advancement],
      name,
      namespace: parent.getNamespace(),
      data: {
        parent: parent.ref,
        display: {
          icon: {
            id: "minecraft:stone" as ResLocRef[ResourceType.Item],
          },
          title: "untitled advancement",
          description: "untitled advancement description",
        },
        requirements: [],
        rewards: {},
        criteria: {},
      },
    });
  }

  public getNamespace() {
    return this.namespace;
  }

  public setDisplay(display: IAdvancement["display"]) {
    this.constructedData.display = display;
    return this;
  }

  public addRequirements(...requirements: Criteria[]) {
    const requiredCriteria: IAdvancementCriteriaRef[] = [];
    requirements.forEach((element) => {
      const name = `${element.name}` as IAdvancementCriteriaRef;
      requiredCriteria.push(name);
      if (
        this.constructedData.criteria[name] &&
        this.constructedData.criteria[name] !== element.getCriteria()
      )
        logger.warn("Duplicate criteria name, will be overwritten");
      this.constructedData.criteria[name] = element.getCriteria();
    });
    this.constructedData.requirements.push(requiredCriteria);
    return this;
  }

  public setRewards(rewards: IAdvancement["rewards"]) {
    this.constructedData.rewards = rewards;
    return this;
  }
}
export class AdvancementTab extends ContentGenerator<
  ResLocRef[ResourceType.Advancement],
  IRootAdvancement
> {
  constructor({ name, namespace }: { name: string; namespace: Namespace }) {
    const nestedNamespace = new NestedNamespace(name, namespace);
    super({
      type: [ResourceType.Advancement],
      name: "root",
      namespace: nestedNamespace,
      data: {
        display: {
          icon: {
            id: "minecraft:stone" as ResLocRef[ResourceType.Item],
          },
          title: "untitled advancement tab",
          description: "new advancement tab",
          background:
            "minecraft:textures/gui/advancements/backgrounds/adventure.png",
        },
        criteria: {},
        requirements: [],
        rewards: {},
      },
    });
  }

  public getNamespace() {
    return this.namespace;
  }

  public setDisplay(display: IRootAdvancement["display"]) {
    this.constructedData.display = display;
    return this;
  }

  public addRequirements(...requirements: Criteria[]) {
    const requiredCriteria: IAdvancementCriteriaRef[] = [];
    requirements.forEach((element) => {
      const name = `${element.name}` as IAdvancementCriteriaRef;
      requiredCriteria.push(name);
      if (!this.constructedData.criteria) this.constructedData.criteria = {};
      else if (
        this.constructedData.criteria[name] &&
        this.constructedData.criteria[name] !== element.getCriteria()
      )
        logger.warn("Duplicate criteria name, will be overwritten");
      this.constructedData.criteria[name] = element.getCriteria();
    });
    this.constructedData.requirements.push(requiredCriteria);
    return this;
  }

  public setRewards(rewards: IRootAdvancement["rewards"]) {
    this.constructedData.rewards = rewards;
    return this;
  }
}

export class Criteria {
  private data: IAdvancementCriteria;
  public readonly name: string;
  constructor(name: string, data: IAdvancementCriteria) {
    this.data = { ...data };
    this.name = name;
  }

  public getCriteria(): IAdvancementCriteria {
    return this.data;
  }
}
