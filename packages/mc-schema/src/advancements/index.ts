import { IItemStack } from "../item";
import { JsonText } from "../jsonText";
import { IAdvancementCriteriaRef, ResLocRef, ResourceType } from "../ref";
import { IAdvancementCriteria } from "./criteriaTriggers";

export enum AdvancementDisplayFrame {
  Task = "task",
  Challenge = "challenge",
  Goal = "goal",
}

export interface IAdvancementDisplay {
  icon: IItemStack;
  title: JsonText;
  description: JsonText;
  frame?: AdvancementDisplayFrame;
  showToast?: boolean;
  announceToChat?: boolean;
  hidden?: boolean;
}

export interface IAdvancementRewards {
  experience?: number;
  function?: ResLocRef[ResourceType.Function];
  loot?: ResLocRef[ResourceType.LootTable][];
  recipes?: ResLocRef[ResourceType.Recipe][];
}

export interface IAdvancement {
  parent?: ResLocRef[ResourceType.Advancement];
  display: IAdvancementDisplay;
  criteria: { [key: IAdvancementCriteriaRef]: IAdvancementCriteria };
  requirements: IAdvancementCriteriaRef[][];
  rewards?: IAdvancementRewards;
  sendTelemetryData?: boolean;
}

export interface IRootAdvancement extends Omit<IAdvancement, "parent"> {
  display: IAdvancement["display"] & {
    background: unknown; // Additional property
  };
}

export * as AdvancementCriteria from "./criteria";
export * from "./criteriaTriggers";
