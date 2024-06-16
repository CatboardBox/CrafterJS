import { Slot } from "../../generic";
import { IEffectConditions } from "./effect";
import { IEquipmentCondition, IItemCondition } from "./item";
import { INumberCondition } from "./misc";

export interface IEntityCondition {
  type?: string; //todo
  distance?: unknown; //todo
  effects?: IEffectConditions;
  equipment?: IEquipmentCondition;
  flags?: {
    is_baby?: boolean;
    is_on_fire?: boolean;
    is_sneaking?: boolean;
    is_sprinting?: boolean;
    is_swimming?: boolean;
    is_on_ground?: boolean;
    is_flying?: boolean;
  };
  location?: unknown; //todo
  nbt?: string; //todo
  passenger?: IEntityCondition;
  slots?: Partial<Record<Slot, IItemCondition>>;
  stepping_on?: unknown; //todo
  movement_affected_by?: unknown; //todo
  team?: string;
  targeted_entity?: IEffectConditions;
  vehicle?: IEntityCondition;
  movement?: {
    x?: INumberCondition;
    y?: INumberCondition;
    z?: INumberCondition;
    horizontal_speed?: INumberCondition;
    vertical_speed?: INumberCondition;
    fall_distance?: INumberCondition;
  };
  periodic_tick?: number;
  type_specific?: {
    cat?: {
      variant: unknown; //todo
    };
    fishing_hook?: {
      in_open_water?: boolean;
    };
    lightning?: {
      blocks_set_on_fire?: INumberCondition;
      entity_struck?: IEntityCondition;
    };
    player?: {
      looking_at?: IEntityCondition;
      advancement?: unknown; //todo
      gamemode?: unknown; //todo
      level?: INumberCondition;
      recipes?: unknown; //todo
      stats?: unknown; //todo
    };
    raider?: {
      is_captain?: boolean;
      has_raid?: boolean;
    };
    slime?: {
      size?: INumberCondition;
    };
    wolf?: {
      variant?: unknown; //todo
    };
  };
}
