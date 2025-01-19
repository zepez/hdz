import { removeFiles as removeFilesCmd } from "~/lib/cmd/file";
import type { Options } from "~/lib/types";

export const removeFiles = async (options: Pick<Options, "path">) => {
  console.log("Action: HDZero Remove Files");
  await removeFilesCmd(options.path);
};
