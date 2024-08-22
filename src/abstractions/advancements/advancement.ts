import {
  IAdvancement,
  IRootAdvancement,
  ResLocRef,
  ResourceType,
} from "../../schema";
import { Namespace, NestedNamespace } from "../namespace";
import { AdvancementBase } from "./advancementBase";

const defaultAdvancement: IAdvancement = {
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
};

export class Advancement extends AdvancementBase<IAdvancement> {
  constructor({
    name,
    parent,
    inheritData = false,
  }: {
    name: string;
    parent: AdvancementBase<IAdvancement | IRootAdvancement>;
    inheritData?: boolean;
  }) {
    super({
      name,
      namespace: Advancement.getNamespace(parent),
      defaultData: { ...defaultAdvancement, parent: parent.ref },
    });

    if (inheritData) this.copyDisplayFrom(parent);

    this.title = name;
  }
}
export class AdvancementTab extends AdvancementBase<IRootAdvancement> {
  constructor({ name, namespace }: { name: string; namespace: Namespace }) {
    const advancementNamespace = new NestedNamespace(name, namespace);
    super({
      name,
      namespace: advancementNamespace,
      defaultData: {
        ...defaultAdvancement,
        display: { ...defaultAdvancement.display, background: "" },
      },
    });

    this.title = name;
  }

  public get background() {
    return this.constructedData.display.background;
  }

  public set background(value: unknown) {
    this.constructedData.display.background = value;
  }
}

