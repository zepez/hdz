import { stitch } from "~/lib/cmd/ffmpeg";
import { listFiles } from "~/lib/cmd/file";
import type { Options } from "~/lib/types";

export const stitchMedia = async (
  options: Pick<Options, "path" | "stitch" | "mute">,
) => {
  console.log("Action: HDZero Stitch Media");

  const files = (await listFiles(options.path)).filter((v) =>
    v.includes(".mp4"),
  );

  await stitch(options.path, files, options.stitch!, options.mute);
};
