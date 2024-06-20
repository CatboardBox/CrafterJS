import { FullVector3, Position, RangeArg, RangeArgString, Vector3 } from "../schema";

export const PositionToString = (position: Position) =>
  `${position[0]} ${position[1]} ${position[2]}`;

export function expandVector3(vector: Vector3): FullVector3 {
  if (typeof vector === "number") return [vector, vector, vector];
  return vector;
}

export function Vector3ToString(vector: Vector3) {
  vector = expandVector3(vector);
  return `${vector[0]} ${vector[1]} ${vector[2]}`;
}

export function AsRelativePosition(vector: Vector3): Position {
  vector = expandVector3(vector);
  return [`~${vector[0]}`, `~${vector[1]}`, `~${vector[2]}`];
}

export function asRange(
  range:RangeArg
): RangeArgString {
  return typeof range === "number"
    ? `${range}`
    : (`${range.min ?? ""}..${range.max ?? ""}` as RangeArgString);
}
