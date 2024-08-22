import { TextureRef, TextureType } from "../ref/texture";

export interface IItemModel {
  parent: "minecraft:item/generated";
  textures: {
    layer0: TextureRef[TextureType.Item];
  };

  overrides: {
    predicate: { custom_model_data: number };
    model: string;
  }[];
}
