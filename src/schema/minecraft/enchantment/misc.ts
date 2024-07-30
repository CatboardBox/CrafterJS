import { IBlockState, Seed } from "../generic";
import { INumberProvider } from "../misc";

// type SubsetOfEnum<T, U extends T = T> = U;
// // Define a type for IEffectComponentMappingType to handle EffectComponent enum keys and types
// export type IEffectComponentMappingType<
//   K extends SubsetOfEnum<EffectComponent>,
//   T
// > = {
//   [P in K]: K extends keyof EffectLootContextMapping
//     ? EffectLootContextMapping[K] extends keyof LootContextSubtypeMapping
//       ? (T & {
//           requirements?: IPredicate<
//             LootContextSubtypeMapping[EffectLootContextMapping[K]]
//           >;
//         })[]
//       : T[]
//     : T[];
// };


// type testType =
//   | {
//       branch: "test";
//       test: string;
//     }
//   | {
//       branch: "test2";
//       test2: string;
//     };
// const test: testType & { branch: "test" } = {
//   branch: "test",
//   test: "test",
// };

export enum BlockStateProviderType {
  /**
   * Specifies a block state directly.
   */
  SimpleStateProvider = "simple_state_provider",
  /**
   * Rotates axially-rotated block, such as logs, chain.
   */
  RotatedBlockProvider = "rotated_block_provider",
  /**
   * Chooses a block state from a weighted list.
   */
  WeightedStateProvider = "weighted_state_provider",
  /**
   * Assigns a random value to an integer block property.
   */
  RandomizedIntStateProvider = "randomized_int_state_provider",
  /**
   * Randomly choose a block state according to a noise value.
   */
  NoiseProvider = "noise_provider",
  /**
   * Randomly choose a block state according to two noise values.
   */
  DualNoiseProvider = "dual_noise_provider",
  /**
   * Use different block state when a noise value above or below the threshold.
   */
  NoiseThresholdProvider = "noise_threshold_provider",
}

type SimpleStateProvider = {
  type: BlockStateProviderType.SimpleStateProvider;
  state: IBlockState;
};

type RotatedBlockProvider = {
  type: BlockStateProviderType.RotatedBlockProvider;
  /**
   * The block properties are ignored.
   */
  state: IBlockState;
};

type WeightedStateProvider = {
  type: BlockStateProviderType.WeightedStateProvider;
  entries: {
    data: IBlockState;
    weight: number;
  }[];
};

type RandomizedIntStateProvider = {
  type: BlockStateProviderType.RandomizedIntStateProvider;
  property: string;
  values: INumberProvider;
  source: IBlockStateProvider;
};

type Noise = unknown; //todo

type NoiseProvider = {
  type: BlockStateProviderType.NoiseProvider;
  seed: Seed;
  noise: Noise;
  scale: number;
  states: IBlockState[];
};

type DualNoiseProvider = {
  type: BlockStateProviderType.DualNoiseProvider;
  seed: number;
  noise: Noise;
  scale: number;
  slow_noise: Noise;
  slow_scale: number;
  /**
   *  Min number. Must be an integer equal to or greater than 1.
   *  Max number. Must be an integer equal to or less than 64, and must be greater than the min number.
   */
  variety:
    | number
    | [number, number]
    | {
        min_inclusive: number;
        max_inclusive: number;
      };
  states: IBlockState[];
};

type NoiseThresholdProvider = {
  type: BlockStateProviderType.NoiseThresholdProvider;
  seed: Seed;
  noise: Noise;
  scale: number;
  /**
   * Value between -1.0 and 1.0 (inclusive). The threshold of the noise value.
   * If the noise value is lower than this value, the block states in `low_states` will be selected.
   */
  threshold: number;
  /**
   * Value between -1.0 and 1.0 (inclusive).
   * If the noise value is higher than the threshold, the block states in `high_states` will be selected with a probability of high_chance.
   */
  high_chance: number;
  default_state: IBlockState;
  low_states: IBlockState[];
  high_states: IBlockState[];
};

export type IBlockStateProvider =
  | SimpleStateProvider
  | RotatedBlockProvider
  | WeightedStateProvider
  | RandomizedIntStateProvider
  | NoiseProvider
  | DualNoiseProvider
  | NoiseThresholdProvider;
