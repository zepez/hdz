import { $ } from "bun";

export const getDisks = async () => {
  const disks = new Set<string>();

  const all = await $`diskutil list`.quiet();
  console.log(all.stdout.toString());

  const cmd = await $`diskutil list | grep "^/dev/disk"`.quiet();
  const stdout = cmd.stdout.toString();
  const lines = stdout.split("\n");

  for (const line of lines) {
    if (line === "") continue;

    const disk = line.split(" ")[0];
    disks.add(disk);
  }

  return disks;
};

export const formatDisk = async (disk: string, name: string) => {
  await $`diskutil eraseDisk MS-DOS ${name} MBRFormat ${disk}`.quiet();
};
