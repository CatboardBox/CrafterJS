import { ResLocRef, ResourceType } from "@crafter-js/mc-schema";
import { Namespace } from "../namespace";
import { asInlineFunction } from "./asInlineFn";
import { asStartupFunction } from "./asStartupFunction";
// function PositionArgBuilder<T>(returnType: (position: IPosition) => T) {
//   function AtAbsolutePosition(x: number, y: number, z: number): T {
//     return returnType([x, y, z]);
//   }

//   function AtRelativePosition(x: number, y: number, z: number): T {
//     return returnType([`~${x}`, `~${y}`, `~${z}`]);
//   }

//   function AtCustomPosition(
//     x: number | string,
//     y: number | string,
//     z: number | string
//   ): T {
//     return returnType([x, y, z]);
//   }

//   return { AtAbsolutePosition, AtRelativePosition, AtCustomPosition };
// }

export class CommandInstance {
  public readonly isMacro: boolean;
  public readonly command: string;
  constructor(command: string , isMacro: boolean = false) {
    this.command = command;
    this.isMacro = isMacro;
  }

  public asInlineFunction(
    namespace: Namespace
  ): ResLocRef[ResourceType.Function] {
    return asInlineFunction(this, namespace);
  }

  public asStartupFunction(namespace: Namespace) {
    asStartupFunction(this, namespace);
  }
}
