import {
  FullVector3,
  Position,
  RangeArg,
  RangeArgString,
  Vector3,
} from "../schema";

export const PositionToString = (position: Position) =>
  `${position[0]} ${position[1]} ${position[2]}`;

export function expandVector3(vector: Vector3): FullVector3 {
  if (typeof vector === "number") return [vector, vector, vector];
  return vector;
}

export function vector3ToString(vector: Vector3) {
  vector = expandVector3(vector);
  return `${vector[0]} ${vector[1]} ${vector[2]}`;
}

export function asRelativePosition(vector: Vector3): Position {
  vector = expandVector3(vector);
  return [`~${vector[0]}`, `~${vector[1]}`, `~${vector[2]}`];
}

export function asRange(range: RangeArg): RangeArgString {
  if (typeof range === "number") return `${range}`;
  if (range.min !== undefined && range.max !== undefined)
    return `${range.min}..${range.max}`;
  if (range.min !== undefined) return `${range.min}..`;
  if (range.max !== undefined) return `..${range.max}`;
  throw new Error("Invalid range");
}
