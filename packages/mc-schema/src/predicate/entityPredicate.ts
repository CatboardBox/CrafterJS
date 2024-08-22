import { ContainerSlot, TeamRef } from "../generic";
import { INbt } from "../generic/nbt";
import { ResLocRef, TagRef, ResourceType, TagType } from "../ref";
import { IEffectPredicate } from "./effectPredicate";
import { IItemPredicate } from "./itemPredicate";
import { ILocationPredicate } from "./locationPredicate";
import { INumberPredicate } from "./misc";
import { IPlayerPredicate } from "./playerPredicate";

export interface IEntityPredicate {
  type?: ResLocRef[ResourceType.EntityType];
  distance?: IDistancePredicate;
  effects?: Record<ResLocRef[ResourceType.MobEffect], IEffectPredicate>;
  equipment?: Partial<Record<ContainerSlot, IItemPredicate>>;
  flags?: {
    is_baby?: boolean;
    is_on_fire?: boolean;
    is_sneaking?: boolean;
    is_sprinting?: boolean;
    is_swimming?: boolean;
    is_on_ground?: boolean;
    is_flying?: boolean;
  };
  /**
   * Test properties of the entity's location
   */
  location?: ILocationPredicate;
  nbt?: INbt;
  passenger?: IEntityPredicate;
  slots?: Partial<Record<ContainerSlot, IItemPredicate>>;
  /**
   *  Test properties of the block the entity is standing on
   */
  stepping_on?: ILocationPredicate;
  /**
   * Test properties of the block 0.5 blocks below the block the entity is standing on
   */
  movement_affected_by?: ILocationPredicate;
  team?: TeamRef;
  targeted_entity?: IEntityPredicate;
  vehicle?: IEntityPredicate;
  movement?: {
    x?: INumberPredicate;
    y?: INumberPredicate;
    z?: INumberPredicate;
    horizontal_speed?: INumberPredicate;
    vertical_speed?: INumberPredicate;
    fall_distance?: INumberPredicate;
  };
  periodic_tick?: number;
  type_specific?:
    | IPlayerPredicate
    | {
        type: TypeSpecificEntityPredicate.FishingHook;
        in_open_water?: boolean;
      }
    | {
        type: TypeSpecificEntityPredicate.Lightning;
        blocks_set_on_fire?: INumberPredicate;
        entity_struck?: IEntityPredicate;
      }
    | {
        type: TypeSpecificEntityPredicate.Raider;
        is_captain?: boolean;
        has_raid?: boolean;
      }
    | {
        type: TypeSpecificEntityPredicate.Slime;
        size?: INumberPredicate;
      }
      
  // Types with variants
    | {
        type: TypeSpecificEntityPredicate.Cat;
        variant:
          | ResLocRef[ResourceType.CatVariant]
          | ResLocRef[ResourceType.CatVariant][]
          | TagRef[TagType.CatVariant];
      }
    | {
        type: TypeSpecificEntityPredicate.Frog;
        variant: unknown; //todo
        // | IRef[ResourceType.FrogVariant]
        // | IRef[ResourceType.FrogVariant][]
        // | ITagRef[TagType.FrogVariant];
      }
    | {
        type: TypeSpecificEntityPredicate.Wolf;
        variant?: unknown; //todo : wolf variant tags not found in the wiki
      };
}
export enum TypeSpecificEntityPredicate {
  Player = "minecraft:player",
  FishingHook = "minecraft:fishing_hook",
  Lightning = "minecraft:lightning",
  Raider = "minecraft:raider",
  Slime = "minecraft:slime",
  Cat = "minecraft:cat",
  Frog = "minecraft:frog",
  Wolf = "minecraft:wolf",
}

export interface IDistancePredicate {
  /**
   * Test the distance between the two points in 3D space.
   */
  absolute?: INumberPredicate;
  /**
   * Test the distance between the two points, ignoring the Y value.
   */
  horizontal?: INumberPredicate;
  /**
   * Test the absolute difference between the X-coordinates of the two points.
   */
  x?: INumberPredicate;
  /**
   * Test the absolute difference between the Y-coordinates of the two points.
   */
  y?: INumberPredicate;
  /**
   * Test the absolute difference between the Z-coordinates of the two points.
   */
  z?: INumberPredicate;
}
