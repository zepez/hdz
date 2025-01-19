import { checkbox } from "@inquirer/prompts";
import {
  listFiles,
  createDirectory,
  copyFiles as CopyFilesCmd,
} from "~/lib/cmd/file";
import type { Options } from "~/lib/types";

export const copyFiles = async (
  options: Pick<Options, "volume" | "output">,
) => {
  console.log("Action: HDZero Copy Files");

  const allFiles = await listFiles(options.volume);

  if (allFiles.length > 0) {
    createDirectory(options.output);

    const files: string[] = await checkbox({
      message: "Select files to copy",
      choices: allFiles,
    });

    for (const file of files) {
      await CopyFilesCmd(`${options.volume}/${file}`, `${options.output}`);
    }

    return files;
  } else {
    console.log(`No files present in ${options.volume}`);
    return [];
  }
};
