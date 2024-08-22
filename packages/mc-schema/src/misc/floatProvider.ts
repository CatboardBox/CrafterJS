export enum FloatProviderType {
  Constant = "constant",
  Uniform = "uniform",
  ClampedNormal = "clamped_normal",
  Trapezoid = "trapezoid",
}

export type IFloatProvider =
  | {
      type: FloatProviderType.Constant;
      value: number;
    }
  | {
      type: FloatProviderType.Uniform;
      min_inclusive: number;
      /**
       * Must be larger than  min_inclusive.
       */
      max_exclusive: number;
    }
  | {
      type: FloatProviderType.ClampedNormal;
      mean: number;
      deviation: number;
      min: number;
      /**
       *  Must be larger than min.
       */
      max: number;
    }
  | {
      type: FloatProviderType.Trapezoid;
      min: number;
      max: number;
      /**
       * The range in the middle of the trapezoid distribution that has a uniform distribution.
       * Must be less than or equal to `max - min`
       */
      plateau: number;
    };
