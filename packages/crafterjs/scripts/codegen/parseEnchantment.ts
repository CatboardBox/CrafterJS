import * as fs from "fs/promises";
import { snakeToCamel } from "../Util";

async function parse(file: string, name: string): Promise<string> {
  const data = await fs.readFile(file, "utf-8");
  name = name.replace(".json", "");
  return `export const ${snakeToCamel(name)} = Enchantment.constructFromRaw("${name}", namespace, ${data});`;
}

export default async function main(inputPath: string, outputPath: string) {
  const dir = await fs.readdir(`${inputPath}/enchantment`);

  const promises = dir.map((file) =>
    parse(`${inputPath}/enchantment/${file}`, file)
  );

  const outputFile = `${outputPath}/enchantment.ts`;
  let file = `import { Enchantment } from "../../../abstractions/enchantment";\nimport { namespace } from "../namespace";\n\n`;

  const enchantments = await Promise.all(promises);

  enchantments.forEach((recipe) => {
    file += recipe + "\n\n\n";
  });

  await fs.mkdir(outputPath, { recursive: true });
  await fs.writeFile(outputFile, file);
  console.log(`Parsed ${enchantments.length} enchantments!`);
}
