export * from "./attributeEffects";
export * from "./entityEffects";
export * from "./valueEffects";
export * from "./miscEffects";
export * from "./soundEffects";

import { IValueEffectComponent } from "./valueEffects";
import { IEntityEffectComponent } from "./entityEffects";
import { IAttributeEffectComponent } from "./attributeEffects";
import { IMiscEffectComponent } from "./miscEffects";
import { ISoundEffectComponent } from "./soundEffects";

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type IEffectComponentAll = 
  Required<IValueEffectComponent> &
  Required<IEntityEffectComponent> &
  Required<IAttributeEffectComponent> &
  Required<IMiscEffectComponent> &
  Required<ISoundEffectComponent>;

export type IEffectComponent = Partial<IEffectComponentAll>;
