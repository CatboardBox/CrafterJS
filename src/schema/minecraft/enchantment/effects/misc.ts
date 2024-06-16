import { LootContextSubtypeMapping } from "../../lootContext/predicate";
import { IPredicate } from "../../predicate";
import { EffectComponent, EffectLootContextMapping } from "./effectComponent";

type SubsetOfEnum<T, U extends T = T> = U;
// Define a type for IEffectComponentMappingType to handle EffectComponent enum keys and types
export type IEffectComponentMappingType<K extends SubsetOfEnum<EffectComponent>, T> = {
  [P in K]: K extends keyof EffectLootContextMapping
    ? EffectLootContextMapping[K] extends keyof LootContextSubtypeMapping
      ? (T & {
          requirements?: IPredicate<
            LootContextSubtypeMapping[EffectLootContextMapping[K]]
          >;
        })[]
      : T[]
    : T[];
};

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
