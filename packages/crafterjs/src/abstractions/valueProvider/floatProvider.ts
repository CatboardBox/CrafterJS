import { FloatProviderType, IFloatProvider } from "@crafter-js/mc-schema";

const constant = (value: number): IFloatProvider => ({
  type: FloatProviderType.Constant,
  value,
});

const uniform = (
  min_inclusive: number,
  max_exclusive: number
): IFloatProvider => ({
  type: FloatProviderType.Uniform,
  min_inclusive,
  max_exclusive,
});
const clampedNormal = (
  mean: number,
  deviation: number,
  min: number,
  max: number
): IFloatProvider => ({
  type: FloatProviderType.ClampedNormal,
  mean,
  deviation,
  min,
  max,
});
const trapezoid = (
  min: number,
  max: number,
  plateau: number
): IFloatProvider => ({
  type: FloatProviderType.Trapezoid,
  min,
  max,
  plateau,
});

export const FloatProvider = {
  constant,
  uniform,
  clampedNormal,
  trapezoid,
};
