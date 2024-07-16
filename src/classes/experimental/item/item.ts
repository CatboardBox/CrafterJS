import { IItem, ResLocRef, ResourceType } from "../../../schema";
import {
  ComponentType,
  IItemComponents,
} from "../../../schema/minecraft/dataComponent";
import { ArtificialContentGenerator } from "../artificialContent";
import { Namespace } from "../../namespace";

export class CustomItem extends ArtificialContentGenerator<
  ResLocRef[ResourceType.Item],
  IItem
> {
  constructor(params: {
    name: string;
    id?: string;
    namespace: Namespace;
    item: ResLocRef[ResourceType.Item];
  }) {
    const { item } = params;
    super({
      type: [ResourceType.Item],
      ...params,
      data: {
        id: item,
        components: {},
      },
    });
  }

  public get components(): IItemComponents {
    if (!this.constructedData.components) {
      this.constructedData.components = {};
    }
    return this.constructedData.components;
  }

  public get ref(): ResLocRef[ResourceType.Item] {
    console.warn(
      'Item is not "Real", unintended behavior may occur if ref is used'
    );
    return super.ref;
  }

  public setCustomModelData(data: number) {
    this.components[ComponentType.CustomModelData] = data;
    return this;
  }

  public setFoodData(nutrition: number, saturation: number) {
    this.components[ComponentType.Food] = {
      nutrition,
      saturation,
    };
    return this;
  }

  public setName(name: string) {
    this.components[ComponentType.ItemName] = `"${name}"`;
    return this;
  }

  public get Item(): IItem {
    return this.constructedData;
  }
}
