import { TagRef, TagType } from "../ref";
import { IEntityPredicate } from "./entityPredicate";

export interface IDamageTypePredicate {
  direct_entity?: IEntityPredicate;
  source_entity?: IEntityPredicate;
  isDirect?: boolean;
  tags?: {
    id: TagRef[TagType.DamageType];
    expected?: boolean;
  };
}
