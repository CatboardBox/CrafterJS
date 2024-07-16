export enum EnchantmentSlot {
  Mainhand = "mainhand",
  Offhand = "offhand",
  Armor = "armor",
  Feet = "feet",
  Legs = "legs",
  Chest = "chest",
  Head = "head",
}

export type EnchantmentSlotRef =
  | (string & {
      readonly __slotBrand: unique symbol;
    })
  | EnchantmentSlot;
