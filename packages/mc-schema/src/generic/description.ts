import { JsonText } from "../jsonText";
import { ITranslationKey } from "../ref";

interface description {
  translate: ITranslationKey;
  fallback?: JsonText;
}

export type IDescription = description | JsonText;
