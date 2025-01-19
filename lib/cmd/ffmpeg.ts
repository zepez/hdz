import { $ } from "bun";

export const tsToMp4 = async (path: string) => {
  const out = path.split(".")[0];

  await $`ffmpeg -i ${path} ${out}.mp4`;
};

export const stitch = async (
  path: string,
  files: string[],
  outputName: string,
  mute: boolean,
) => {
  const muteCmd = mute ? "-an" : "";
  const manifest = files
    .sort()
    .map((v) => `file '${v}'`)
    .join("\n");

  await $`echo ${manifest} >> files.txt`.cwd(path);
  await $`ffmpeg -f concat -safe 0 -i files.txt ${muteCmd} -c copy ${outputName}`.cwd(
    path,
  );
  await $`rm files.txt`.cwd(path);
};
