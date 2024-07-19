import { CloneRepo } from "./cloneRepo";
import * as path from "path";

const cloneDir = path.resolve(__dirname, "../temp/repo");
CloneRepo(cloneDir);
console.log();

const datapackDir = `${cloneDir}/data/minecraft`;
const generatedDir = path.resolve(
  __dirname,
  "../../src/providedNamespaces/minecraft/generated"
);

const promises: Array<Promise<unknown>> = [];

import ParseRecipes from "./parseRecipes";
promises.push(ParseRecipes(datapackDir, generatedDir));


import ParseTags from "./parseTags";
promises.push(ParseTags(datapackDir, generatedDir));


Promise.all(promises).then(() => {
  console.log("Codegen Completed!");
});
