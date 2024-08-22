import {
  IBlockStatePropertiesPredicate,
} from "../generic";
import { INbt } from "../generic/nbt";
import { ResLocRef, TagRef, ResourceType, TagType } from "../ref";
import { INumberPredicate } from "./misc";

export interface ILocationPredicate {
  biomes?:
    | ResLocRef[ResourceType.Biome]
    | ResLocRef[ResourceType.Biome][]
    | TagRef[TagType.Biome];

  /**
   * The block at the location. Test fails if the location is unloaded.
   */
  block?: {
    blocks?:
      | ResLocRef[ResourceType.Block]
      | ResLocRef[ResourceType.Block][]
      | TagRef[TagType.Block];
    nbt?: INbt;
    state?: IBlockStatePropertiesPredicate;
  };
  dimension?: ResLocRef[ResourceType.Dimension];
  fluid?: {
    fluids?:
      | ResLocRef[ResourceType.Fluid]
      | ResLocRef[ResourceType.Fluid][]
      | TagRef[TagType.Fluid];
    state?: IBlockStatePropertiesPredicate;
  };
  light?: {
    light?: INumberPredicate;
  };
  /**
   *  Tests for the absolute position of this location
   */
  position?: {
    x?: INumberPredicate;
    y?: INumberPredicate;
    z?: INumberPredicate;
  };

  /**
   * When true, success if the block is closely above a campfire or soul campfire. When false, success if not.
   */
  smokey?: boolean;
  can_see_sky?: boolean;
  structures?:
    | ResLocRef[ResourceType.Structure]
    | ResLocRef[ResourceType.Structure][]
    | TagRef[TagType.Structure];
}
