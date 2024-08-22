type numberOrString = number | `~${number}`;
export type Position =
  | [numberOrString, numberOrString, numberOrString]
  | [`^${number}`, `^${number}`, `^${number}`]; //^ cannot be used with ~ or numbers directly
export type FullVector3 = [number, number, number];
export type PartialVector = number;
export type Vector3 = FullVector3 | PartialVector;
export type Range<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N ? Acc[number] : Range<N, [...Acc, Acc["length"]]>;

export type RangeInclusive<N extends number> = Range<N> | N;
