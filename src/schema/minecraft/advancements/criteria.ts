import { IBlockStatePropertiesPredicate } from "../generic";
import {
  IDamageTypePredicate,
  IDistancePredicate,
  IEntityPredicate,
  IItemPredicate,
  ILocationPredicate,
  INumberPredicate,
  IPredicate,
} from "../predicate";
import { ResLocRef, ResourceType } from "../ref";
import { AdvancementCriteriaTrigger } from "./criteriaTriggers";

export interface IAllayDropItemOnBlock {
  trigger: AdvancementCriteriaTrigger.AllayDropItemOnBlock;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    location?: IPredicate[];
  };
}

export interface IAnyBlockUse {
  trigger: AdvancementCriteriaTrigger.AnyBlockUse;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    location?: IPredicate[];
  };
}

export interface IAvoidVibration {
  trigger: AdvancementCriteriaTrigger.AvoidVibration;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
  };
}

export interface IBeeNestDestroyed {
  trigger: AdvancementCriteriaTrigger.BeeNestDestroyed;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    block?: ResLocRef[ResourceType.Block];
    item?: IItemPredicate;
    num_bees_inside?: INumberPredicate;
  };
}

export interface IBredAnimals {
  trigger: AdvancementCriteriaTrigger.BredAnimals;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    parent?: IEntityPredicate | IPredicate[];
    partner?: IEntityPredicate | IPredicate[];
    child?: IEntityPredicate | IPredicate[];
  };
}

export interface IBrewedPotion {
  trigger: AdvancementCriteriaTrigger.BrewedPotion;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    potion?: unknown; //todo
  };
}

export interface IChangedDimension {
  trigger: AdvancementCriteriaTrigger.ChangedDimension;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    from?: ResLocRef[ResourceType.Dimension];
    to?: ResLocRef[ResourceType.Dimension];
  };
}

export interface IChanneledLightning {
  trigger: AdvancementCriteriaTrigger.ChanneledLightning;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    victims?: (IEntityPredicate | IPredicate[])[];
  };
}

export interface IConstructBeacon {
  trigger: AdvancementCriteriaTrigger.ConstructBeacon;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    level?: INumberPredicate;
  };
}

export interface IConsumeItem {
  trigger: AdvancementCriteriaTrigger.ConsumeItem;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface ICrafterRecipeCrafted {
  trigger: AdvancementCriteriaTrigger.CrafterRecipeCrafted;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    recipe_id?: ResLocRef[ResourceType.Recipe];
    ingredients?: IItemPredicate[];
  };
}

export interface ICuredZombieVillager {
  trigger: AdvancementCriteriaTrigger.CuredZombieVillager;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    villager?: IEntityPredicate | IPredicate[];
    zombie?: IEntityPredicate | IPredicate[];
  };
}

export interface IDefaultBlockUse {
  trigger: AdvancementCriteriaTrigger.DefaultBlockUse;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    location?: IPredicate[];
  };
}

export interface IEffectsChanged {
  trigger: AdvancementCriteriaTrigger.EffectsChanged;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    effects?: {
      [effect: string]: {
        //todo
        ambient?: boolean;
        amplifier?: INumberPredicate;
        duration?: INumberPredicate;
        visible?: boolean;
      };
    };
    source?: IEntityPredicate | IPredicate[];
  };
}

export interface IEnchantedItem {
  trigger: AdvancementCriteriaTrigger.EnchantedItem;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    levels?: INumberPredicate;
    item?: IItemPredicate;
  };
}

export interface IEnterBlock {
  trigger: AdvancementCriteriaTrigger.EnterBlock;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    block?: ResLocRef[ResourceType.Block];
    state?: IBlockStatePropertiesPredicate;
  };
}

export interface IEntityHurtPlayer {
  trigger: AdvancementCriteriaTrigger.EntityHurtPlayer;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    damage?: {
      blocked?: boolean;
      dealt?: INumberPredicate;
      source?: IEntityPredicate;
      taken?: INumberPredicate;
      type?: IDamageTypePredicate;
    };
  };
}

export interface IEntityKilledPlayer {
  trigger: AdvancementCriteriaTrigger.EntityKilledPlayer;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
    killing_blow?: IDamageTypePredicate;
  };
}

export interface IFallAfterExplosion {
  trigger: AdvancementCriteriaTrigger.FallAfterExplosion;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    start_positon?: ILocationPredicate;
    distance?: IDistancePredicate;
    source?: IEntityPredicate | IPredicate[];
  };
}

export interface IFallFromHeight {
  trigger: AdvancementCriteriaTrigger.FallFromHeight;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    start_positon?: ILocationPredicate;
    distance?: IDistancePredicate;
  };
}

export interface IFilledBucket {
  trigger: AdvancementCriteriaTrigger.FilledBucket;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface IFishingRodHooked {
  trigger: AdvancementCriteriaTrigger.FishingRodHooked;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
    items?: IItemPredicate;
    rod?: IItemPredicate;
  };
}

export interface IHeroOfTheVillage {
  trigger: AdvancementCriteriaTrigger.HeroOfTheVillage;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
  };
}

export interface IImpossible {
  trigger: AdvancementCriteriaTrigger.Impossible;
}

export interface IInventoryChanged {
  trigger: AdvancementCriteriaTrigger.InventoryChanged;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    items?: IItemPredicate[];
    slots?: {
      empty?: INumberPredicate;
      full?: INumberPredicate;
      occupied?: INumberPredicate;
    };
  };
}

export interface IItemDurabilityChanged {
  trigger: AdvancementCriteriaTrigger.ItemDurabilityChanged;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
    /**
     * The change in durability. (negative for damage, positive for repair)
     */
    delta?: INumberPredicate;
    /**
     * remaining durability
     */
    durability?: INumberPredicate;
  };
}

export interface IItemUsedOnBlock {
  trigger: AdvancementCriteriaTrigger.ItemUsedOnBlock;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    location?: IPredicate[];
  };
}

export interface IKillMobNearSculkCatalyst {
  trigger: AdvancementCriteriaTrigger.KillMobNearSculkCatalyst;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
    killing_blow?: IDamageTypePredicate;
  };
}

export interface IKilledByCrossbow {
  trigger: AdvancementCriteriaTrigger.KilledByCrossbow;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    unique_entity_types?: INumberPredicate;
    victims?: (IEntityPredicate | IPredicate[])[];
  };
}

export interface ILevitation {
  trigger: AdvancementCriteriaTrigger.Levitation;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    duration?: INumberPredicate;
    distance?: IDistancePredicate;
  };
}

export interface ILightningStrike {
  trigger: AdvancementCriteriaTrigger.LightningStrike;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    lightning?: IEntityPredicate | IPredicate[];
    bystander?: IEntityPredicate | IPredicate[];
  };
}

/**
 * Triggers every second, doesnt really check anything specific
 */
export interface ILocation {
  trigger: AdvancementCriteriaTrigger.Location;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
  };
}

export interface INetherTravel {
  trigger: AdvancementCriteriaTrigger.NetherTravel;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    start_positon?: ILocationPredicate;
    distance?: IDistancePredicate;
  };
}

export interface IPlacedBlock {
  trigger: AdvancementCriteriaTrigger.PlacedBlock;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    location?: IPredicate[];
  };
}

export interface IPlayerGeneratesContainerLoot {
  trigger: AdvancementCriteriaTrigger.PlayerGeneratesContainerLoot;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    loot_table?: ResLocRef[ResourceType.LootTable];
  };
}

export interface IPlayerHurtEntity {
  trigger: AdvancementCriteriaTrigger.PlayerHurtEntity;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    damage?: {
      blocked?: boolean;
      dealt?: INumberPredicate;
      source_entity?: IEntityPredicate;
      taken?: INumberPredicate;
      type?: IDamageTypePredicate;
    };
    entity?: IEntityPredicate | IPredicate[];
  };
}

export interface IPlayerInteractedWithEntity {
  trigger: AdvancementCriteriaTrigger.PlayerInteractedWithEntity;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface IPlayerKilledEntity {
  trigger: AdvancementCriteriaTrigger.PlayerKilledEntity;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
    killing_blow?: IDamageTypePredicate;
  };
}

export interface IRecipeCrafted {
  trigger: AdvancementCriteriaTrigger.RecipeCrafted;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    recipe_id?: ResLocRef[ResourceType.Recipe];
    ingredients?: IItemPredicate[];
  };
}

export interface IRecipeUnlocked {
  trigger: AdvancementCriteriaTrigger.RecipeUnlocked;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    recipe_id?: ResLocRef[ResourceType.Recipe];
  };
}

export interface IRideEntityInLava {
  trigger: AdvancementCriteriaTrigger.RideEntityInLava;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    start_positon?: ILocationPredicate;
    distance?: IDistancePredicate;
  };
}

export interface IShotCrossbow {
  trigger: AdvancementCriteriaTrigger.ShotCrossbow;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface ISleptInBed {
  trigger: AdvancementCriteriaTrigger.SleptInBed;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
  };
}

export interface ISlideDownBlock {
  trigger: AdvancementCriteriaTrigger.SlideDownBlock;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    block?: ResLocRef[ResourceType.Block];
    state?: IBlockStatePropertiesPredicate;
  };
}

export interface IStartedRiding {
  trigger: AdvancementCriteriaTrigger.StartedRiding;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
  };
}

export interface ISummonedEntity {
  trigger: AdvancementCriteriaTrigger.SummonedEntity;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
  };
}

export interface ITameAnimal {
  trigger: AdvancementCriteriaTrigger.TameAnimal;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
  };
}

export interface ITargetHit {
  trigger: AdvancementCriteriaTrigger.TargetHit;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    signal_strength?: INumberPredicate;
    shooter?: IEntityPredicate | IPredicate[];
    projectile?: IEntityPredicate | IPredicate[];
  };
}

export interface IThrownItemPickedUpByEntity {
  trigger: AdvancementCriteriaTrigger.ThrownItemPickedUpByEntity;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface IThrownItemPickedUpByPlayer {
  trigger: AdvancementCriteriaTrigger.ThrownItemPickedUpByPlayer;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    entity?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface ITick {
  trigger: AdvancementCriteriaTrigger.Tick;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
  };
}

export interface IUsedEnderEye {
  trigger: AdvancementCriteriaTrigger.UsedEnderEye;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    distance?: INumberPredicate;
  };
}

export interface IUsedTotem {
  trigger: AdvancementCriteriaTrigger.UsedTotem;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface IUsingItem {
  trigger: AdvancementCriteriaTrigger.UsingItem;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface IVillagerTrade {
  trigger: AdvancementCriteriaTrigger.VillagerTrade;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
    villager?: IEntityPredicate | IPredicate[];
    item?: IItemPredicate;
  };
}

export interface IVoluntaryExile {
  trigger: AdvancementCriteriaTrigger.VoluntaryExile;
  conditions: {
    player?: IEntityPredicate | IPredicate[];
  };
}
