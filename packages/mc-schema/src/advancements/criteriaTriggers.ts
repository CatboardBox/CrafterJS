import { AdvancementCriteria } from ".";

/*
minecraft:allay_drop_item_on_block
minecraft:any_block_use
minecraft:avoid_vibration
minecraft:bee_nest_destroyed
minecraft:bred_animals
minecraft:brewed_potion
minecraft:changed_dimension
minecraft:channeled_lightning
minecraft:construct_beacon
minecraft:consume_item
minecraft:crafter_recipe_crafted
minecraft:cured_zombie_villager
minecraft:default_block_use
minecraft:effects_changed
minecraft:enchanted_item
minecraft:enter_block
minecraft:entity_hurt_player
minecraft:entity_killed_player
minecraft:fall_after_explosion
minecraft:fall_from_height
minecraft:filled_bucket
minecraft:fishing_rod_hooked
minecraft:hero_of_the_village
minecraft:impossible
minecraft:inventory_changed
minecraft:item_durability_changed
minecraft:item_used_on_block
minecraft:kill_mob_near_sculk_catalyst
minecraft:killed_by_crossbow
minecraft:levitation
minecraft:lightning_strike
minecraft:location
minecraft:nether_travel
minecraft:placed_block
minecraft:player_generates_container_loot
minecraft:player_hurt_entity
minecraft:player_interacted_with_entity
minecraft:player_killed_entity
minecraft:recipe_crafted
minecraft:recipe_unlocked
minecraft:ride_entity_in_lava
minecraft:shot_crossbow
minecraft:slept_in_bed
minecraft:slide_down_block
minecraft:started_riding
minecraft:summoned_entity
minecraft:tame_animal
minecraft:target_hit
minecraft:thrown_item_picked_up_by_entity
minecraft:thrown_item_picked_up_by_player
minecraft:tick
minecraft:used_ender_eye
minecraft:used_totem
minecraft:using_item
minecraft:villager_trade
minecraft:voluntary_exile
*/
export enum AdvancementCriteriaTrigger {
  AllayDropItemOnBlock = "minecraft:allay_drop_item_on_block",
  AnyBlockUse = "minecraft:any_block_use",
  AvoidVibration = "minecraft:avoid_vibration",
  BeeNestDestroyed = "minecraft:bee_nest_destroyed",
  BredAnimals = "minecraft:bred_animals",
  BrewedPotion = "minecraft:brewed_potion",
  ChangedDimension = "minecraft:changed_dimension",
  ChanneledLightning = "minecraft:channeled_lightning",
  ConstructBeacon = "minecraft:construct_beacon",
  ConsumeItem = "minecraft:consume_item",
  CrafterRecipeCrafted = "minecraft:crafter_recipe_crafted",
  CuredZombieVillager = "minecraft:cured_zombie_villager",
  DefaultBlockUse = "minecraft:default_block_use",
  EffectsChanged = "minecraft:effects_changed",
  EnchantedItem = "minecraft:enchanted_item",
  EnterBlock = "minecraft:enter_block",
  EntityHurtPlayer = "minecraft:entity_hurt_player",
  EntityKilledPlayer = "minecraft:entity_killed_player",
  FallAfterExplosion = "minecraft:fall_after_explosion",
  FallFromHeight = "minecraft:fall_from_height",
  FilledBucket = "minecraft:filled_bucket",
  FishingRodHooked = "minecraft:fishing_rod_hooked",
  HeroOfTheVillage = "minecraft:hero_of_the_village",
  Impossible = "minecraft:impossible",
  InventoryChanged = "minecraft:inventory_changed",
  ItemDurabilityChanged = "minecraft:item_durability_changed",
  ItemUsedOnBlock = "minecraft:item_used_on_block",
  KillMobNearSculkCatalyst = "minecraft:kill_mob_near_sculk_catalyst",
  KilledByCrossbow = "minecraft:killed_by_crossbow",
  Levitation = "minecraft:levitation",
  LightningStrike = "minecraft:lightning_strike",
  Location = "minecraft:location",
  NetherTravel = "minecraft:nether_travel",
  PlacedBlock = "minecraft:placed_block",
  PlayerGeneratesContainerLoot = "minecraft:player_generates_container_loot",
  PlayerHurtEntity = "minecraft:player_hurt_entity",
  PlayerInteractedWithEntity = "minecraft:player_interacted_with_entity",
  PlayerKilledEntity = "minecraft:player_killed_entity",
  RecipeCrafted = "minecraft:recipe_crafted",
  RecipeUnlocked = "minecraft:recipe_unlocked",
  RideEntityInLava = "minecraft:ride_entity_in_lava",
  ShotCrossbow = "minecraft:shot_crossbow",
  SleptInBed = "minecraft:slept_in_bed",
  SlideDownBlock = "minecraft:slide_down_block",
  StartedRiding = "minecraft:started_riding",
  SummonedEntity = "minecraft:summoned_entity",
  TameAnimal = "minecraft:tame_animal",
  TargetHit = "minecraft:target_hit",
  ThrownItemPickedUpByEntity = "minecraft:thrown_item_picked_up_by_entity",
  ThrownItemPickedUpByPlayer = "minecraft:thrown_item_picked_up_by_player",
  Tick = "minecraft:tick",
  UsedEnderEye = "minecraft:used_ender_eye",
  UsedTotem = "minecraft:used_totem",
  UsingItem = "minecraft:using_item",
  VillagerTrade = "minecraft:villager_trade",
  VoluntaryExile = "minecraft:voluntary_exile",
}

export type IAdvancementCriteria =
  | AdvancementCriteria.IAllayDropItemOnBlock
  | AdvancementCriteria.IAnyBlockUse
  | AdvancementCriteria.IAvoidVibration
  | AdvancementCriteria.IBeeNestDestroyed
  | AdvancementCriteria.IBredAnimals
  | AdvancementCriteria.IBrewedPotion
  | AdvancementCriteria.IChangedDimension
  | AdvancementCriteria.IChanneledLightning
  | AdvancementCriteria.IConstructBeacon
  | AdvancementCriteria.IConsumeItem
  | AdvancementCriteria.ICrafterRecipeCrafted
  | AdvancementCriteria.ICuredZombieVillager
  | AdvancementCriteria.IDefaultBlockUse
  | AdvancementCriteria.IEffectsChanged
  | AdvancementCriteria.IEnchantedItem
  | AdvancementCriteria.IEnterBlock
  | AdvancementCriteria.IEntityHurtPlayer
  | AdvancementCriteria.IEntityKilledPlayer
  | AdvancementCriteria.IFallAfterExplosion
  | AdvancementCriteria.IFallFromHeight
  | AdvancementCriteria.IFilledBucket
  | AdvancementCriteria.IFishingRodHooked
  | AdvancementCriteria.IHeroOfTheVillage
  | AdvancementCriteria.IImpossible
  | AdvancementCriteria.IInventoryChanged
  | AdvancementCriteria.IItemDurabilityChanged
  | AdvancementCriteria.IItemUsedOnBlock
  | AdvancementCriteria.IKillMobNearSculkCatalyst
  | AdvancementCriteria.IKilledByCrossbow
  | AdvancementCriteria.ILevitation
  | AdvancementCriteria.ILightningStrike
  | AdvancementCriteria.ILocation
  | AdvancementCriteria.INetherTravel
  | AdvancementCriteria.IPlacedBlock
  | AdvancementCriteria.IPlayerGeneratesContainerLoot
  | AdvancementCriteria.IPlayerHurtEntity
  | AdvancementCriteria.IPlayerInteractedWithEntity
  | AdvancementCriteria.IPlayerKilledEntity
  | AdvancementCriteria.IRecipeCrafted
  | AdvancementCriteria.IRecipeUnlocked
  | AdvancementCriteria.IRideEntityInLava
  | AdvancementCriteria.IShotCrossbow
  | AdvancementCriteria.ISleptInBed
  | AdvancementCriteria.ISlideDownBlock
  | AdvancementCriteria.IStartedRiding
  | AdvancementCriteria.ISummonedEntity
  | AdvancementCriteria.ITameAnimal
  | AdvancementCriteria.ITargetHit
  | AdvancementCriteria.IThrownItemPickedUpByEntity
  | AdvancementCriteria.IThrownItemPickedUpByPlayer
  | AdvancementCriteria.ITick
  | AdvancementCriteria.IUsedEnderEye
  | AdvancementCriteria.IUsedTotem
  | AdvancementCriteria.IUsingItem
  | AdvancementCriteria.IVillagerTrade
  | AdvancementCriteria.IVoluntaryExile;
