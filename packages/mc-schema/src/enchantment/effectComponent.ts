import { LootContext } from "../lootContext/predicate";

export enum EffectComponent {
  //Value Effects
  //enchanted damage subtype
  // this entity: The attacked entity
  // attacker entity: the attacking entity
  // direct_attacker entity: the projectile entity
  // Enchantment level
  // Origin: The position of the attacked entity
  // Damage source
  /**
   * Effectiveness of the armor on the target of the attack. 0 completely ineffective; 1 completely effective
   */
  ArmorEffectiveness = "minecraft:armor_effectiveness",
  /**
   * Amount of damage dealt by an attack
   */
  Damage = "minecraft:damage",
  /**
   * Amount of damage protection
   */
  DamageProtection = "minecraft:damage_protection",
  /**
   * Amount of damage added to the smash attack of a mace, per block fallen
   */
  SmashDamagePerFallenBlock = "minecraft:smash_damage_per_fallen_block",
  /**
   * Knockback caused by the attack
   */
  Knockback = "minecraft:knockback",
  /**
   * Chance of equipment dropping from the killed entity. Value between 0 and 1
   */
  EquipmentDrops = "minecraft:equipment_drops",

  //enchanted item subtype
  // Tool: The enchanted item
  // Enchantment level
  /**
   * Amount of ammunition used when firing a bow or crossbow
   */
  AmmoUse = "minecraft:ammo_use",

  /**
   * Count of pierced entities by fired projectiles
   */
  ProjectilePiercing = "minecraft:projectile_piercing",

  /**
   * Amount of experience awarded for breaking a block
   */
  BlockExperience = "minecraft:block_experience",

  /**
   * Damage to repair per XP collected
   */
  RepairWithXp = "minecraft:repair_with_xp",

  /**
   * Amount of durability to lose when damaged
   */
  ItemDamage = "minecraft:item_damage",

  //enchanted entity subtype
  // this entity: The projectile
  // Enchantment level
  // Origin The position of the projectile
  /**
   *	Amount of projectiles spawned when firing
   */
  ProjectileCount = "minecraft:projectile_count",

  /**
   *	Used for tridents returning to their owner
   */
  TridentReturnAcceleration = "minecraft:trident_return_acceleration",

  //enchanted entity subtype
  // this entity: The player / attacking entity
  // Enchantment level
  // Origin The position of the attacking entity
  /**
   *	Maximum spread of projectiles in degrees from firing direction
   */
  ProjectileSpread = "minecraft:projectile_spread",

  /**
   *	Time saved during fishing in seconds. A higher number means shorter total fishing time.
   */
  FishingTimeReduction = "minecraft:fishing_time_reduction",

  /**
   *	Added luck used in the fishing loot table
   */
  FishingLuckBonus = "minecraft:fishing_luck_bonus",

  //enchanted entity subtype
  // this entity: The killed mob
  // Enchantment level
  // Origin The position of the killed mob
  /**
   *	Amount of experience awarded for killing a mob
   */
  MobExperience = "minecraft:mob_experience",

  //Direct Value Effects
  /**
   * Time of crossbow charging in seconds
   */
  CrossbowChargeTime = "minecraft:crossbow_charge_time",

  /**
   * Strength of the spin attack of a trident. Any value larger than 0 causes the trident to not be thrown.
   */
  TridentSpinAttackStrength = "minecraft:trident_spin_attack_strength",

  // Entity Effects
  // hit block subtype
  /**
   * When an entity hits a block
   */
  HitBlock = "minecraft:hit_block",

  // enchanted entity subtype
  /**
   * Every tick
   */
  Tick = "minecraft:tick",

  // enchanted entity subtype
  /**
   * After a projectile entity has been spawned from a bow or crossbow
   */
  ProjectileSpawned = "minecraft:projectile_spawned",

  // enchanted damage subtype
  /**
   * After an attack damages an entity
   */
  PostAttack = "minecraft:post_attack",

  /**
   * Applies a location-based effect when the owners block position changed, i.e. when the integer portion of the coordinate changes. Also triggers when the equipment is equipped.
   */
  LocationChanged = "minecraft:location_changed",

  /**
   * Applies damage immunity if the requirements are fulfilled.
   */
  DamageImmunity = "minecraft:damage_immunity",

  /**
   * Prevents the item from being dropped on death of the owner when the component is present.
   */
  PreventEquipmentDrop = "minecraft:prevent_equipment_drop",

  /**
   * prevent_armor_change
   */
  PreventArmorChange = "minecraft:prevent_armor_change",

  /**
   * Always applies all listed attribute effects.
   */
  Attributes = "minecraft:attributes",

  /**
   * Changes the sounds used when charging a crossbow.
   */
  CrossbowChargeSounds = "minecraft:crossbow_charge_sounds",

  /**
   * Changes the sounds of a trident.
   */
  TridentSound = "minecraft:trident_sound",
}

export interface EffectLootContextMapping {
  [EffectComponent.ArmorEffectiveness]: LootContext.EnchantedDamage;
  [EffectComponent.Damage]: LootContext.EnchantedDamage;
  [EffectComponent.DamageProtection]: LootContext.EnchantedDamage;
  [EffectComponent.SmashDamagePerFallenBlock]: LootContext.EnchantedDamage;
  [EffectComponent.Knockback]: LootContext.EnchantedDamage;
  [EffectComponent.EquipmentDrops]: LootContext.EnchantedDamage;

  [EffectComponent.AmmoUse]: LootContext.EnchantedItem;
  [EffectComponent.ProjectilePiercing]: LootContext.EnchantedItem;
  [EffectComponent.BlockExperience]: LootContext.EnchantedItem;
  [EffectComponent.RepairWithXp]: LootContext.EnchantedItem;
  [EffectComponent.ItemDamage]: LootContext.EnchantedItem;

  [EffectComponent.ProjectileCount]: LootContext.EnchantedEntity;
  [EffectComponent.TridentReturnAcceleration]: LootContext.EnchantedEntity;

  [EffectComponent.ProjectileSpread]: LootContext.EnchantedEntity;
  [EffectComponent.FishingTimeReduction]: LootContext.EnchantedEntity;
  [EffectComponent.FishingLuckBonus]: LootContext.EnchantedEntity;

  [EffectComponent.MobExperience]: LootContext.EnchantedEntity;

  [EffectComponent.HitBlock]: LootContext.HitBlock;
  [EffectComponent.Tick]: LootContext.EnchantedEntity;
  [EffectComponent.ProjectileSpawned]: LootContext.EnchantedEntity;
  [EffectComponent.PostAttack]: LootContext.EnchantedDamage;

  [EffectComponent.LocationChanged]: LootContext.EnchantedLocation;
  [EffectComponent.DamageImmunity]: LootContext.EnchantedDamage;
}
