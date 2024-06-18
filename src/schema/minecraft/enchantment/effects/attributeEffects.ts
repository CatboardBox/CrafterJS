import { EffectComponent } from "../effectComponent";
import { ILevelBasedValue } from "../../misc";
import { IEffectComponentMappingType } from "../misc";
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

type IAttributeEffectComponentTypes = EffectComponent.Attributes;

type IAttributeComponentAll = IEffectComponentMappingType<
  IAttributeEffectComponentTypes,
  IAttributeEffects
>;

export type IAttributeEffectComponent = Partial<IAttributeComponentAll>;
