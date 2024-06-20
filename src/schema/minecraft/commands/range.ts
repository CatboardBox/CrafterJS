export type RangeArgString =
  | `${number}`
  | `${number}..${number}`
  | `${number}..`
  | `..${number}`;
  export type RangeArg =
  | { max: number; min: undefined }
  | { min: number; max: undefined }
  | { min: number; max: number }
  | number
