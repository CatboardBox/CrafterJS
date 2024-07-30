import { EffectComponent } from "../effectComponent";
import { ILevelBasedValue } from "../../misc";
import { IAttributeRef, ResLocRef, ResourceType } from "../../ref";

export enum AttributesOperation {
  Add = "add_value",
  AddMultipliedBase = "add_multiplied_base",
  AddMultipliedTotal = "add_multiplied_total",
}
export interface IAttributeEffects {
  attribute: IAttributeRef
  amount: ILevelBasedValue;
  operation: AttributesOperation;
  id: ResLocRef[ResourceType.Enchantment]; // seems like a ref but '.' instead of '/' --- // todo
}

export type IAttributeEffectComponentAll = {
  [EffectComponent.Attributes]: IAttributeEffects[];
}

export type IAttributeEffectComponent = Partial<IAttributeEffectComponentAll>;
