// import { Namespace } from "./namespace";
// import {
//   IScoreboardRef,
//   IScoreboardValueRef,
//   ScoreboardObjectiveCriteria,
// } from "../schema/minecraft";
// import { forceSnakeCase } from "../util";




// export class Scoreboard {
//   ref: IScoreboardRef;
//   constructor(
//     name: string,
//     displayName: string = name,
//     type: ScoreboardObjectiveCriteria,
//     namespace: Namespace
//   ) {
//     name = forceSnakeCase(name);
//     name = namespace.rootNamespace.id + "." + name;
//     this.ref = name as IScoreboardRef;
//     // const initCommand = `scoreboard objectives add ${name} ${type} "${displayName}"`;
//     // const removeCommand = `scoreboard objectives remove ${name}`;
//   }
// }

// export class ScoreboardVariable {
//   ref: IScoreboardValueRef;
//   constructor(name: string, scoreboard: Scoreboard, hidden: boolean = true) {
//     this.ref = `${hidden ? "#" : ""}${
//       scoreboard.ref
//     } ${name}` as IScoreboardValueRef;
//   }
// }
