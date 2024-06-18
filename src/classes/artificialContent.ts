import { IResLocRef } from "../schema";
import { ContentGenerator } from "./content";

let CurrentCustomModelDataIndex = 0;

/**
 * Fake content using WorkArounds
 * EXPERIMENTAL
 * @inheritdoc
 */
export abstract class ArtificialContentGenerator<
  UnderlyingLocRef extends IResLocRef,
  DataType = Record<string, unknown>
> extends ContentGenerator<UnderlyingLocRef, DataType> {}
