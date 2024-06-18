import { EnchantedEntity } from "../entity";
import { EffectComponent } from "../effectComponent";
import { IEffectComponentMappingType } from "../misc";

export enum ValueEffectTypes {
  /**
   * Sets the value to the specified value.
   */
  Set = "minecraft:set",
  /**
   * Adds the specified value to the old value.
   */
  Add = "minecraft:add",
  /**
   * Multiplies the value by the specified factor.
   */
  Multiply = "minecraft:multiply",
  /**
   * Runs multiple checks, each time reducing the value by 1 with the specified chance.
   */
  RemoveBinomial = "minecraft:remove_binomial",
  /**
   * Runs multiple value effects in series.
   */
  AllOf = "minecraft:all_of",
}
export type IValueEffect =
  | {
      type: ValueEffectTypes.Set | ValueEffectTypes.Add;
      value: number;
    }
  | {
      type: ValueEffectTypes.Multiply;
      factor: number;
    }
  | {
      type: ValueEffectTypes.RemoveBinomial;
      chance: number;
    }
  | {
      type: ValueEffectTypes.AllOf;
      effects: IValueEffect[];
    };

type ValueEffectComponentTypes =
  | EffectComponent.ArmorEffectiveness
  | EffectComponent.Damage
  | EffectComponent.DamageProtection
  | EffectComponent.SmashDamagePerFallenBlock
  | EffectComponent.Knockback
  // | EffectComponent.equipment_drops // special case
  | EffectComponent.AmmoUse
  | EffectComponent.ProjectilePiercing
  | EffectComponent.BlockExperience
  | EffectComponent.RepairWithXp
  | EffectComponent.ItemDamage
  | EffectComponent.ProjectileCount
  | EffectComponent.TridentReturnAcceleration
  | EffectComponent.ProjectileSpread
  | EffectComponent.FishingTimeReduction
  | EffectComponent.FishingLuckBonus
  | EffectComponent.MobExperience;

type DirectValueEffectComponentTypes =
  | EffectComponent.CrossbowChargeTime
  | EffectComponent.TridentSpinAttackStrength;

interface IValueEffectComponentStandardContent {
  /**
   * Determines how to modify the value.
   */
  effect: IValueEffect;
}

type IValueEffectComponentAll = IEffectComponentMappingType<
  ValueEffectComponentTypes,
  IValueEffectComponentStandardContent
> &
  IEffectComponentMappingType<
    EffectComponent.EquipmentDrops,
    IValueEffectComponentStandardContent & {
      /**
       * One of attacker, or victim. — which entity has to have the enchantment
       */
      enchanted: EnchantedEntity;
    }
  > &
  IEffectComponentMappingType<DirectValueEffectComponentTypes, IValueEffect>;

export type IValueEffectComponent = Partial<IValueEffectComponentAll>;
