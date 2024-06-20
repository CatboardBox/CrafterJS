import { CommandInstance } from "../commandInstance";

export function createScoreboard(
  scoreboardName: string,
  scoreboardType: string = "dummy",
  displayName: string = ""
) {
  return new CommandInstance(
    `scoreboard objectives add ${scoreboardName} ${scoreboardType} ${displayName}`
  );
}

export function removeScoreboard(scoreboardName: string) {
  return new CommandInstance(`scoreboard objectives remove ${scoreboardName}`);
}

export function setScore(
  target: string,
  scoreboardName: string,
  score: number
) {
  return new CommandInstance(
    `scoreboard players set ${target} ${scoreboardName} ${score}`
  );
}

export function addScore(
  target: string,
  scoreboardName: string,
  score: number
) {
  return new CommandInstance(
    `scoreboard players add ${target} ${scoreboardName} ${score}`
  );
}

export function removeScore(
  target: string,
  scoreboardName: string,
  score: number
) {
  return new CommandInstance(
    `scoreboard players remove ${target} ${scoreboardName} ${score}`
  );
}

export function resetScore(target: string, scoreboardName: string) {
  return new CommandInstance(
    `scoreboard players reset ${target} ${scoreboardName}`
  );
}

export function enableTrigger(target: string, scoreboardName: string) {
  return new CommandInstance(
    `scoreboard players enable ${target} ${scoreboardName}`
  );
}

export function operation(
  target: string,
  targetObjective: string,
  operation: "+=" | "-=" | "*=" | "/=" | "%=" | "><" | ">" | "<" | "=",
  source: string,
  sourceObjective: string
) {
  return new CommandInstance(
    `scoreboard players operation ${target} ${targetObjective} ${operation} ${source} ${sourceObjective}`
  );
}
