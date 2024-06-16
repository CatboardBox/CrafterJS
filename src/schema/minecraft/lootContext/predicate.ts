import { SubLootContext } from "./common";

//https://minecraft.wiki/w/Loot_context
export enum LootContext {
  Command = "command",
  Selector = "selector",
  AdvancementEntity = "advancement_entity",
  AdvancementLocation = "advancement_location",
  BlockUse = "block_use",
  EnchantedDamage = "enchanted_damage",
  EnchantedItem = "enchanted_item",
  EnchantedLocation = "enchanted_location",
  EnchantedEntity = "enchanted_entity",
  HitBlock = "hit_block",
}

type DefaultLootContextSubtypeMapping = {
  [LootContext.Command]: [[SubLootContext.Origin]];
  [LootContext.Selector]: [[SubLootContext.Origin, SubLootContext.ThisEntity]];
  [LootContext.AdvancementEntity]: [
    SubLootContext.ThisEntity,
    SubLootContext.Origin
  ];
  [LootContext.AdvancementLocation]: [
    SubLootContext.ThisEntity,
    SubLootContext.Origin,
    SubLootContext.Tool,
    SubLootContext.BlockState
  ];
  [LootContext.BlockUse]: [
    SubLootContext.ThisEntity,
    SubLootContext.Origin,
    SubLootContext.BlockState
  ];
  [LootContext.EnchantedDamage]: [
    SubLootContext.ThisEntity,
    SubLootContext.EnchantmentLevel,
    SubLootContext.Origin,
    SubLootContext.DamageSource
  ];
  [LootContext.EnchantedItem]: [
    SubLootContext.Tool,
    SubLootContext.EnchantmentLevel
  ];
  [LootContext.EnchantedLocation]: [
    SubLootContext.ThisEntity,
    SubLootContext.Origin,
    SubLootContext.EnchantmentLevel,
    SubLootContext.EnchantmentActiveStatus
  ];
  [LootContext.EnchantedEntity]: [
    SubLootContext.ThisEntity,
    SubLootContext.EnchantmentLevel,
    SubLootContext.Origin
  ];
  [LootContext.HitBlock]: [
    SubLootContext.ThisEntity,
    SubLootContext.EnchantmentLevel,
    SubLootContext.Origin,
    SubLootContext.BlockState
  ];
};

type ExtraLootContextSubtypeMapping = {
  [LootContext.Command]: [SubLootContext.ThisEntity];
  [LootContext.EnchantedDamage]: [
    SubLootContext.AttackerEntity,
    SubLootContext.DirectAttackerEntity,
    SubLootContext.AttackingPlayer
  ];
};
export type LootContextSubtypeMapping = DefaultLootContextSubtypeMapping & ExtraLootContextSubtypeMapping;