import { INumberPredicate } from "./misc";

export interface IEffectPredicate {
  /**
   * Test the effect's amplifier. Level I is represented by 0.
   * Use an object with  min and  max to test for a range of values (inclusive).
   */
  amplifier?: INumberPredicate;
  /**
   * Test if the effect's remaining time (in ticks). Test if the effect's remaining time (in ticks) is between two numbers, inclusive.
   * Use an object with  min and  max to test for a range of values (inclusive).
   */
  duration?: INumberPredicate;
  /**
   * Test whether the effect is from a beacon.
   */
  ambient?: boolean;
  /**
   * Test whether the effect is from a beacon.
   */
  visible?: boolean;
}
