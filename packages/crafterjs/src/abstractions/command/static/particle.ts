import { ResLocRef, ResourceType, Position, Vector3 } from "@crafter-js/mc-schema";
import { CommandInstance } from "../commandInstance";
import {
  asRelativePosition,
  PositionToString,
  vector3ToString,
} from "../../conversions";

export interface IParticleParams {
  particle: ResLocRef[ResourceType.Particle] | `$(${string})`;
  delta: Vector3 | `$(${string})`;
  position?: Position | `$(${string})`;
  speed?: number | `$(${string})`;
  count?: number | `$(${string})`;
  force?: boolean | `$(${string})`;
  player?: string | `$(${string})`;
}

export function createParticle({
  particle,
  delta,
  position = asRelativePosition([0, 0, 0]),
  speed = 0,
  count = 1,
  force = false,
  player = "",
}: IParticleParams): CommandInstance {
  const positionStr =
    typeof position === "string" ? position : PositionToString(position);
  const deltaStr = typeof delta === "string" ? delta : vector3ToString(delta);
  const forceStr = force ? "force" : "normal";
  return new CommandInstance(
    `particle ${particle} ${positionStr} ${deltaStr} ${speed} ${count} ${forceStr} ${player}`
  );
}
