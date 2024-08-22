import { ScoreboardObjectiveCriteria } from "@crafter-js/mc-schema";
import { Scoreboard } from "../../scoreboard";
import { CommandInstance } from "../commandInstance";

export function createScoreboard(
  scoreboardName: string,
  scoreboardType: ScoreboardObjectiveCriteria = ScoreboardObjectiveCriteria.Dummy,
  displayName: string = ""
) {
  return new CommandInstance(
    `scoreboard objectives add ${scoreboardName} ${scoreboardType} "${displayName}"`
  );
}

export function removeScoreboard(scoreboard: Scoreboard) {
  return new CommandInstance(`scoreboard objectives remove ${scoreboard.ref}`);
}

export function setScore(
  target: string,
  scoreboard: Scoreboard,
  score: number
) {
  return new CommandInstance(
    `scoreboard players set ${target} ${scoreboard.ref} ${score}`
  );
}

export function addScore(
  target: string,
  scoreboard: Scoreboard,
  score: number
) {
  return new CommandInstance(
    `scoreboard players add ${target} ${scoreboard.ref} ${score}`
  );
}

export function removeScore(
  target: string,
  scoreboard: Scoreboard,
  score: number
) {
  return new CommandInstance(
    `scoreboard players remove ${target} ${scoreboard.ref} ${score}`
  );
}

export function resetScore(target: string, scoreboard: Scoreboard) {
  return new CommandInstance(
    `scoreboard players reset ${target} ${scoreboard.ref}`
  );
}

export function enableTrigger(target: string, scoreboard: Scoreboard) {
  return new CommandInstance(
    `scoreboard players enable ${target} ${scoreboard.ref}`
  );
}

export function operation(
  target: string,
  targetScoreboard: Scoreboard,
  operation: "+=" | "-=" | "*=" | "/=" | "%=" | "><" | ">" | "<" | "=",
  source: string,
  sourceScoreboard: Scoreboard
) {
  return new CommandInstance(
    `scoreboard players operation ${target} ${targetScoreboard.ref} ${operation} "${source}" ${sourceScoreboard.ref}`
  );
}
