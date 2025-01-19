import { select } from "@inquirer/prompts";
import { getDisks, formatDisk as formatDiskCmd } from "~/lib/cmd/diskutil";
import type { Options } from "~/lib/types";

export const formatDisk = async (options: Pick<Options, "name">) => {
  console.log("Action: HDZero Format Disk");

  const disks = await getDisks();
  const disk: string = await select({
    message: "Select a disk to format",
    choices: Array.from(disks),
  });

  await formatDiskCmd(disk, options.name);
};
