import { logger } from "../../logger";
import {
  IAdvancement,
  ResLocRef,
  ResourceType,
  IItemStack,
  AdvancementDisplayFrame,
  IAdvancementCriteriaRef,
  IAdvancementDisplay,
  IAdvancementRewards,
  JsonText,
} from "@crafter-js/mc-schema";
import { ContentGenerator } from "../content";
import { Namespace } from "../namespace";
import { AdvancementCondition } from "./condition";

export class AdvancementBase<T extends IAdvancement> extends ContentGenerator<
  ResLocRef[ResourceType.Advancement],
  T
> {
  public constructor({
    name,
    namespace,
    defaultData,
  }: {
    name: string;
    namespace: Namespace;
    defaultData: T;
  }) {
    super({
      type: [ResourceType.Advancement],
      name,
      namespace,
      data: defaultData,
    });
  }

  protected static getNamespace<T extends IAdvancement>(
    advancement: AdvancementBase<T>
  ) {
    return advancement.namespace;
  }
  protected copyDisplayFrom(advancement: AdvancementBase<T>) {
    this.display = { ...advancement.display };
  }

  private get display() {
    return this.constructedData.display;
  }

  private set display(display: IAdvancementDisplay) {
    this.display = display;
  }

  private get rewards() {
    return this.constructedData.rewards || {};
  }

  private set rewards(rewards: IAdvancementRewards) {
    this.constructedData.rewards = rewards;
  }

  // PUBLIC

  public get title() {
    return this.display.title;
  }

  public set title(title: JsonText) {
    this.display.title = title;
  }

  public get description() {
    return this.display.description;
  }

  public set description(description: JsonText) {
    this.display.description = description;
  }

  public get icon() {
    return this.display.icon;
  }

  public set icon(icon: IItemStack) {
    this.display.icon = icon;
  }

  public get frame() {
    return this.display.frame || AdvancementDisplayFrame.Task;
  }

  public set frame(frame: AdvancementDisplayFrame) {
    this.display.frame = frame;
  }

  public get showToast() {
    return this.display.showToast || true;
  }

  public set showToast(showToast: boolean) {
    this.display.showToast = showToast;
  }

  public get announceToChat() {
    return this.display.announceToChat || true;
  }

  public set announceToChat(announceToChat: boolean) {
    this.display.announceToChat = announceToChat;
  }

  public get hidden() {
    return this.display.hidden || false;
  }

  public set hidden(hidden: boolean) {
    this.display.hidden = hidden;
  }

  public get experienceReward() {
    return this.rewards.experience || 0;
  }

  public set experienceReward(experience: number) {
    this.rewards.experience = experience;
  }

  public get functionReward() {
    return this.rewards.function;
  }

  public set functionReward(
    func: ResLocRef[ResourceType.Function] | undefined
  ) {
    this.rewards.function = func;
  }

  public get lootReward() {
    return this.rewards.loot || [];
  }

  public set lootReward(loot: ResLocRef[ResourceType.LootTable][]) {
    this.rewards.loot = loot;
  }

  public get recipeReward() {
    return this.rewards.recipes || [];
  }

  public set recipeReward(recipe: ResLocRef[ResourceType.Recipe][]) {
    this.rewards.recipes = recipe;
  }

  public get sendTelemetryData() {
    return this.constructedData.sendTelemetryData || false;
  }

  public set sendTelemetryData(sendTelemetryData: boolean) {
    this.constructedData.sendTelemetryData = sendTelemetryData;
  }

  public requireAnyOf(...requirements: AdvancementCondition[]) {
    const maxTries = 128;
    const requiredCriteria: IAdvancementCriteriaRef[] = requirements.map(
      (element) => {
        let name: IAdvancementCriteriaRef =
          `${element.id}` as IAdvancementCriteriaRef;
        for (let i = 0; i < maxTries; i++) {
          if (!this.constructedData.criteria[name]) {
            this.constructedData.criteria[name] = element.getCriteria();
            return name;
          }
          if (this.constructedData.criteria[name] === element.getCriteria())
            return name; //same criteria already added
          logger.warn(
            `Duplicate criteria name with different content found : ${name} , attempting to rename (might result in unexpected behavior)`
          );
          name = `${element.id}_${i}` as IAdvancementCriteriaRef;
        }
        console.error(
          `reached max tries(${maxTries}) for criteria name(${element.id})`
        );
        return name;
      }
    );
    this.constructedData.requirements.push(requiredCriteria);
    return this;
  }
}
