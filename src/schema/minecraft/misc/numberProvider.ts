import { PlayerRef, UUIDRef } from "../generic";
import { IScoreboardRef } from "../scoreboard";
import { ILevelBasedValue } from "./levelBasedValue";

enum NumberProviderType {
  Constant = "constant",
  Uniform = "uniform",
  Binomial = "binomial",
  Score = "score",
  Storage = "storage",
  EnchantmentLevel = "enchantment_level",
}

type ConstantNumberProvider = number;

interface UniformNumberProvider {
  readonly min: INumberProvider;
  readonly max: INumberProvider;
}

interface BinomialNumberProvider {
  readonly n: INumberProvider;
  readonly p: INumberProvider;
}

export enum TargetType {
  Fixed = "fixed",
  Context = "context",
}

interface ScoreNumberProvider {
  target:
    | {
        type: TargetType.Fixed;
        name: UUIDRef | PlayerRef;
      }
    | {
        type: TargetType.Context;
        target: "this" | "killer" | "direct_killer" | "killer_player";
      };
  score: IScoreboardRef;
  scale?: number;
}

interface StorageNumberProvider {
  storage: string; //todo
  path: string; //todo
}

interface EnchantmentLevelNumberProvider {
  readonly amount: ILevelBasedValue;
}

type StructuredNumberProvider<T extends NumberProviderType, U> = {
  readonly type: T;
} & U;

export type INumberProviderShortcuts =
  | ConstantNumberProvider
  | UniformNumberProvider;

export type INumberProvider =
  | INumberProviderShortcuts
  | StructuredNumberProvider<
      NumberProviderType.Constant,
      { value: ConstantNumberProvider } // special case for constant
    >
  | StructuredNumberProvider<NumberProviderType.Uniform, UniformNumberProvider>
  | StructuredNumberProvider<
      NumberProviderType.Binomial,
      BinomialNumberProvider
    >
  | StructuredNumberProvider<NumberProviderType.Score, ScoreNumberProvider>
  | StructuredNumberProvider<NumberProviderType.Storage, StorageNumberProvider>
  | StructuredNumberProvider<
      NumberProviderType.EnchantmentLevel,
      EnchantmentLevelNumberProvider
    >;
