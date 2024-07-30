import { IItemStack } from "../item";
import JsonText from "../jsonText";
import { IAdvancementCriteriaRef, ResLocRef, ResourceType } from "../ref";
import { IAdvancementCriteria } from "./criteriaTriggers";

interface IAdvancementBase {
  display: {
    icon: IItemStack;
    title: JsonText;
    description: JsonText;
    frame?: "task" | "challenge" | "goal";
    showToast?: boolean;
    announceToChat?: boolean;
    hidden?: boolean;
  };
  criteria: { [key: IAdvancementCriteriaRef]: IAdvancementCriteria };
  requirements: IAdvancementCriteriaRef[][];
  rewards: {
    experience?: number;
    function?: ResLocRef[ResourceType.Function];
    loot?: ResLocRef[ResourceType.LootTable][];
    recipes?: ResLocRef[ResourceType.Recipe][];
  };
  sendTelemetryData?: boolean;
}

export interface IAdvancement extends IAdvancementBase {
  parent?: ResLocRef[ResourceType.Advancement];
}

export interface IRootAdvancement extends IAdvancementBase {
  display: IAdvancementBase["display"] & {
    background: unknown; // Additional property
  };
}

export * as AdvancementCriteria from "./criteria";
