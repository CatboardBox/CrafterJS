import { ResLocRef, ResourceType } from "../../ref";
import { EffectComponent } from "../effectComponent";

export interface ICrossbowChargeSounds {
  start?: ResLocRef[ResourceType.SoundEvent];
  mid?: ResLocRef[ResourceType.SoundEvent];
  end?: ResLocRef[ResourceType.SoundEvent];
}
export type ITridentSounds = ResLocRef[ResourceType.SoundEvent];

export type ISoundEffectComponentAll = {
  [EffectComponent.CrossbowChargeSounds]: ICrossbowChargeSounds[];
  [EffectComponent.TridentSound]: ITridentSounds[];
};

export type ISoundEffectComponent = Partial<ISoundEffectComponentAll>;
