import { $ } from "bun";

export const tsToMp4 = async (path: string) => {
  const out = path.split(".")[0];

  await $`ffmpeg -i ${path} ${out}.mp4`;
};
