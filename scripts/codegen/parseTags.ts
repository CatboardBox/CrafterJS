import * as fs from "fs/promises";

// spaghetti code :D

function snakeToPascal(str: string) {
  return str
    .split("_")
    .map((str) => {
      return upperFirst(str.split("/").map(upperFirst).join("/"));
    })
    .join("");
}

function upperFirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}

async function parseTags(
  name: string,
  tagType: string,
  depth: string[]
): Promise<string> {
  const additionalPathData = depth
    .splice(2)
    .map((str) => `"${str}"`)
    .join(",");
  name = name.replace(".json", "");
  return `export const ${name} = new BaseTag<TagType.${tagType}, ResourceType.${tagType}>(TagType.${tagType},"${name}", namespace,[${additionalPathData}]);`;
}

async function parseTagFolder(
  folderPath: string,
  outputPath: string,
  tagType: string,
  depth: string[] = []
): Promise<{ name: string; tagCount: number }> {
  const dir = await fs.readdir(folderPath);
  const directories: string[] = [];
  const files: string[] = [];

  const folderName = folderPath.split("/").slice(-1)[0];

  //   console.log(`Parsing ${[...depth, folderName].splice(2).join("/")}...`);

  (
    await Promise.all(
      dir.map(async (fileName) => {
        const stat = await fs.stat(`${folderPath}/${fileName}`);
        return { fileName, isDirectory: stat.isDirectory() };
      })
    )
  ).forEach(({ fileName, isDirectory }) => {
    if (isDirectory) {
      directories.push(fileName);
    } else {
      files.push(fileName);
    }
  });

  const directoryPromises = directories.map((directory) => {
    const tag = depth.length > 0 ? tagType : snakeToPascal(directory);
    return parseTagFolder(
      `${folderPath}/${directory}`,
      `${outputPath}/${directory}`,
      tag,
      [...depth, folderName]
    );
  });
  const filePromises: Promise<string>[] = files.map((file) =>
    parseTags(file, tagType, [...depth, folderName])
  );

  const directoryResults = await Promise.all(directoryPromises);
  const fileResults = await Promise.all(filePromises);

  let file = "";
  let count = fileResults.length;

  directoryResults.forEach(({ name, tagCount }) => {
    file += `export * as ${snakeToPascal(name)} from "./${name}";\n`;
    count += tagCount;
  });

  if (fileResults.length > 0) {
    file += `import { BaseTag } from "${"../".repeat(
      depth.length + 4
    )}abstractions/tag/BaseTag";\n`;
    file += `import { ResourceType, TagType } from "${"../".repeat(
      depth.length + 4
    )}schema";\n`;

    file += `import { namespace } from "${"../".repeat(
      depth.length + 2
    )}namespace";`;

    file += "\n\n";

    fileResults.forEach((result) => {
      file += result + "\n";
    });
  }

  await fs.mkdir(`${outputPath}`, { recursive: true });
  await fs.writeFile(`${outputPath}/index.ts`, file);

  return {
    name: folderName,
    tagCount: count,
  };
}

export default async function Main(inputPath: string, outputPath: string) {
  const { tagCount } = await parseTagFolder(
    `${inputPath}/tags`,
    `${outputPath}/tags`,
    ""
  );
  console.log(`Parsed ${tagCount} tags!`);
}
