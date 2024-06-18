import { ResLocRef, ResourceType } from "../../ref";
import { EffectComponent } from "../effectComponent";
import { IEffectComponentMappingType } from "../misc";

export interface ICrossbowChargeSounds {
  start?: ResLocRef[ResourceType.SoundEvent];
  mid?: ResLocRef[ResourceType.SoundEvent];
  end?: ResLocRef[ResourceType.SoundEvent];
}

type ISoundEffectComponentAll = IEffectComponentMappingType<
  EffectComponent.CrossbowChargeSounds,
  ICrossbowChargeSounds
> &
  IEffectComponentMappingType<EffectComponent.TridentSound, ResLocRef[ResourceType.SoundEvent]>;

export type ISoundEffectComponent = Partial<ISoundEffectComponentAll>;
