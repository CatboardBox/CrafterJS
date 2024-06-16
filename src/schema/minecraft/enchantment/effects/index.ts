export { EffectComponent } from "./effectComponent";
export * from "./attributeEffects";
export * from "./entityEffects";
export * from "./valueEffects";
export * from "./locationChangedEffect";
export * from "./entity";
export * from "./miscEffects";
export * from "./damageImmunity";
export * from "./soundEffects";

import { IValueEffectComponent } from "./valueEffects";
import { IEntityEffectComponent } from "./entityEffects";
import { ILocationBasedEffectComponent } from "./locationChangedEffect";
import { IAttributeEffectComponent } from "./attributeEffects";
import { IDamageImmunityEffectComponent } from "./damageImmunity";
import { IMiscEffectComponent } from "./miscEffects";
import { ISoundEffectComponent } from "./soundEffects";

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type IEffectComponentAll = 
  Required<IValueEffectComponent> &
  Required<IEntityEffectComponent> &
  Required<ILocationBasedEffectComponent> &
  Required<IAttributeEffectComponent> &
  Required<IDamageImmunityEffectComponent> &
  Required<IMiscEffectComponent> &
  Required<ISoundEffectComponent>;

export type IEffectComponent = Partial<IEffectComponentAll>;
