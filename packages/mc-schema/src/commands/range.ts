export type RangeArgString =
  | `${number}`
  | `${number}..${number}`
  | `${number}..`
  | `..${number}`;
  export type RangeArg =
  | { max: number; min?: never }
  | { min: number; max?: never }
  | { min: number; max: number }
  | number;

