import { ISoundEventRef } from "../../ref";
import { EffectComponent } from "../effectComponent";
import { IEffectComponentMappingType } from "../misc";

export interface ICrossbowChargeSounds {
  start?: ISoundEventRef;
  mid?: ISoundEventRef;
  end?: ISoundEventRef;
}

type ISoundEffectComponentAll = IEffectComponentMappingType<
  EffectComponent.CrossbowChargeSounds,
  ICrossbowChargeSounds
> &
  IEffectComponentMappingType<EffectComponent.TridentSound, ISoundEventRef>;

export type ISoundEffectComponent = Partial<ISoundEffectComponentAll>;
