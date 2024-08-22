// import { SubLootContext } from "../lootContext/common";
// import { PredicateCondition } from "./predicateConditions";

// // Define MappedPredicateConditions with required sub-loot contexts
// export type PredicateRequirements = {
//   // [PredicateCondition] : [Required SubLootContexts]
//   [PredicateCondition.AllOf]: [];
//   [PredicateCondition.AnyOf]: [];
//   [PredicateCondition.Inverted]: [];
//   [PredicateCondition.Reference]: [];
//   [PredicateCondition.EntityProperties]: [];
//   [PredicateCondition.RandomChance]: [];
//   [PredicateCondition.TimeCheck]: [];
//   [PredicateCondition.ValueCheck]: [];
//   [PredicateCondition.WeatherCheck]: [];
//   [PredicateCondition.BlockStateProperty]: [SubLootContext.BlockState];
//   [PredicateCondition.DamageSourceProperties]: [SubLootContext.Origin, SubLootContext.DamageSource];
//   [PredicateCondition.EnchantmentActiveCheck]: [SubLootContext.EnchantmentActiveStatus];
//   [PredicateCondition.EntityScores]: [SubLootContext.ThisEntity];
//   [PredicateCondition.KilledByPlayer]: [SubLootContext.AttackingPlayer];
//   [PredicateCondition.LocationCheck]: [SubLootContext.Origin];
//   [PredicateCondition.MatchTool]: [SubLootContext.Tool];
//   [PredicateCondition.RandomChanceWithEnchantedBonus]: [SubLootContext.AttackerEntity];
//   [PredicateCondition.SurvivesExplosion]: [SubLootContext.ExplosionRadius];
//   [PredicateCondition.TableBonus]: [SubLootContext.Tool];
// };

// // too messy to work with
// // // Define AreAllSubtypesPresent to check if all subtypes in Required are present in Available
// // type AreAllSubtypesPresent<Required extends SubLootContext[], Available extends SubLootContext[]> =
// //   Required extends [infer First, ...infer Rest]
// //     ? First extends Available[number]
// //       ? AreAllSubtypesPresent<Rest extends SubLootContext[] ? Rest : [], Available>
// //       : false
// //     : true;

// // // Define FilteredPredicateConditions to filter based on the presence of sub-loot contexts
// // export type FilteredPredicateConditions<T extends SubLootContext[]> = {
// //   [K in keyof PredicateRequirements]: AreAllSubtypesPresent<PredicateRequirements[K], T> extends true ? K : never;
// // }[keyof PredicateRequirements];

// // // Define IFilteredPredicate to use the filtered conditions
// // export type IFilteredPredicate<T extends SubLootContext[]> = {
// //   condition: FilteredPredicateConditions<T>;
// // }

// // //test cases
// // //pass

// // const testCase0 : IFilteredPredicate<[]> = {
// //   condition: PredicateCondition.all_of
// // }

// // const testCase1 : IFilteredPredicate<[SubLootContext.Origin]> = {
// //   condition: PredicateCondition.location_check
// // }

// // const testCase2 : IFilteredPredicate<[SubLootContext.Origin, SubLootContext.DamageSource]> = {
// //   condition: PredicateCondition.damage_source_properties
// // }

// // const testCase3 : IFilteredPredicate<[SubLootContext.DamageSource,SubLootContext.Origin,SubLootContext.AttackerEntity]> = {
// //   condition: PredicateCondition.location_check
// // }

// // //fail

// // const testCase4 : IFilteredPredicate<[SubLootContext.Origin,SubLootContext.ExplosionRadius]> = {
// //   condition: PredicateCondition.damage_source_properties
// // }

