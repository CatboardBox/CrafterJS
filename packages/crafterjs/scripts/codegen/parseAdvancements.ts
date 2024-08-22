import * as fs from "fs/promises";
import { snakeToCamel } from "../Util";

const folder = "advancement";

async function parse(file: string, name: string): Promise<string> {
  const data = await fs.readFile(file, "utf-8");
  name = name.replace(".json", "");
  return `export const ${snakeToCamel(
    name
  )} = new ExistingAdvancement("${name}", namespace, ${data});`;
}

export default async function main(inputPath: string, outputPath: string) {
  const dir = await fs.readdir(`${inputPath}/${folder}`);

  await fs.mkdir(`${outputPath}/${folder}`, { recursive: true });

  const promises = dir
    .filter((file) => file !== "recipes")
    .map((file) =>
      parseAdvancementGroup(
        `${inputPath}/${folder}`,
        `${outputPath}/${folder}`,
        file
      )
    );

  const advancements = await Promise.all(promises);

  const count = advancements.reduce((acc, val) => acc + val, 0);

  console.log(`Parsed ${count} advancements!`);
}

async function parseAdvancementGroup(
  inputPath: string,
  outputPath: string,
  currentDir: string
) {
  const dir = await fs.readdir(`${inputPath}/${currentDir}`);

  const promises = dir.map((file) =>
    parse(`${inputPath}/${currentDir}/${file}`, file)
  );

  const outputFile = `${outputPath}/${currentDir}.ts`;
  let file = `import { ExistingAdvancement } from "../../../../abstractions/advancements/existing";
import { NestedNamespace } from "../../../../abstractions/namespace";
import { namespace as prevNamespace } from "../../namespace";\n
const namespace = new NestedNamespace("${currentDir}",prevNamespace)\n`;

  const advancements = await Promise.all(promises);

  advancements.forEach((advancement) => {
    file += advancement + "\n\n\n";
  });

  await fs.writeFile(outputFile, file);
  return advancements.length;
}
