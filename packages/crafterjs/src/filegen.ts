import { promises as fs } from "fs";
import { logger } from "./logger";

const stuffToGenerate: Record<
  "datapack" | "resourcepack",
  {
    filesToGenerate: Record<string, string>;
    foldersToGenerate: Set<string>;
    filesToCopy: Record<string, string>;
  }
> = {
  datapack: {
    filesToGenerate: {},
    foldersToGenerate: new Set(),
    filesToCopy: {},
  },
  resourcepack: {
    filesToGenerate: {},
    foldersToGenerate: new Set(),
    filesToCopy: {},
  },
};


export const createFile = (
  category: "datapack" | "resourcepack",
  folder: string,
  file: string,
  content: string
) => {
  // log("Creating file", folder + file);
  const { filesToGenerate = {}, foldersToGenerate = new Set() } =
    stuffToGenerate[category];
  foldersToGenerate.add(folder);
  if (filesToGenerate[`${folder}/${file}`])
    throw new Error(`File ${folder}/${file} already exists`);
  filesToGenerate[`${folder}/${file}`] = content;
};

export const copyFile = (
  category: "datapack" | "resourcepack",
  from: string,
  to: string
) => {
  const { filesToCopy = {}, foldersToGenerate = new Set() } =
    stuffToGenerate[category];
  //get the folder
  const toFolder = to.substring(0, to.lastIndexOf("/"));
  foldersToGenerate.add(toFolder);
  if (filesToCopy[to]) throw new Error(`File ${to} already exists`);
  filesToCopy[to] = from;
};

export async function generateFiles(
  category: "datapack" | "resourcepack",
  rootFolder: string,
  deleteExisting: boolean = false
) {
  if (deleteExisting) {
    try {
      await fs.rm(rootFolder, { recursive: true });
    } catch (e) {
      // console.warn(e);
    }
  }

  const {
    filesToGenerate = {},
    foldersToGenerate = new Set(),
    filesToCopy = {},
  } = stuffToGenerate[category];
  logger.info( `Generating ${category}`);
  logger.info( `Queueing generation of ${foldersToGenerate.size} folders`);
  const generateFolders = Array.from(foldersToGenerate).map((folder) =>
    fs.mkdir(rootFolder + folder, { recursive: true })
  );
  await Promise.all(generateFolders);
  logger.info( `Generated ${foldersToGenerate.size} folders`);
  logger.info(
    
    `Queueing generation of ${Object.keys(filesToGenerate).length} files`
  );
  const generateFiles = Object.entries(filesToGenerate).map(
    ([path, content]) => {
      // log("Writing file", rootFolder + path);
      return fs.writeFile(rootFolder + path, content);
    }
  );
  logger.info( `Queueing copying of ${Object.keys(filesToCopy).length} files`);
  const copyFiles = Object.entries(filesToCopy).map(([to, from]) => {
    // log("Copying file", rootFolder + to);
    return fs.copyFile(from, rootFolder + to);
  });

  await Promise.all([...generateFiles, ...copyFiles]);
  logger.info( `Generated ${Object.keys(filesToGenerate).length} files | Copied ${Object.keys(filesToCopy).length} files`);
}
