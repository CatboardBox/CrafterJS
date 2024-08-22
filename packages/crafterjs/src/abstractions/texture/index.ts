// // EXPERIMENTAL

// import { copyFile, createFile } from "../../filegen";
// import { logger } from "../../logger";
// import { IItemModel } from "../../schema/minecraft/model/item";
// import {
//   ModelType,
//   ResourceTextureType,
//   TextureRef,
//   TextureType,
// } from "../../schema/minecraft/ref/texture";
// import { forceSnakeCase, prettyString } from "../../util";
// import { EventType, Namespace } from "../namespace";

// export interface IReference {
//   ref: string;
// }

// interface ICustomItemModelGeneratorConstructor {
//   item: TextureRef[TextureType.Item];
//   namespace: Namespace;
//   /**
//    * The priority of the build event;
//    * should not effect on build result, mainly for debug order
//    */
//   buildPriority?: number;
// }

// let customModelDataIndex = 10000;
// /**
//  * When creating content, please ensure that the file in which the content is generated gets imported eventually
//  *
//  * pros : stuff that you dont need (unused references) are not generated
//  *
//  * cons : you have to import the file manually (or use a script to do it for you)
//  */
// export class CustomItemModelGenerator {
//   public readonly displayName: string;
//   private readonly resourceType: string[];
//   protected readonly namespace: Namespace;

//   private readonly item: TextureRef[TextureType.Item];
//   private readonly jsonData: IItemModel;

//   constructor({
//     item,
//     namespace,
//     buildPriority,
//   }: ICustomItemModelGeneratorConstructor) {
//     this.item = item;
//     this.namespace = namespace;
//     this.resourceType = [ResourceTextureType.Models, ModelType.Item];
//     const displaytype = this.resourceType.join("/").toLocaleUpperCase();
//     this.displayName = `[${prettyString(displaytype, 12)}] ${this.item}`;

//     this.jsonData = {
//       parent: "minecraft:item/generated",
//       textures: {
//         layer0: this.item,
//       },
//       overrides: [],
//     };

//     namespace.events[EventType.Build].addListener(
//       () => this.build(),
//       buildPriority
//     );
//   }
//   public addTexture(
//     texturePath: string,
//     textureName: string = `${this.item}(${this.jsonData.overrides.length})`
//   ): number {
//     const newPath = `${this.namespace.rootNamespace.folderPath()}/textures/item/${forceSnakeCase(
//       textureName
//     )}`;
//     const textureFileType = texturePath.split(".").pop();
//     const index = customModelDataIndex++;
//     this.jsonData.overrides.push({
//       predicate: { custom_model_data: index },
//       model: newPath + `_${index}.${textureFileType}`,
//     });
//     copyFile(
//       "resourcepack",
//       `src/${this.namespace.folderPath()}${texturePath}`,
//       newPath + `.${textureFileType}`
//     );
//     return customModelDataIndex;
//   }

//   private build(): void {
//     logger.info(`${this.namespace.displayName} -> ${this.displayName}`);
//     // write to namespace:item.json

//     // this.validate();
//     // const fileExtension = this.fileExt;
//     // const content = this.compileContent();
//     createFile(
//       "resourcepack",
//       `minecraft/models/item`,
//       `${this.item}.json`,
//       JSON.stringify(this.jsonData)
//     );
//   }
// }
