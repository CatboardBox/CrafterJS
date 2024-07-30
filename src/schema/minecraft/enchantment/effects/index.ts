export * from "./attributeEffects";
export * from "./entityEffects";
export * from "./valueEffects";
export * from "./miscEffects";
export * from "./soundEffects";

import { IValueEffectComponentAll } from "./valueEffects";
import { IEntityEffectComponentAll } from "./entityEffects";
import { IAttributeEffectComponentAll } from "./attributeEffects";
import { IMiscEffectComponentAll } from "./miscEffects";
import { ISoundEffectComponentAll } from "./soundEffects";

type IEffectComponentAll = IValueEffectComponentAll &
  IEntityEffectComponentAll &
  IAttributeEffectComponentAll &
  IMiscEffectComponentAll &
  ISoundEffectComponentAll;

export type IEffectComponent = Partial<IEffectComponentAll>;
