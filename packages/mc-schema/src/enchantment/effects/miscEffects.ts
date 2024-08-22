import { IPredicate } from "../../predicate";
import { EffectComponent } from "../effectComponent";
import { IAttributeEffects } from "./attributeEffects";
import { IEntityEffects } from "./entityEffects";

type IEmptyObject = Record<string, never>;

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

export type IMiscEffectComponentAll = {
  [EffectComponent.DamageImmunity]: {
    effect: IEmptyObject;
    requirements?: IPredicate;
  }[];
} & {
  [EffectComponent.PreventEquipmentDrop]: IEmptyObject;
  [EffectComponent.PreventArmorChange]: IEmptyObject;
  [EffectComponent.LocationChanged]: (ILocationBasedEffectComponentStandardContent & {
    requirements?: IPredicate;
  })[];
};
export type IMiscEffectComponent = Partial<IMiscEffectComponentAll>;
