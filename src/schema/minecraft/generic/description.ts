import { ITranslationKey } from "../ref";
import { JsonString } from "./jsonString";

interface description {
  translate: ITranslationKey;
  fallback?: JsonString;
}

export type IDescription = description | JsonString;
