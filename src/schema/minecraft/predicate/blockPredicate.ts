import {
  IBlockState,
  IBlockStatePropertyKey,
  IBlockStatePropertyValueOfKey,
  FullVector3,
} from "../generic";
import { ResLocRef, ResourceType, TagRef, TagRefNoHash, TagType } from "../ref";

export enum BlockPredicateType {
  /**
   * always true
   */
  True = "true",
  AllOf = "all_of",
  AnyOf = "any_of",
  HasSturdySurface = "has_sturdy_surface",
  /**
   * whether the Y level is in the world
   */
  InsideWorldBounds = "inside_world_bounds",
  MatchingBlockTag = "matching_block_tag",
  MatchingBlocks = "matching_blocks",
  MatchingFluids = "matching_fluids",
  /**
   * invert the predicate
   */
  Not = "not",
  Replaceable = "replaceable",
  /**
   * material is solid
   */
  Solid = "solid",
  /**
   * Checks whether this block state can survive in the specified position.
   */
  WouldSurvive = "would_survive",
}

export type IBlockPredicate =
  | {
      type: BlockPredicateType.True;
    }
  | {
      type: BlockPredicateType.AllOf | BlockPredicateType.AnyOf;
      /**
       * list of block predicates
       */
      predicates: IBlockPredicate[];
    }
  | {
      type:
        | BlockPredicateType.InsideWorldBounds
        | BlockPredicateType.Solid
        | BlockPredicateType.Replaceable;
      /**
       * Value between -16 and 16 (inclusive)
       * Default: [0, 0, 0]
       */
      offset?: FullVector3;
    }
  | {
      type: BlockPredicateType.HasSturdySurface;
      /**
       * Value between -16 and 16 (inclusive)
       * Default: [0, 0, 0]
       */
      offset?: FullVector3;
      direction: IBlockStatePropertyValueOfKey["direction" & //todo
        IBlockStatePropertyKey];
    }
  | {
      type: BlockPredicateType.MatchingBlockTag;
      /**
       * Value between -16 and 16 (inclusive)
       * Default: [0, 0, 0]
       */
      offset?: FullVector3;
      tag: TagRefNoHash[TagType.Block];
    }
  | {
      type: BlockPredicateType.MatchingBlocks;
      /**
       * Value between -16 and 16 (inclusive)
       * Default: [0, 0, 0]
       */
      offset?: FullVector3;
      blocks:
        | ResLocRef[ResourceType.Block]
        | ResLocRef[ResourceType.Block][]
        | TagRef[TagType.Block];
    }
  | {
      type: BlockPredicateType.MatchingFluids;
      /**
       * Value between -16 and 16 (inclusive)
       * Default: [0, 0, 0]
       */
      offset?: FullVector3;
      fluids:
        | ResLocRef[ResourceType.Fluid]
        | ResLocRef[ResourceType.Fluid][]
        | TagRef[TagType.Fluid];
    }
  | {
      type: BlockPredicateType.Not;
      predicate: IBlockPredicate;
    }
  | {
      type: BlockPredicateType.WouldSurvive;
      state: IBlockState;
    };
