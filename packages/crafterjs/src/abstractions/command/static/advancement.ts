import { Advancement } from "../../advancements/advancement";
import { AdvancementCondition } from "../../advancements/condition";
import { EntitySelector } from "../../entitySelector";
import { CommandFactory } from "../CommandBuilder";
import { CommandInstance } from "../commandInstance";

// First step in the command chain for advancements.
class AdvancementCommandFactory extends CommandFactory {
  grant(): AdvancementEntityFactory {
    return new AdvancementEntityFactory(this.commandBuilder.append("grant"));
  }

  revoke(): AdvancementEntityFactory {
    return new AdvancementEntityFactory(this.commandBuilder.append("revoke"));
  }

  typeAsMacro(key: string): AdvancementEntityFactory {
    return new AdvancementEntityFactory(this.commandBuilder.appendMacro(key));
  }
}

// Next step to specify the target entity.
class AdvancementEntityFactory extends CommandFactory {
  entity(entity: EntitySelector): AdvancementScopeFactory {
    return new AdvancementScopeFactory(this.commandBuilder.append(entity.build()));
  }

  entityAsMacro(key: string): AdvancementScopeFactory {
    return new AdvancementScopeFactory(this.commandBuilder.appendMacro(key));
  }
}

// Specifies the scope of the advancement command.
class AdvancementScopeFactory extends CommandFactory {
  everything(): CommandInstance {
    return this.commandBuilder.append("everything").toCommandInstance();
  }

  from(advancement: Advancement): CommandInstance {
    return this.commandBuilder.append("from").append(advancement.ref).toCommandInstance();
  }

  through(advancement: Advancement): CommandInstance {
    return this.commandBuilder.append("through").append(advancement.ref).toCommandInstance();
  }

  until(advancement: Advancement): CommandInstance {
    return this.commandBuilder.append("until").append(advancement.ref).toCommandInstance();
  }

  only(advancement: Advancement): AdvancementCriterionFactory {
    return new AdvancementCriterionFactory(this.commandBuilder.append("only").append(advancement.ref));
  }
}

// Final step to specify criteria for the command.
class AdvancementCriterionFactory extends CommandFactory {
  criterion(criterion: AdvancementCondition): CommandInstance {
    return this.commandBuilder.append(criterion.id).toCommandInstance();
  }
}

// Entry point for building advancement commands.
export const advancement = new AdvancementCommandFactory("advancement");
