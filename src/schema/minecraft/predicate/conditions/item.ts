import { IEnchantmentRef, IEnchantmentTagRef, IItemRef, IItemTagRef } from "../../ref";
import { AttributesOperation } from "../../enchantment";
import { Slot } from "../../generic";
import { INumberCondition } from "./misc";

interface IItemComponent {
  //todo
}

export interface IItemCondition {
  items?: IItemRef | IItemRef[] | IItemTagRef;
  count?: INumberCondition;
  components?: IItemComponent;
  predicate?: IItemSubPredicate;
}

export enum IItemSubPredicateType {
  AttributeModifiers = "minecraft:attribute_modifiers",
  BundleContents = "minecraft:bundle_contents",
  Container = "minecraft:container",
  CustomData = "minecraft:custom_data",
  Damage = "minecraft:damage",
  Enchantments = "minecraft:enchantments",
  StoredEnchantments = "minecraft:stored_enchantments",
  FireworkExplosion = "minecraft:firework_explosion",
  Fireworks = "minecraft:fireworks",
  PotionContents = "minecraft:potion_contents",
  Trim = "minecraft:trim",
  WritableBookContent = "minecraft:writable_book_content",
  WrittenBookContent = "minecraft:written_book_content",
}

export interface IItemSubPredicate {
  [IItemSubPredicateType.AttributeModifiers]?: {
    modifiers: {
      attribute: unknown; //todo
      uuid: unknown; //todo
      name: string;
      amount: INumberCondition;
      operation: AttributesOperation;
      slot:
        | "any"
        | "mainhand"
        | "offhand"
        | "hand"
        | "head"
        | "chest"
        | "legs"
        | "feet"
        | "armor";
    }[];
  };
  [IItemSubPredicateType.BundleContents]?: {
    items: IItemCondition[];
  };
  [IItemSubPredicateType.Container]?: {
    items: IItemCondition[];
  };
  [IItemSubPredicateType.CustomData]?: unknown; //todo
  [IItemSubPredicateType.Damage]?: {
    damage: INumberCondition;
    /**
     * Tests the durability of the item in this stack, represented by the number of uses remaining (not number of uses consumed).
     */
    durability: INumberCondition;
  };
  [IItemSubPredicateType.Enchantments]?: {
    enchantments: {
      enchantment?: IEnchantmentRef | IEnchantmentRef[] | IEnchantmentTagRef;
      levels: INumberCondition;
    }[];
  };
}

export type IEquipmentCondition = Partial<Record<Slot, IItemCondition>>;
