import { EffectComponent } from "./effectComponent";
import { IEffectComponentMappingType } from "./misc";

type IDamageImmunityEffects = {
  effect: Record<string, never>;
};

type ILocationBasedEffectComponentTypes = EffectComponent.DamageImmunity;

type IDamageImmunityComponentAll = IEffectComponentMappingType<
  ILocationBasedEffectComponentTypes,
  IDamageImmunityEffects
>;

export type IDamageImmunityEffectComponent =
  Partial<IDamageImmunityComponentAll>;
