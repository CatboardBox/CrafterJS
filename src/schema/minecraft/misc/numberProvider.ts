import { PlayerRef, UUIDRef } from "../generic";
import { IScoreboardRef } from "../scoreboard";
import { ILevelBasedValue } from "./levelBasedValue";

export enum NumberProviderType {
  Constant = "minecraft:constant",
  Uniform = "minecraft:uniform",
  Binomial = "minecraft:binomial",
  Score = "minecraft:score",
  Storage = "minecraft:storage",
  EnchantmentLevel = "minecraft:enchantment_level",
}

export interface IConstantNumberProvider {
  readonly type: NumberProviderType.Constant;
  readonly value: number;
}

export interface IUniformNumberProvider {
  readonly type: NumberProviderType.Uniform;
  readonly min: INumberProvider;
  readonly max: INumberProvider;
}

export interface IBinomialNumberProvider {
  readonly type: NumberProviderType.Binomial;
  readonly n: INumberProvider;
  readonly p: INumberProvider;
}

export enum TargetType {
  Fixed = "fixed",
  Context = "context",
}

export interface IScoreNumberProvider {
  readonly type: NumberProviderType.Score;
  readonly target:
    | {
        type: TargetType.Fixed;
        name: UUIDRef | PlayerRef;
      }
    | {
        type: TargetType.Context;
        target: "this" | "killer" | "direct_killer" | "killer_player";
      };
  readonly score: IScoreboardRef;
  readonly scale?: number;
}

export interface IStorageNumberProvider {
  readonly type: NumberProviderType.Storage;
  readonly storage: string; //todo
  readonly path: string; //todo
}

export interface IEnchantmentLevelNumberProvider {
  readonly type: NumberProviderType.EnchantmentLevel;
  readonly amount: ILevelBasedValue;
}

export type INumberProviderShortcuts =
  | number
  | {
      min: number;
      max: number;
    };

export type INumberProvider =
  | INumberProviderShortcuts
  | IConstantNumberProvider
  | IUniformNumberProvider
  | IBinomialNumberProvider
  | IScoreNumberProvider
  | IStorageNumberProvider
  | IEnchantmentLevelNumberProvider;
