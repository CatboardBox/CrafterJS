export enum ContainerSlot {
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
    [ContainerSlot.Container]: 54,
    [ContainerSlot.Hotbar]: 9,
    [ContainerSlot.Inventory]: 27,
    [ContainerSlot.Enderchest]: 27,
    [ContainerSlot.Villager]: 9,
    [ContainerSlot.Horse]: 15,
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
  
  export function specificContainerSlot<S extends SlotWithCapacity>(
    slot: S,
    slotNumber: SlotNumberRanges[S]
  ): ContainerSlotRef {
    return `${slot}.${slotNumber}` as ContainerSlotRef;
  }
  
  export type ContainerSlotRef =
    | (string & {
        readonly __slotBrand: unique symbol;
      })
    | ContainerSlot;
  