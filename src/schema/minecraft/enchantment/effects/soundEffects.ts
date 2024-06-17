import { IRef, ResourceType } from "../../ref";
import { EffectComponent } from "../effectComponent";
import { IEffectComponentMappingType } from "../misc";

export interface ICrossbowChargeSounds {
  start?: IRef[ResourceType.SoundEvents];
  mid?: IRef[ResourceType.SoundEvents];
  end?: IRef[ResourceType.SoundEvents];
}

type ISoundEffectComponentAll = IEffectComponentMappingType<
  EffectComponent.CrossbowChargeSounds,
  ICrossbowChargeSounds
> &
  IEffectComponentMappingType<EffectComponent.TridentSound, IRef[ResourceType.SoundEvents]>;

export type ISoundEffectComponent = Partial<ISoundEffectComponentAll>;
