import { FullVector3, IBlockStateProperties } from "../../generic";
import { EffectComponent } from "../effectComponent";
import { ILevelBasedValue } from "../../misc";
import { RelativeEntity } from "../entity";
import { IBlockStateProvider, IEffectComponentMappingType } from "../misc";
import { ResLocRef, TagRef, ResourceType, TagType } from "../../ref";
import { IFloatProvider } from "../../misc";
import { IBlockPredicate } from "../../predicate";

export enum EntityEffectsType {
  /**
   * Runs multiple entity effects in sequence.
   */
  AllOf = "minecraft:all_of",
  /**
   * Applies a status effect to the affected mob.
   */
  ApplyMobEffect = "minecraft:apply_mob_effect",
  /**
   * Deals (extra) damage to the affected entity.
   */
  DamageEntity = "minecraft:damage_entity",
  /**
   * Reduces the durability of the enchanted item
   */
  DamageItem = "minecraft:damage_item",
  /**
   * Causes an explosion
   */
  Explode = "minecraft:explode",
  /**
   * Ignites the affected entity
   */
  Ignite = "minecraft:ignite",
  /**
   * Plays a sound
   */
  PlaySound = "minecraft:play_sound",
  /**
   * Places a block
   */
  ReplaceBlock = "minecraft:replace_block",
  /**
   * Places a half-sphere[verify].
   */
  ReplaceDisk = "minecraft:replace_disk",
  /**
   * Run a function.
   */
  RunFunction = "minecraft:run_function",
  /**
   * Sets the block properties of a block.
   */
  SetBlockProperties = "minecraft:set_block_properties",
  /**
   * Spawns particles.
   */
  SpawnParticles = "minecraft:spawn_particles",
  /**
   * Spawns an entity.
   */
  SummonEntity = "minecraft:summon_entity",
}

export type IAllOfEntityEffects = {
  type: EntityEffectsType.AllOf;
  effects: IEntityEffects[];
};

export type IApplyMobEffectEntityEffects = {
  type: EntityEffectsType.ApplyMobEffect;
  to_apply:
    | ResLocRef[ResourceType.MobEffect]
    | ResLocRef[ResourceType.MobEffect][]; // | ITagRef[TagType.MobEffects]; //todo : check if tag for mob effects exists
  min_duration: ILevelBasedValue;
  max_duration: ILevelBasedValue;
  min_amplifier: ILevelBasedValue;
  max_amplifier: ILevelBasedValue;
};
/**
 * Deals (extra) damage to the affected entity.
 */
export type IDamageEntityEntityEffects = {
  type: EntityEffectsType.DamageEntity;
  damage_type: ResLocRef[ResourceType.DamageType];
  min_damage: ILevelBasedValue;
  max_damage: ILevelBasedValue;
};

export type IDamageItemEntityEffects = {
  type: EntityEffectsType.DamageItem;
  amount: ILevelBasedValue;
};

export enum BlockInteractionType {
  /**
   * no effect
   */
  None = "none",
  /**
   * like a bed explosion
   */
  Block = "block",
  /**
   * like a creeper explosion
   */
  Mob = "mob",
  /**
   * like tnt explosion
   */
  Tnt = "tnt",
  /**
   * like a wind-charge explosion
   */
  Trigger = "trigger",
}

export type IExplodeEntityEffects = {
  type: EntityEffectsType.Explode;
  attribute_to_user: boolean;
  damage_type?: ResLocRef[ResourceType.DamageType];
  immune_blocks?:
    | ResLocRef[ResourceType.Block]
    | ResLocRef[ResourceType.Block][]
    | TagRef[TagType.Block];
  knockback_multiplier?: ILevelBasedValue;
  offset?: FullVector3;
  radius: ILevelBasedValue;
  create_fire: boolean;
  block_interaction: BlockInteractionType;
  small_particle: { type: ResLocRef[ResourceType.Particle] };
  large_particle: { type: ResLocRef[ResourceType.Particle] };
  sound: ResLocRef[ResourceType.SoundEvent];
};

export type IIgniteEntityEffects = {
  type: EntityEffectsType.Ignite;
  duration: ILevelBasedValue;
};

export type IPlaySoundEntityEffects = {
  type: EntityEffectsType.PlaySound;
  sound: ResLocRef[ResourceType.SoundEvent];
  volume: IFloatProvider;
  pitch: IFloatProvider;
};

export type IReplaceBlockEntityEffects = {
  type: EntityEffectsType.ReplaceBlock;
  block_state: IBlockStateProvider;
  offset?: FullVector3;
  trigger_game_event: ResLocRef[ResourceType.GameEvent];
  predicate?: IBlockPredicate;
};

export type IReplaceDiskEntityEffects = {
  type: EntityEffectsType.ReplaceDisk;
  block_state: IBlockStateProvider;
  offset?: FullVector3;
  radius: ILevelBasedValue;
  height: ILevelBasedValue;
  trigger_game_event: ResLocRef[ResourceType.GameEvent];
  predicate?: IBlockPredicate;
};

export type IRunFunctionEntityEffects = {
  type: EntityEffectsType.RunFunction;
  function: ResLocRef[ResourceType.Function];
};

export type ISetBlockPropertiesEntityEffects = {
  type: EntityEffectsType.SetBlockProperties;
  offset?: FullVector3;
  properties: IBlockStateProperties;
  trigger_game_event: ResLocRef[ResourceType.GameEvent];
};

export enum ISpawnParticlesPositionType {
  EntityPosition = "entity_position",
  InBoundingBox = "in_bounding_box",
}
export type ISpawnParticlesEntityEffects = {
  type: EntityEffectsType.SpawnParticles;
  particle: { type: ResLocRef[ResourceType.Particle] };
  horizontal_position:
    | {
        type: ISpawnParticlesPositionType.EntityPosition;
        offset?: number;
      }
    | {
        type: ISpawnParticlesPositionType.InBoundingBox;
        offset?: number;
        scale?: number;
      };
  vertical_position:
    | {
        type: ISpawnParticlesPositionType.EntityPosition;
        offset?: number;
      }
    | {
        type: ISpawnParticlesPositionType.InBoundingBox;
        offset?: number;
        scale?: number;
      };
  horizontal_velocity: {
    base: number;
    scale?: number;
  };
  vertical_velocity: {
    base: number;
    scale?: number;
  };
};

export type ISummonEntityEntityEffects = {
  type: EntityEffectsType.SummonEntity;
  entity:
    | ResLocRef[ResourceType.Entity]
    | ResLocRef[ResourceType.Entity][]
    | TagRef[TagType.Entity];
  join_team: boolean;
};

export type IEntityEffects =
  | IAllOfEntityEffects
  | IApplyMobEffectEntityEffects
  | IDamageEntityEntityEffects
  | IDamageItemEntityEffects
  | IExplodeEntityEffects
  | IIgniteEntityEffects
  | IPlaySoundEntityEffects
  | IReplaceBlockEntityEffects
  | IReplaceDiskEntityEffects
  | IRunFunctionEntityEffects
  | ISetBlockPropertiesEntityEffects
  | ISpawnParticlesEntityEffects
  | ISummonEntityEntityEffects;

type IEntityEffectComponentTypes =
  | EffectComponent.HitBlock
  | EffectComponent.Tick
  | EffectComponent.ProjectileSpawned;
// | EffectComponent.post_attack; //special case

interface IEntityEffectComponentStandardContent {
  /**
   * Determines how to modify the value.
   */
  effect: IEntityEffects;
}

interface IEntityEffectPostAttackContent
  extends IEntityEffectComponentStandardContent {
  enchanted: RelativeEntity;
  affected: RelativeEntity;
}

type IEntityEffectComponentAll = IEffectComponentMappingType<
  IEntityEffectComponentTypes,
  IEntityEffectComponentStandardContent
> &
  IEffectComponentMappingType<
    EffectComponent.PostAttack,
    IEntityEffectPostAttackContent
  >;

export type IEntityEffectComponent = Partial<IEntityEffectComponentAll>;
