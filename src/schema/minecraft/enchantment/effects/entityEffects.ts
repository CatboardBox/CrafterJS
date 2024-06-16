import { FullVector3 } from "../../generic";
import { EffectComponent } from "./effectComponent";
import { ILevelBasedValue } from "../../misc";
import { RelativeEntity } from "./entity";
import { IEffectComponentMappingType } from "./misc";
import { IFunctionRef, IParticleRef, ISoundEventRef } from "../../ref";

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
  to_apply: string[]; //todo
  min_duration: ILevelBasedValue;
  max_duration: ILevelBasedValue;
  min_amplifier: ILevelBasedValue;
  max_amplifier: ILevelBasedValue;
};

export type IDamageEntityEntityEffects = {
  type: EntityEffectsType.DamageEntity;
  damage_type: string; //todo
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
  damage_type?: string; //todo
  immune_blocks?: string[]; //todo
  knockback_multiplier?: ILevelBasedValue;
  offset?: FullVector3;
  radius: ILevelBasedValue;
  create_fire: boolean;
  block_interaction: BlockInteractionType;
  small_particle: { type: IParticleRef };
  large_particle: { type: IParticleRef };
  sound: string; //todo
};

export type IIgniteEntityEffects = {
  type: EntityEffectsType.Ignite;
  duration: ILevelBasedValue;
};

export type IPlaySoundEntityEffects = {
  type: EntityEffectsType.PlaySound;
  sound: ISoundEventRef;
  volume: number;
  pitch: number;
};

export type IReplaceBlockEntityEffects = {
  type: EntityEffectsType.ReplaceBlock;
  block_state: string; //todo
  offset?: FullVector3;
  trigger_game_event: string; //todo
  predicate?: string; //todo
};

export type IReplaceDiskEntityEffects = {
  type: EntityEffectsType.ReplaceDisk;
  block_state: string; //todo
  offset?: FullVector3;
  radius: ILevelBasedValue;
  height: ILevelBasedValue;
  trigger_game_event: string; //todo
  predicate?: string; //todo
};

export type IRunFunctionEntityEffects = {
  type: EntityEffectsType.RunFunction;
  function: IFunctionRef;
};

export type ISetBlockPropertiesEntityEffects = {
  type: EntityEffectsType.SetBlockProperties;
  offset?: FullVector3;
  properties: Record<string, string>; //todo
  trigger_game_event: string; //todo
};

//todo
export type ISpawnParticlesEntityEffects = {
  type: EntityEffectsType.SpawnParticles;
  particle: { type: IParticleRef };
  horizontal_position:
    | {
        type: "entity_position";
        offset?: number;
      }
    | {
        type: "in_bounding_box";
        offset?: number;
        scale?: number;
      };
  vertical_position:
    | {
        type: "entity_position";
        offset?: number;
      }
    | {
        type: "in_bounding_box";
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
  entity: string[]; //todo
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
