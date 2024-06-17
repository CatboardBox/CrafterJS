import { IRef, ResourceType, Position, Vector3 } from "../../../schema";
import { CommandInstance } from "../commandInstance";
import {
  AsRelativePosition,
  PositionToString,
  Vector3ToString,
} from "../../conversions";

export interface IParticleParams {
  particle: IRef[ResourceType.Particle];
  delta: Vector3;
  position?: Position;
  speed?: number;
  count?: number;
  force?: boolean;
  player?: string;
}

export function createParticle({
  particle,
  delta,
  position = AsRelativePosition([0, 0, 0]),
  speed = 0,
  count = 1,
  force = false,
  player = "",
}: IParticleParams): CommandInstance {
  const positionStr = PositionToString(position);
  const deltaStr = Vector3ToString(delta);
  const forceStr = force ? "force" : "normal";
  return new CommandInstance(
    `particle ${particle} ${positionStr} ${deltaStr} ${speed} ${count} ${forceStr} ${player}`
  );
}
