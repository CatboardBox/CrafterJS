import { Colors } from "./generic";

export interface packMeta {
  pack: {
    pack_format: number;
    description: [
      {
        text: string;
        color: Colors;
      }
    ];
  };
}
