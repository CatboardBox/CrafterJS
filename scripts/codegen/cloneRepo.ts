import { execSync } from "child_process";
import * as fs from "fs";

export function CloneRepo(cloneDir: string) {
  const repoUrl = "https://github.com/misode/mcmeta.git";
  const branchName = "data";

  if (fs.existsSync(cloneDir)) {
    console.log("Repository already cloned. Fetching latest changes...");
    execSync(`git -C ${cloneDir} fetch`, { stdio: "inherit" });
    console.log(`Checking out branch ${branchName}...`);
    execSync(`git -C ${cloneDir} checkout ${branchName}`, { stdio: "inherit" });
    console.log("Pulling latest changes...");
    execSync(`git -C ${cloneDir} pull origin ${branchName}`, {
      stdio: "inherit",
    });
  } else {
    console.log(`Cloning branch ${branchName}...`);
    execSync(`git clone --branch ${branchName} ${repoUrl} ${cloneDir}`, {
      stdio: "inherit",
    });
  }

  console.log("Repository clone/pull complete.");
}
