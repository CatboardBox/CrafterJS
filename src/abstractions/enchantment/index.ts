import { Namespace } from "../namespace";
import {
  ResLocRef,
  ResourceType,
  IEnchantment,
  RangeInclusive,
  EnchantmentSlot,
  EffectComponent,
  IAttributeEffects,
  IEntityEffects,
  IPredicate,
  IValueEffect,
  EnchantedEntity,
  ICrossbowChargeSounds,
  ITridentSounds,
  RelativeEntity,
} from "../../schema";
import { ContentGenerator } from "../content";
import { Check } from "../predicates";
//https://minecraft.wiki/w/Enchantment_definition#Effect_components
const defaultEnchantment: IEnchantment = {
  description: "unnamed enchantment",
  anvil_cost: 1,
  effects: {},
  min_cost: {
    base: 1,
    per_level_above_first: 1,
  },
  max_cost: {
    base: 1,
    per_level_above_first: 1,
  },
  max_level: 1,
  slots: [],
  // exclusive_set: "",
  supported_items: undefined as unknown as IEnchantment["supported_items"],
  weight: 1,
};
interface IEnchantmentConstructor {
  id?: string;
  name: string;
  namespace: Namespace;
  buildPriority?: number;
}
export class Enchantment extends ContentGenerator<
  ResLocRef[ResourceType.Enchantment],
  IEnchantment
> {
  constructor({ name, namespace, ...others }: IEnchantmentConstructor) {
    super({
      type: [ResourceType.Enchantment],
      name,
      namespace: namespace,
      data: defaultEnchantment,
      ...others,
    });
    this.constructedData.description = {
      translate: this.translationKey,
      fallback: name,
    };
  }

  protected validate() {
    if (this.constructedData.slots.length === 0)
      throw new Error("Enchantment must have at least one slot");
    if (this.constructedData.supported_items === "")
      throw new Error("Enchantment must have at a supported item/tag");
  }

  public setAnvilCost(cost: number) {
    this.constructedData.anvil_cost = cost;
    return this;
  }
  public setMinEnchantmentCost(cost: number, perLevel: number) {
    this.constructedData.min_cost = {
      base: cost,
      per_level_above_first: perLevel,
    };
    return this;
  }

  public setMaxEnchantmentCost(cost: number, perLevel: number) {
    this.constructedData.max_cost = {
      base: cost,
      per_level_above_first: perLevel,
    };
    return this;
  }

  public setWeight(weight: number) {
    this.constructedData.weight = weight;
    return this;
  }

  public setMaxLevel(level: RangeInclusive<255>) {
    this.constructedData.max_level = level;
    return this;
  }

  public setSlot(...slot: EnchantmentSlot[]) {
    this.constructedData.slots = slot;
    return this;
  }
  public appendSlot(slot: EnchantmentSlot) {
    this.constructedData.slots.push(slot);
    return this;
  }

  public setSupportedItem(
    item:
      | { ref: IEnchantment["supported_items"] }
      | IEnchantment["supported_items"]
  ) {
    if (typeof item === "string" || Array.isArray(item)) {
      this.constructedData.supported_items = item;
      return this;
    }
    this.constructedData.supported_items = item.ref;
    return this;
  }

  // public EffectRaw(effect: IEffectComponent) {
  //   this.constructedData.effects = {
  //     ...this.constructedData.effects,
  //     ...effect,
  //   };
  //   return this;
  // }

  public attributeEffect(value: IAttributeEffects) {
    if (!this.constructedData.effects[EffectComponent.Attributes])
      this.constructedData.effects[EffectComponent.Attributes] = [];
    this.constructedData.effects[EffectComponent.Attributes].push(value);
    return this;
  }

  public armorEffectiveness(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.ArmorEffectiveness])
      this.constructedData.effects[EffectComponent.ArmorEffectiveness] = [];
    this.constructedData.effects[EffectComponent.ArmorEffectiveness].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
    return this;
  }

  public damage(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.Damage])
      this.constructedData.effects[EffectComponent.Damage] = [];
    this.constructedData.effects[EffectComponent.Damage].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
    return this;
  }

  public damageProtection(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.DamageProtection])
      this.constructedData.effects[EffectComponent.DamageProtection] = [];
    this.constructedData.effects[EffectComponent.DamageProtection].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
    return this;
  }

  public smashDamagePerFallenBlock(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (
      !this.constructedData.effects[EffectComponent.SmashDamagePerFallenBlock]
    )
      this.constructedData.effects[EffectComponent.SmashDamagePerFallenBlock] =
        [];
    this.constructedData.effects[
      EffectComponent.SmashDamagePerFallenBlock
    ].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public knockback(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.Knockback])
      this.constructedData.effects[EffectComponent.Knockback] = [];
    this.constructedData.effects[EffectComponent.Knockback].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public equipmentDropChance(
    value: IValueEffect,
    enchanted: EnchantedEntity,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.EquipmentDrops])
      this.constructedData.effects[EffectComponent.EquipmentDrops] = [];
    this.constructedData.effects[EffectComponent.EquipmentDrops].push({
      effect: value,
      enchanted,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public ammoUse(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.AmmoUse])
      this.constructedData.effects[EffectComponent.AmmoUse] = [];
    this.constructedData.effects[EffectComponent.AmmoUse].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public projectilePiercing(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.ProjectilePiercing])
      this.constructedData.effects[EffectComponent.ProjectilePiercing] = [];
    this.constructedData.effects[EffectComponent.ProjectilePiercing].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public blockExperience(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.BlockExperience])
      this.constructedData.effects[EffectComponent.BlockExperience] = [];
    this.constructedData.effects[EffectComponent.BlockExperience].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public repairWithXp(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.RepairWithXp])
      this.constructedData.effects[EffectComponent.RepairWithXp] = [];
    this.constructedData.effects[EffectComponent.RepairWithXp].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public itemDamage(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.ItemDamage])
      this.constructedData.effects[EffectComponent.ItemDamage] = [];
    this.constructedData.effects[EffectComponent.ItemDamage].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public projectileCount(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.ProjectileCount])
      this.constructedData.effects[EffectComponent.ProjectileCount] = [];
    this.constructedData.effects[EffectComponent.ProjectileCount].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public tridentReturnAcceleration(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (
      !this.constructedData.effects[EffectComponent.TridentReturnAcceleration]
    )
      this.constructedData.effects[EffectComponent.TridentReturnAcceleration] =
        [];
    this.constructedData.effects[
      EffectComponent.TridentReturnAcceleration
    ].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public projectileSpread(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.ProjectileSpread])
      this.constructedData.effects[EffectComponent.ProjectileSpread] = [];
    this.constructedData.effects[EffectComponent.ProjectileSpread].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public fishingTimeReduction(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.FishingTimeReduction])
      this.constructedData.effects[EffectComponent.FishingTimeReduction] = [];
    this.constructedData.effects[EffectComponent.FishingTimeReduction].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public fishingLuckBonus(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.FishingLuckBonus])
      this.constructedData.effects[EffectComponent.FishingLuckBonus] = [];
    this.constructedData.effects[EffectComponent.FishingLuckBonus].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public mobExperience(
    value: IValueEffect,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.MobExperience])
      this.constructedData.effects[EffectComponent.MobExperience] = [];
    this.constructedData.effects[EffectComponent.MobExperience].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public crossbowChargeTime(value: IValueEffect) {
    if (!this.constructedData.effects[EffectComponent.CrossbowChargeTime])
      this.constructedData.effects[EffectComponent.CrossbowChargeTime] = [];
    this.constructedData.effects[EffectComponent.CrossbowChargeTime].push(
      value
    );
    return this;
  }

  public tridentSpinAttackStrength(value: IValueEffect) {
    if (
      !this.constructedData.effects[EffectComponent.TridentSpinAttackStrength]
    )
      this.constructedData.effects[EffectComponent.TridentSpinAttackStrength] =
        [];
    this.constructedData.effects[
      EffectComponent.TridentSpinAttackStrength
    ].push(value);
    return this;
  }

  public damageImmunity(requirementBuilder?: (builder: Check) => IPredicate) {
    if (!this.constructedData.effects[EffectComponent.DamageImmunity])
      this.constructedData.effects[EffectComponent.DamageImmunity] = [];
    this.constructedData.effects[EffectComponent.DamageImmunity].push({
      effect: {},
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public preventEquipmentDrop() {
    if (!this.constructedData.effects[EffectComponent.PreventEquipmentDrop])
      this.constructedData.effects[EffectComponent.PreventEquipmentDrop] = {};
    return this;
  }

  public preventArmorChange() {
    if (!this.constructedData.effects[EffectComponent.PreventArmorChange])
      this.constructedData.effects[EffectComponent.PreventArmorChange] = {};
    return this;
  }

  public hitBlockEffect(
    value: IEntityEffects,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.HitBlock])
      this.constructedData.effects[EffectComponent.HitBlock] = [];
    this.constructedData.effects[EffectComponent.HitBlock].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public tickEffect(
    value: IEntityEffects,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.Tick])
      this.constructedData.effects[EffectComponent.Tick] = [];
    this.constructedData.effects[EffectComponent.Tick].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public projectileSpawnedEffect(
    value: IEntityEffects,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.ProjectileSpawned])
      this.constructedData.effects[EffectComponent.ProjectileSpawned] = [];
    this.constructedData.effects[EffectComponent.ProjectileSpawned].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public postAttackEffect(
    {
      enchanted,
      target,
      ...value
    }: IEntityEffects & { enchanted: RelativeEntity; target: RelativeEntity },
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.PostAttack])
      this.constructedData.effects[EffectComponent.PostAttack] = [];
    this.constructedData.effects[EffectComponent.PostAttack].push({
      effect: value,
      enchanted,
      affected: target,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public locationChangedEffect(
    value: IEntityEffects,
    requirementBuilder?: (builder: Check) => IPredicate
  ) {
    if (!this.constructedData.effects[EffectComponent.LocationChanged])
      this.constructedData.effects[EffectComponent.LocationChanged] = [];
    this.constructedData.effects[EffectComponent.LocationChanged].push({
      effect: value,
      requirements: requirementBuilder
        ? requirementBuilder(new Check())
        : undefined,
    });
    return this;
  }

  public crossbowChargeSounds(value: ICrossbowChargeSounds[]) {
    this.constructedData.effects[EffectComponent.CrossbowChargeSounds] = value;
    return this;
  }

  public tridentSound(value: ITridentSounds[]) {
    this.constructedData.effects[EffectComponent.TridentSound] = value;
  }
}
