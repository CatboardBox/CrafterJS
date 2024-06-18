import { promises as fs } from "fs";

const stuffToGenerate: Record<
  "datapack" | "resourcepack",
  {
    filesToGenerate: Record<string, string>;
    foldersToGenerate: Set<string>;
  }
> = {
  datapack: {
    filesToGenerate: {},
    foldersToGenerate: new Set(),
  },
  resourcepack: {
    filesToGenerate: {},
    foldersToGenerate: new Set(),
  },
};

const createFile = (
  category: "datapack" | "resourcepack",
  folder: string,
  file: string,
  content: string
) => {
  // console.log("Creating file", folder + file);
  const { filesToGenerate = {}, foldersToGenerate = new Set() } =
    stuffToGenerate[category];
  foldersToGenerate.add(folder);
  if (filesToGenerate[`${folder}/${file}`])
    throw new Error(`File ${folder}/${file} already exists`);
  filesToGenerate[`${folder}/${file}`] = content;
};

export default createFile;

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

  const { filesToGenerate = {}, foldersToGenerate = new Set() } =
    stuffToGenerate[category];

  const generateFolders = Array.from(foldersToGenerate).map((folder) =>
    fs.mkdir(rootFolder + folder, { recursive: true })
  );
  await Promise.all(generateFolders);
  const generateFiles = Object.entries(filesToGenerate).map(
    ([path, content]) => {
      // console.log("Writing file", rootFolder + path);
      return fs.writeFile(rootFolder + path, content);
    }
  );
  await Promise.all(generateFiles);
}
