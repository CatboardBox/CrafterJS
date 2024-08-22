import * as fs from "fs/promises";
import { snakeToCamel } from "../Util";


const folder = 'recipe'

async function parse(file: string, name: string): Promise<string> {
  const data = await fs.readFile(file, "utf-8");
  name = name.replace(".json", "");
  return `export const ${snakeToCamel(name)} = new ExistingRecipe("${name}", namespace, ${data});`;
}

export default async function main(inputPath: string, outputPath: string) {
  const dir = await fs.readdir(`${inputPath}/${folder}`);

  const promises = dir.map((file) =>
    parse(`${inputPath}/${folder}/${file}`, file)
  );

  const outputFile = `${outputPath}/recipe.ts`;
  let file = `import { ExistingRecipe } from "../../../abstractions/recipe/existing";\nimport { namespace } from "../namespace";\n\n`;

  const recipes = await Promise.all(promises);

  recipes.forEach((recipe) => {
    file += recipe + "\n\n\n";
  });

  await fs.mkdir(outputPath, { recursive: true });
  await fs.writeFile(outputFile, file);
  console.log(`Parsed ${recipes.length} recipes!`);
}
