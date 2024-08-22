import { Namespace } from "./namespace";
import {
  IScoreboardRef,
  IScoreboardValueRef,
  ScoreboardObjectiveCriteria,
} from "@crafter-js/mc-schema";
import { forceSnakeCase } from "../util";
import { Command, CommandInstance } from "./command";
import { EntitySelector } from "./entitySelector";

export class Scoreboard {
  ref: IScoreboardRef;
  constructor(
    name: string,
    displayName: string = name,
    type: ScoreboardObjectiveCriteria,
    namespace: Namespace
  ) {
    name = forceSnakeCase(name);
    name = namespace.rootNamespace.id + "." + name;
    this.ref = name as IScoreboardRef;
    Command.createScoreboard(name, type, displayName).asStartupFunction(
      namespace
    );
  }

  public createVariable(name: string, hidden: boolean = true) {
    return new ScoreboardVariable(hidden ? `"#${name}"` : `"${name}"`, this);
  }
  public createEntityVariable(entity: EntitySelector) {
    return new ScoreboardVariable(entity.build(), this);
  }
}

export class ScoreboardVariable {
  readonly ref: IScoreboardValueRef;
  readonly name: string;
  readonly scoreboard: Scoreboard;
  constructor(name: string, scoreboard: Scoreboard) {
    this.name = name;
    this.ref = `${name} ${scoreboard.ref}` as IScoreboardValueRef;
    this.scoreboard = scoreboard;
  }

  public add(value: number): CommandInstance {
    return Command.addScore(this.name, this.scoreboard, value);
  }

  public remove(value: number): CommandInstance {
    return Command.removeScore(this.name, this.scoreboard, value);
  }

  public set(value: number): CommandInstance {
    return Command.setScore(this.name, this.scoreboard, value);
  }
}
