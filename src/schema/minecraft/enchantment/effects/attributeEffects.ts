import { EffectComponent } from "./effectComponent";
import { ILevelBasedValue } from "../../misc";
import { IEffectComponentMappingType } from "./misc";

export enum AttributesOperation {
  Add = "add_value",
  AddMultipliedBase = "add_multiplied_base ",
  AddMultipliedTotal = "add_multiplied_total",
}
export interface IAttributeEffects {
  attribute: unknown; //todo
  amount: ILevelBasedValue;
  operation: AttributesOperation;
  id: string; //todo
}

type IAttributeEffectComponentTypes = EffectComponent.Attributes;

type IAttributeComponentAll = IEffectComponentMappingType<
  IAttributeEffectComponentTypes,
  IAttributeEffects
>;

export type IAttributeEffectComponent = Partial<IAttributeComponentAll>;
