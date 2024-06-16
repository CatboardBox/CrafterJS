import { IAttributeEffects } from "./attributeEffects";
import { EffectComponent } from "./effectComponent";
import { IEntityEffects } from "./entityEffects";
import { IEffectComponentMappingType } from "./misc";

export enum ILocationBasedEffectType {
  Attribute = "minecraft:attribute",
}

interface ILocationBasedEffectComponentStandardContent {
  /**
   * Determines how to modify the value.
   */
  effect: ILocationBasedEffects;
}
type ILocationBasedEffects =
  | ({
      type: ILocationBasedEffectType.Attribute;
    } & IAttributeEffects)
  | IEntityEffects;

type ILocationBasedEffectComponentTypes = EffectComponent.LocationChanged;

type ILocationBasedComponentAll = IEffectComponentMappingType<
  ILocationBasedEffectComponentTypes,
  ILocationBasedEffectComponentStandardContent
>;

export type ILocationBasedEffectComponent = Partial<ILocationBasedComponentAll>;
