import { IItemComponents } from "./dataComponent";
import { ResLocRef, ResourceType } from "./ref";

export interface IItem {
  id: ResLocRef[ResourceType.Item];
  components?: IItemComponents;
}

export type IItemStack = IItem & { count?: number };
