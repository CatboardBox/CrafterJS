import { EffectComponent } from "../effectComponent";
import { IEffectComponentMappingType } from "../misc";
import { IAttributeEffects } from "./attributeEffects";
import { IEntityEffects } from "./entityEffects";

type IEmptyObject = {
  effect: Record<string, never>;
};

// Locational Effects

interface ILocationBasedEffectComponentStandardContent {
  /**
   * Determines how to modify the value.
   */
  effect:
    | IEntityEffects
    // might might not be able to hardcode if a 2nd type is added
    | ({ type: "minecraft:attribute" } & IAttributeEffects);
}

type IMiscComponentAll =
  // Damage Immunity Effects
  IEffectComponentMappingType<
    EffectComponent.DamageImmunity,
    { effect: IEmptyObject }
  > &
    // Misc Effects
    IEffectComponentMappingType<
      EffectComponent.PreventEquipmentDrop | EffectComponent.PreventArmorChange,
      IEmptyObject
    > &
    IEffectComponentMappingType<
      EffectComponent.LocationChanged,
      ILocationBasedEffectComponentStandardContent
    >;

export type IMiscEffectComponent = Partial<IMiscComponentAll>;
