/**
 * Used to test a value or a range of values (inclusive).
 */
export type INumberPredicate =
  | {
      min: number;
      max: number;
    }
  | number;