import { ResLocRef, ResourceType } from "../../../schema";
import { CommandInstance } from "../commandInstance";

export function runFunction(funRef: ResLocRef[ResourceType.Function]) {
  return new CommandInstance(`function ${funRef}`);
}