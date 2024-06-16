import { EffectComponent } from "./effectComponent";
import { IEffectComponentMappingType } from "./misc";
type IMiscEffectComponentTypes =
  | EffectComponent.PreventEquipmentDrop
  | EffectComponent.PreventArmorChange;

type IMiscComponentAll = IEffectComponentMappingType<
  IMiscEffectComponentTypes,
  Record<string, never>
>;

export type IMiscEffectComponent = Partial<IMiscComponentAll>;
