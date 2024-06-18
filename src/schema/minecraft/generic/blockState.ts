import { ResLocRef, ResourceType } from "../ref";

export type IBlockStatePropertyKey = string & {
  readonly __blockStatePropertyKeyBrand: unique symbol;
};
export type IBlockStatePropertyValue = string & {
  readonly __blockStatePropertyValueBrand: unique symbol;
};
type GeneratePropertyValueOfKey<T extends IBlockStatePropertyKey> =
  IBlockStatePropertyValue & {
    readonly __specificPropertyValueBrand: T;
  };

export type IBlockStatePropertyValueOfKey = {
  [K in IBlockStatePropertyKey]: GeneratePropertyValueOfKey<K>;
};
export type IBlockStateProperties = {
  [P in IBlockStatePropertyKey]: IBlockStatePropertyValueOfKey[P];
};

export type IBlockStatePropertiesPredicate = {
  [P in IBlockStatePropertyKey]:
    | IBlockStatePropertyValueOfKey[P]
    | { min: IBlockStatePropertyValueOfKey[P]; max: IBlockStatePropertyValueOfKey[P] };
};

export interface IBlockState {
  name: ResLocRef[ResourceType.Block];

  /**
   * (Optional) Block state property key-value pair. The property must be possessed by the specified block.
   * Unspecified properties of the specified block will be set to their default values.
   */
  properties?: IBlockStateProperties;
}
