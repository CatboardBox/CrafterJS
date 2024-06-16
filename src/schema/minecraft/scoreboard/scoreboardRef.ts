import { IResourceRef } from "../ref";

export type IScoreboardRef = IResourceRef & {
  readonly __scoreboardBrand: unique symbol;
};
export type IScoreboardValueRef = IResourceRef & {
  readonly __scoreboardValueBrand: unique symbol;
};
