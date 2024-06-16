import {promises as fs} from "fs";

const filesToGenerate: Record<string, string> = {};

const foldersToGenerate: Set<string> = new Set();

const createFile = (folder: string, file: string, content: string) => {
  // console.log("Creating file", folder + file);
  foldersToGenerate.add(folder);
  if (filesToGenerate[`${folder}/${file}`])
    throw new Error(`File ${folder}/${file} already exists`);
  filesToGenerate[`${folder}/${file}`] = content;
};

export default createFile;

export async function generateFiles(
  rootFolder: string,
  deleteExisting: boolean = false
) {
  if (deleteExisting) {
    try {
      await fs.rm(rootFolder, { recursive: true });
    } catch (e) {
      console.warn(e);
    }
  }
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
