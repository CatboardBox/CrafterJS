export enum Slot {
  Contents = "contents",
  Container = "container",
  Hotbar = "hotbar",
  Inventory = "inventory",
  Enderchest = "enderchest",
  Villager = "villager",
  Horse = "horse",
  Saddle = "horse.saddle",
  /**
   * slot for the actual chest item
   * not the contents of the chest
   */
  Chest = "horse.chest",
  PetArmor = "armor.body",
  Weapon = "weapon",
  Mainhand = "weapon.mainhand",
  Offhand = "weapon.offhand",
  Armor = "armor",
  Helmet = "armor.head",
  Chestplate = "armor.chest",
  Leggings = "armor.legs",
  Boots = "armor.feet",
}

export const SlotCapacity = {
  [Slot.Container]: 54,
  [Slot.Hotbar]: 9,
  [Slot.Inventory]: 27,
  [Slot.Enderchest]: 27,
  [Slot.Villager]: 9,
  [Slot.Horse]: 15,
} as const;

type GenerateRange<
  N extends number,
  Result extends number[] = []
> = Result["length"] extends N
  ? Result[number]
  : GenerateRange<N, [...Result, Result["length"]]>;

type SlotWithCapacity = keyof typeof SlotCapacity;

type SlotNumberRanges = {
  [K in SlotWithCapacity]: (typeof SlotCapacity)[K] extends number
    ? GenerateRange<(typeof SlotCapacity)[K]>
    : never;
};

export function specificSlot<S extends SlotWithCapacity>(
  slot: S,
  slotNumber: SlotNumberRanges[S]
): SlotRef {
  return `${slot}.${slotNumber}` as SlotRef;
}

export type SlotRef =
  | (string & {
      readonly __slotBrand: unique symbol;
    })
  | Slot;
