import arg from "arg";

import packages from "./packages.json" assert { type: "json" };
import { getIcons } from "./get-icons";
import { prepareDist, writeLibFiles } from "./lib-files";
import { writeWebFiles } from "./web-files";
import { supportedArgs } from "./constants";
import { PackAttachedIcons } from "./types";

function isolatePack(shortName: string, isolateBy: string): boolean {
  return shortName === isolateBy;
}

function getArgs() {
  const args = arg({
    [supportedArgs.ISOLATE]: String,
    [supportedArgs.WEB]: Boolean,
  });

  return {
    isIsolate: args[supportedArgs.ISOLATE],
    buildWeb: args[supportedArgs.WEB],
  };
}

async function main() {
  const { isIsolate, buildWeb } = getArgs();

  await prepareDist();

  const coditionalPack =
    typeof isIsolate === "string"
      ? packages.filter((pack) => isolatePack(pack.shortName, isIsolate))
      : packages;

  const attachedFiles: PackAttachedIcons[] = await Promise.all(
    coditionalPack.map(async (pack) => ({
      ...pack,
      icons: await getIcons(pack),
    }))
  );

  writeLibFiles(attachedFiles);

  if (buildWeb) writeWebFiles(attachedFiles);
}

main();
