import { IResLocRef } from "@crafter-js/mc-schema";
import { ContentGenerator } from "../content";

// let CurrentCustomModelDataIndex = 0;

/**
 * Fake content using WorkArounds
 * EXPERIMENTAL
 * @inheritdoc
 */
export abstract class ArtificialContentGenerator<
  UnderlyingLocRef extends IResLocRef,
  DataType = Record<string, unknown>
> extends ContentGenerator<UnderlyingLocRef, DataType> {
  protected build(): void {
    //skip nothing to build
  }
}

// custom model json goes to assets/minecraft/models/item/base_item.json
/*
{
  "parent": "minecraft:item/generated",
  "textures": {
    "layer0": "minecraft:item/acacia_boat"
  }
    "overrides": [
    { "predicate": { "custom_model_data": 1 }, "model": "namespace:item/new_item" },
    { "predicate": { "custom_model_data": 2 }, "model": "namespace:item/new_item0" }
}
*/

// texture goes to assets/namespace/textures/item/new_item.png
// texture goes to assets/namespace/textures/item/new_item0.png
