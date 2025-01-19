import { tsToMp4 } from "~/lib/cmd/ffmpeg";
import { listFiles, removeFile } from "~/lib/cmd/file";
import type { Options } from "~/lib/types";

export const processMedia = async (options: Pick<Options, "path">) => {
  console.log("Action: HDZero Process Media");

  const files = await listFiles(options.path);

  for (const file of files) {
    const ext = file.split(".").pop();

    if (ext !== "ts") {
      await removeFile(`${options.path}/${file}`);
      continue;
    }

    await tsToMp4(`${options.path}/${file}`);
    await removeFile(`${options.path}/${file}`);
  }
};
