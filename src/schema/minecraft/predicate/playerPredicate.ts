import { Gamemode } from "../misc/gamemode";
import { IAdvancementCriteriaRef, IPlayerStatisticRef, ResLocRef, ResourceType } from "../ref";
import { IEntityPredicate } from "./entityPredicate";
import { INumberPredicate } from "./misc";

export interface IPlayerPredicate {
  looking_at?: IEntityPredicate;
  advancements?: Record<ResLocRef[ResourceType.Advancement], IAdvancementPredicate>;
  gamemode?: Gamemode[];
  level?: INumberPredicate;
  recipes?: Record<ResLocRef[ResourceType.Recipe], boolean>;
  stats?: IStatsPredicate[];
}

export type IAdvancementPredicate = Record<IAdvancementCriteriaRef, boolean> | boolean;

export interface IStatsPredicate {
  type:
    | "minecraft:custom"
    | "minecraft:crafted"
    | "minecraft:used"
    | "minecraft:broken"
    | "minecraft:mined"
    | "minecraft:killed"
    | "minecraft:picked_up"
    | "minecraft:dropped"
    | "minecraft:killed_by";

    // https://minecraft.wiki/w/Statistics
  stat: IPlayerStatisticRef;
  value: INumberPredicate;
}
