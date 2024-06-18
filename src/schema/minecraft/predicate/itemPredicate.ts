import { ResLocRef, TagRef, ResourceType, IAttributeRef } from "../ref";
import { AttributesOperation } from "../enchantment";
import { TagType } from "../ref";
import { INumberPredicate } from "./misc";
import { IItemComponents } from "../dataComponent";
import { ICustomData, UUIDRef } from "../generic";

export interface IItemPredicate {
  items?:
    | ResLocRef[ResourceType.Item]
    | ResLocRef[ResourceType.Item][]
    | TagRef[TagType.Item];
  count?: INumberPredicate;
  components?: IItemComponents;
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
      attribute:
        | IAttributeRef
        | IAttributeRef[];
      // | TagRef[TagType.Attribute]; // check if attribute tag exists
      uuid: UUIDRef;
      name: string;
      amount: INumberPredicate;
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
    items: IItemPredicate[];
  };
  [IItemSubPredicateType.Container]?: {
    items: IItemPredicate[];
  };
  [IItemSubPredicateType.CustomData]?: ICustomData;
  [IItemSubPredicateType.Damage]?: {
    damage: INumberPredicate;
    /**
     * Tests the durability of the item in this stack, represented by the number of uses remaining (not number of uses consumed).
     */
    durability: INumberPredicate;
  };
  [IItemSubPredicateType.Enchantments]?: {
    enchantments: {
      enchantment?:
        | ResLocRef[ResourceType.Enchantment]
        | ResLocRef[ResourceType.Enchantment][]
        | TagRef[TagType.Enchantment];
      levels: INumberPredicate;
    }[];
  };
}
