import { IRef } from "./resource";

export type IAssetRef = IRef & {
  readonly __assetRefBrand: unique symbol;
};

export type ITranslationKey = IRef & {
  readonly __translationKeyBrand: unique symbol;
};

export type IAttributeRef = IRef & {
  readonly __attributeRefBrand: unique symbol;
};

export type IAdvancementCriteriaRef = IRef & {
  readonly __advancementCriteriaRefBrand: unique symbol;
};

export type IPlayerStatisticRef = IRef & {
  readonly __playerStatisticRefBrand: unique symbol;
};