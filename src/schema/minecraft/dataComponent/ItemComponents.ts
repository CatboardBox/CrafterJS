import { AttributesOperation } from "../enchantment";
import {
  Colors,
  FullVector3,
  IBlockStateProperties,
  ICustomData,
  INbt,
  JsonString,
  RangeInclusive,
  Seed,
  UUIDRef,
} from "../generic";
import { IItem, IItemStack } from "../item";
import {
  IAssetRef,
  IAttributeRef,
  IRef,
  ITranslationKey,
  ResLocRef,
  ResourceType,
  TagRef,
} from "../ref";

export enum ComponentType {
  AttributeModifier = "minecraft:attribute_modifiers",
  BannerPatterns = "minecraft:banner_patterns",
  BaseColor = "minecraft:base_color",
  Bees = "minecraft:bees",
  BlockEntityData = "minecraft:block_entity_data",
  BlockState = "minecraft:block_state",
  BucketEntityData = "minecraft:bucket_entity_data",
  BundleContents = "minecraft:bundle_contents",
  CanBreak = "minecraft:can_break",
  CanPlaceOn = "minecraft:can_place_on",
  ChargedProjectiles = "minecraft:charged_projectiles",
  Container = "minecraft:container",
  ContainerLoot = "minecraft:container_loot",
  CustomData = "minecraft:custom_data",
  CustomModelData = "minecraft:custom_model_data",
  CustomName = "minecraft:custom_name",
  Damage = "minecraft:damage",
  DebugStickState = "minecraft:debug_stick_state",
  DyedColor = "minecraft:dyed_color",
  EnchantmentGlintOverride = "minecraft:enchantment_glint_override",
  Enchantments = "minecraft:enchantments",
  EntityData = "minecraft:entity_data",
  FireResistant = "minecraft:fire_resistant",
  FireworkExplosion = "minecraft:firework_explosion",
  Fireworks = "minecraft:fireworks",
  Food = "minecraft:food",
  HideAdditionalTooltip = "minecraft:hide_additional_tooltip",
  HideTooltip = "minecraft:hide_tooltip",
  Instrument = "minecraft:instrument",
  IntangibleProjectile = "minecraft:intangible_projectile",
  ItemName = "minecraft:item_name",
  JukeboxPlayable = "minecraft:jukebox_playable",
  Lock = "minecraft:lock",
  LodestoneTracker = "minecraft:lodestone_tracker",
  Lore = "minecraft:lore",
  MapColor = "minecraft:map_color",
  MapDecorations = "minecraft:map_decorations",
  MapId = "minecraft:map_id",
  MaxDamage = "minecraft:max_damage",
  MaxStackSize = "minecraft:max_stack_size",
  NoteBlockSound = "minecraft:note_block_sound",
  OminousBottleAmplifier = "minecraft:ominous_bottle_amplifier",
  PotDecorations = "minecraft:pot_decorations",
  PotionContents = "minecraft:potion_contents",
  Profile = "minecraft:profile",
  Rarity = "minecraft:rarity",
  Recipes = "minecraft:recipes",
  RepairCost = "minecraft:repair_cost",
  StoredEnchantments = "minecraft:stored_enchantments",
  SuspiciousStewEffects = "minecraft:suspicious_stew_effects",
  Tool = "minecraft:tool",
  Trim = "minecraft:trim",
  Unbreakable = "minecraft:unbreakable",
  WritableBookContent = "minecraft:writable_book_content",
  WrittenBookContent = "minecraft:written_book_content",
}

export interface IItemComponents {
  //todo
  [ComponentType.AttributeModifier]?: IAttributeModifiers;

  [ComponentType.BannerPatterns]?: IBannerPatterns;

  [ComponentType.BaseColor]?: IBaseColor;

  [ComponentType.Bees]?: IBees;

  [ComponentType.BlockEntityData]?: IBlockEntityData;

  [ComponentType.BlockState]?: IBlockStateProperties;

  [ComponentType.BucketEntityData]?: IBucketEntityData;

  [ComponentType.BundleContents]?: IItemStack[];

  [ComponentType.CanBreak]?: ICanBreak;

  [ComponentType.CanPlaceOn]?: ICanPlaceOn;

  [ComponentType.ChargedProjectiles]?: IChargedProjectiles;

  [ComponentType.Container]?: IContainer;

  [ComponentType.ContainerLoot]?: IContainerLoot;

  [ComponentType.CustomData]?: ICustomData;

  [ComponentType.CustomModelData]?: ICustomModelData;

  [ComponentType.CustomName]?: ICustomName;

  [ComponentType.Damage]?: IDamage;

  [ComponentType.DebugStickState]?: IDebugStickState;

  [ComponentType.DyedColor]?: IDyedColor;

  [ComponentType.EnchantmentGlintOverride]?: IEnchantmentGlintOverride;

  [ComponentType.Enchantments]?: IEnchantments;

  [ComponentType.EntityData]?: IEntityData;

  [ComponentType.FireResistant]?: IFireResistant;

  [ComponentType.FireworkExplosion]?: IFireworkExplosion;

  [ComponentType.Fireworks]?: IFireworks;

  [ComponentType.Food]?: IFood;

  [ComponentType.HideAdditionalTooltip]?: IHideAdditionalTooltip;

  [ComponentType.HideTooltip]?: IHideTooltip;

  [ComponentType.Instrument]?: IInstrument;

  [ComponentType.IntangibleProjectile]?: IIntangibleProjectile;

  [ComponentType.ItemName]?: IItemName;

  [ComponentType.JukeboxPlayable]?: IJukeboxPlayable;

  [ComponentType.Lock]?: ILock;

  [ComponentType.LodestoneTracker]?: ILodestoneTracker;

  [ComponentType.Lore]?: ILore;

  [ComponentType.MapColor]?: IMapColor;

  [ComponentType.MapDecorations]?: IMapDecorations;

  [ComponentType.MapId]?: IMapId;

  [ComponentType.MaxDamage]?: IMaxDamage;

  [ComponentType.MaxStackSize]?: IMaxStackSize;

  [ComponentType.NoteBlockSound]?: INoteBlockSound;

  [ComponentType.OminousBottleAmplifier]?: IOminousBottleAmplifier;

  [ComponentType.PotDecorations]?: IPotDecorations;

  [ComponentType.PotionContents]?: IPotionContents;

  [ComponentType.Profile]?: IProfile;

  [ComponentType.Rarity]?: IRarity;

  [ComponentType.Recipes]?: IRecipes;

  [ComponentType.RepairCost]?: IRepairCost;

  [ComponentType.StoredEnchantments]?: IStoredEnchantments;

  [ComponentType.SuspiciousStewEffects]?: ISuspiciousStewEffects;

  [ComponentType.Tool]?: ITool;

  [ComponentType.Trim]?: ITrim;

  [ComponentType.Unbreakable]?: IUnbreakable;

  [ComponentType.WritableBookContent]?: IWritableBookContent;

  [ComponentType.WrittenBookContent]?: IWrittenBookContent;
}

type IBlockPredicate = {
  blocks:
    | ResLocRef[ResourceType.Block]
    | ResLocRef[ResourceType.Block][]
    | TagRef[ResourceType.Block];
  nbt?: INbt;
  state?: IBlockStateProperties;
};

export enum Rarity {
  Common = "common",
  Uncommon = "uncommon",
  Rare = "rare",
  Epic = "epic",
}

export enum BookGeneration {
  Original = 0,
  Copy = 1,
  CopyOfCopy = 2,
  Tattered = 3,
}

interface IAttributeModifiers {
  modifiers: {
    type: IAttributeRef;
    // | TagRef[TagType.Attribute]; // check if attribute tag exists
    id: IRef;
    uuid: UUIDRef;
    amount: number;
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
  /**
   * Show or hide attribute modifiers on this item's tooltip. Defaults to true.
   */
  show_in_tooltip?: boolean;
}
interface IBannerPatterns {
  patterns: {
    color: Colors;
    pattern:
      | ResLocRef[ResourceType.BannerPattern]
      | {
          asset_id: IAssetRef;
          translation_id: ITranslationKey;
        };
  }[];
}

type IBaseColor = Colors;

type IBees = {
  entity_data: unknown; //todo
  /**
   * The minimum amount of time in ticks for this entity to stay in the hive
   */
  min_ticks_in_hive: number;
  /**
   * The amount of ticks the entity has stayed in the hive.
   */
  ticks_in_hive: number;
}[];

interface IBlockEntityData {
  [key: string]: unknown; //todo
}

interface IBucketEntityData {
  NoAI?: boolean;
  Silent?: boolean;
  NoGravity?: boolean;
  Glowing?: boolean;
  Invulnerable?: boolean;
  Health?: number;
  Age?: number;
  /**
   * Variant: Turns into Variant entity tag for axolotls.
   */
  Variant?: number;
  /**
   * Turns into the expiry time of the memory module has_hunting_cooldown for axolotls.
   */
  HuntingCooldown?: number;
  /**
   * Turns into Variant entity tag for tropical fish.
   */
  BucketVariantTag?: number;
}

type ICanBreak = {
  /**
   * Show or hide the "Can break" line on this item's tooltip. Defaults to true.
   */
  show_in_tooltip?: boolean;
} & (
  | {
      predicates: IBlockPredicate[];
    }
  | IBlockPredicate
);
type ICanPlaceOn = {
  /**
   * Show or hide the "Can be placed on" line on this item's tooltip. Defaults to true.
   */
  show_in_tooltip?: boolean;
} & (
  | {
      predicates: IBlockPredicate[];
    }
  | IBlockPredicate
);

type IChargedProjectiles = IItemStack[];

type IContainer = {
  slot: number;
  item: IItemStack;
}[];

interface IContainerLoot {
  loot_table: ResLocRef[ResourceType.LootTable];
  seed?: Seed;
}

type ICustomModelData = number;

type ICustomName = JsonString;

type IDamage = number;

type IDebugStickState = IBlockStateProperties;

type IDyedColor =
  | {
      rgb: number;
      show_in_tooltip?: boolean;
    }
  | number;

type IEnchantmentGlintOverride = boolean;

type IEnchantments = {
  [key: ResLocRef[ResourceType.Enchantment]]: number;
  show_in_tooltip?: boolean;
};

type IEntityData = INbt;

type IFireResistant = Record<string, never>;

type IFireworkExplosion = {
  shape: "small_ball" | "large_ball" | "star" | "creeper" | "burst";
  colors: number[];
  fade_colors: number[];
  has_trail: boolean;
  has_twinkle: boolean;
};

type IFireworks = {
  explosions: IFireworkExplosion[];
  flight_duration?: number;
};

type IFood = {
  nutrition: number;
  saturation: number;
  can_always_eat?: boolean;
  eat_seconds?: number;
  using_converts_to?: IItem;
  effects?: {
    effect: {
      id: ResLocRef[ResourceType.MobEffect];
      amplifier?: number;
      duration?: number;
      ambient?: boolean;
      show_particles?: boolean;
      show_icon?: boolean;
    };
    probability?: number;
  }[];
};

type IHideAdditionalTooltip = Record<string, never>;

type IHideTooltip = Record<string, never>;

type IInstrument = {
  [key: ResLocRef[ResourceType.Instrument]]: {
    sound_event:
      | ResLocRef[ResourceType.SoundEvent]
      | {
          sound_id: IAssetRef;
          range: number;
        };
    use_duration: number;
    range: number;
  };
};

type IIntangibleProjectile = Record<string, never>;

type IItemName = JsonString;

type IJukeboxPlayable = {
  song: IAssetRef;
  show_in_tooltip?: boolean;
};

type ILock = ICustomName;

type ILodestoneTracker = {
  target?: {
    pos: FullVector3;
    dimension: ResLocRef[ResourceType.Dimension];
  };
  tracked?: boolean;
};

type ILore = JsonString[];

type IMapColor = number;

export enum MapMarkerType {
  Player = "player",
  Frame = "frame",
  RedMarker = "red_marker",
  BlueMarker = "blue_marker",
  TargetX = "target_x",
  TargetPoint = "target_point",
  PlayerOffMap = "player_off_map",
  PlayerOffLimits = "player_off_limits",
  Mansion = "mansion",
  Monument = "monument",
  BannerWhite = "banner_white",
  BannerOrange = "banner_orange",
  BannerMagenta = "banner_magenta",
  BannerLightBlue = "banner_light_blue",
  BannerYellow = "banner_yellow",
  BannerLime = "banner_lime",
  BannerPink = "banner_pink",
  BannerGray = "banner_gray",
  BannerLightGray = "banner_light_gray",
  BannerCyan = "banner_cyan",
  BannerPurple = "banner_purple",
  BannerBlue = "banner_blue",
  BannerBrown = "banner_brown",
  BannerGreen = "banner_green",
  BannerRed = "banner_red",
  BannerBlack = "banner_black",
  RedX = "red_x",
  VillageDesert = "village_desert",
  VillagePlains = "village_plains",
  VillageSavanna = "village_savanna",
  VillageSnowy = "village_snowy",
  VillageTaiga = "village_taiga",
  JungleTemple = "jungle_temple",
  SwampHut = "swamp_hut",
}
type IMapDecorations = {
  [key: string]: {
    //todo
    type: MapMarkerType;
    x: number;
    z: number;
    rotation: number;
  };
};

type IMapId = number;

type IMaxDamage = number;

type IMaxStackSize = number;

type INoteBlockSound = ResLocRef[ResourceType.SoundEvent];

/**
 * The amplifier amount of the Bad Omen effect on this ominous bottle. Must be a positive integer between 0 and 4 (inclusive).
 */
type IOminousBottleAmplifier = RangeInclusive<4>;

type IPotDecorations = unknown; //todo

type IPotionContents = {
  id?: unknown; //todo
  custom_color?: number;
  custom_effects?: {
    id: ResLocRef[ResourceType.MobEffect];
    amplifier?: number;
    duration?: number;
    ambient?: boolean;
    show_particles?: boolean;
    show_icon?: boolean;
  }[];
};

type IProfile = {
  name?: string;
  id?: UUIDRef;
  properties?: unknown[];
  // {
  //   name: string;
  //   value: string;
  //   signature?: string;
  // }[];
};

type IRarity = Rarity;

type IRecipes = ResLocRef[ResourceType.Recipe][];

type IRepairCost = number;

type IStoredEnchantments = {
  [key: ResLocRef[ResourceType.Enchantment]]: number;
  show_in_tooltip?: boolean;
};

type ISuspiciousStewEffects = {
  id: ResLocRef[ResourceType.MobEffect];
  duration?: number;
}[];

type ITool = {
  default_mining_speed?: number;
  damage_per_block: number;
  rules: {
    blocks:
      | ResLocRef[ResourceType.Block]
      | ResLocRef[ResourceType.Block][]
      | TagRef[ResourceType.Block];
    speed?: number;
    correct_for_drops?: boolean;
  }[];
};

type ITrim = {
  pattern: ResLocRef[ResourceType.TrimPattern];
  material: ResLocRef[ResourceType.TrimMaterial];
  show_in_tooltip?: boolean;
};

type IUnbreakable = {
  show_in_tooltip?: boolean;
};

type IWritableBookContent = {
  pages: (
    | {
        raw: JsonString;
        filtered?: JsonString;
      }
    | string
  )[];
};
type IWrittenBookContent = IWritableBookContent & {
  title: {
    raw: string;
    filtered?: string;
  };
  author: string;
  /**
   * The number of times this written book has been copied.
   * Defaults to 0. If the value is greater than 1, the book cannot be copied.
   */
  generation?: BookGeneration;
  resolved?: boolean;
};
