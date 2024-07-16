import { Namespace } from "./namespace";
import {
  IScoreboardRef,
  IScoreboardValueRef,
  ScoreboardObjectiveCriteria,
} from "../schema/minecraft";
import { forceSnakeCase } from "../util";
import { Command } from "./command";

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
    Command.createScoreboard(name, type, displayName).asStartupFunction(namespace);
  }

  public createVariable(name: string, hidden: boolean = true) {
    return new ScoreboardVariable(name, this, hidden);
  }
}

export class ScoreboardVariable {
  ref: IScoreboardValueRef;
  constructor(name: string, scoreboard: Scoreboard, hidden: boolean = true) {
    this.ref = `${hidden ? "#" : ""}${
      scoreboard.ref
    } ${name}` as IScoreboardValueRef;
  }
}
