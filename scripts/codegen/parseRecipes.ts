import * as fs from "fs/promises";

async function parseRecipe(file: string, name: string): Promise<string> {
  const data = await fs.readFile(file, "utf-8");
  name = name.replace(".json", "");
  return `export const ${name} = new ExistingRecipe("${name}", namespace, ${data});`;
}

export default async function Main(inputPath: string, outputPath: string) {
  const dir = await fs.readdir(`${inputPath}/recipe`);

  const promises = dir.map((file) =>
    parseRecipe(`${inputPath}/recipe/${file}`, file)
  );

  const outputFile = `${outputPath}/recipe.ts`;
  let file = `import { ExistingRecipe } from "../../../abstractions/recipe/existingRecipe";\nimport { namespace } from "../namespace";\n\n`;

  const recipes = await Promise.all(promises);

  recipes.forEach((recipe) => {
    file += recipe + "\n\n\n";
  });

  await fs.mkdir(outputPath, { recursive: true });
  await fs.writeFile(outputFile, file);
  console.log(`Parsed ${recipes.length} recipes!`);
}
