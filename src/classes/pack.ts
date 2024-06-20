import { Colors, packMeta } from "../schema";
import { latestDatapackVersion, latestResourcepackVersion } from "../info";
import { RootNamespace } from "./namespace";
import { generateFiles, createFile } from "../filegen";
import { forceSnakeCase } from "../util";
import { logger } from "../logger";

interface BuildOptions {
  outputFolder?: string;
}

interface MiscOptions {
  deleteExisting?: boolean;
  debug?: boolean;
}

export class Pack {
  private name: string;
  private datapack_json: packMeta;
  private resourcepack_json: packMeta;
  private namepaces: Set<RootNamespace> = new Set();
  constructor(
    name: string,
    description: string,
    version: string,
    author: string
  ) {
    this.name = forceSnakeCase(name);
    this.datapack_json = {
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
    this.resourcepack_json = {
      pack: {
        pack_format: latestResourcepackVersion,
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
    {
      datapackOptions,
      resourcepackOptions,
    }: {
      datapackOptions: BuildOptions;
      resourcepackOptions: BuildOptions;
    },
    miscOptions?: MiscOptions
  ) {
    this.buildDatapack(datapackOptions, miscOptions);
    this.buildResourcepack(resourcepackOptions, miscOptions);
  }

  public buildResourcepack(
    buildOptions: BuildOptions,
    { deleteExisting = true, debug = false }: MiscOptions = {
      deleteExisting: true,
      debug: false,
    }
  ) {
    const outputFolder = buildOptions.outputFolder || "output/resourcepack";
    this.buildNamespaces(debug);
    logger(debug, "Generating resourcepack files");
    createFile(
      "resourcepack",
      "../",
      "pack.mcmeta",
      JSON.stringify(this.resourcepack_json, null, 4)
    );
    generateFiles(
      "resourcepack",
      `${outputFolder}/${this.name}/assets/`,
      deleteExisting
    );
  }

  public buildDatapack(
    buildOptions: BuildOptions,
    { deleteExisting = true, debug = false }: MiscOptions = {
      deleteExisting: true,
      debug: false,
    }
  ) {
    const outputFolder = buildOptions.outputFolder || "output/datapack";
    this.buildNamespaces(debug);
    logger(debug, "Generating datapack files");
    createFile(
      "datapack",
      "../",
      "pack.mcmeta",
      JSON.stringify(this.datapack_json, null, 4)
    );
    generateFiles(
      "datapack",
      `${outputFolder}/${this.name}/data/`,
      debug,
      deleteExisting
    );
  }

  private isBuilt: boolean = false;
  private buildNamespaces(debug: boolean = false) {
    if (this.isBuilt) return;
    this.isBuilt = true;
    logger(debug, "Building pack", this.name);
    for (const namespace of this.namepaces) {
      namespace.build(debug);
    }
  }
}
