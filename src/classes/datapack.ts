import { Colors, packMeta } from "../schema";
import { latestDatapackVersion } from "../info";
import { RootNamespace } from "./namespace";
import createFile, { generateFiles } from "../filegen";
import { forceSnakeCase } from "../util";

export class Datapack {
  private name: string;
  private pack_json: packMeta;
  private namepaces: Set<RootNamespace> = new Set();
  constructor(
    name: string,
    description: string,
    version: string,
    author: string
  ) {
    this.name = forceSnakeCase(name);
    this.pack_json = {
      pack: {
        pack_format: latestDatapackVersion,
        description: [
          {
            text: `${name} - ${version} by ${author}\n\n${description}`,
            color: Colors.White,
          },
        ],
      },
    };
  }

  public addNamespace(namespace: RootNamespace) {
    this.namepaces.add(namespace);
  }

  public build(
    folder: string = "./generated",
    {
      deleteExisting = false,
      debug = false,
    }: { deleteExisting?: boolean; debug?: boolean } = {}
  ) {
    if (debug) console.log("Building datapack", this.name);
    createFile("../", "pack.mcmeta", JSON.stringify(this.pack_json, null, 4));
    for (const namespace of this.namepaces) {
      namespace.build(debug);
    }
    if (debug) console.log("Generating files");
    generateFiles(`${folder}/${this.name}/data/`, deleteExisting);
  }
}
