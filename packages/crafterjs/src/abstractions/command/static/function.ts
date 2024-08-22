import { ResLocRef, ResourceType } from "@crafter-js/mc-schema";
import { CommandInstance } from "../commandInstance";

export function runFunction(funRef: ResLocRef[ResourceType.Function]) {
  return new CommandInstance(`function ${funRef}`);
}