import { program } from "commander";
import pkg from "~/package.json";
import type { Options } from "~/lib/types";
import { formatDisk } from "~/lib/actions/format-disk";
import { copyFiles } from "~/lib/actions/copy-files";
import { removeFiles } from "~/lib/actions/remove-files";
import { processMedia } from "~/lib/actions/process-media";

const opt = {
  name: ["-n, --name <name>", "set disk name", "hdzero"],
  volume: ["-v, --volume <name>", "set volume name", "/Volumes/hdzero"],
  path: ["-p, --path <path>", "set disk path"],
  output: ["-o, --output <path>", "set output path"],
} as const;

/*
 * Format Disk
 */
program
  .command("format-disk")
  .description("Rename and format SD card as MS-DOS")
  .version(pkg.version)
  .option(...opt.name)
  .action(formatDisk);

/*
 * Copy Files
 */
program
  .command("copy-files")
  .description(
    "Copy all files within a directory in the volume to another directory"
  )
  .version(pkg.version)
  .option(...opt.volume)
  .option(...opt.output)
  .action(async (opt) => {
    await copyFiles(opt);
  });

/*
 * Remove Files
 */
program
  .command("remove-files")
  .description(
    "Remove all files within a directory in the volume without deleting the directory itself"
  )
  .version(pkg.version)
  .option(...opt.path)
  .action(removeFiles);

/*
 * Process Media
 */
program
  .command("process-media")
  .description("Convert .ts to .mp4 and remove all other files")
  .version(pkg.version)
  .option(...opt.path)
  .action(processMedia);

/*
 * Ingest Pipeline
 */
program
  .command("ingest")
  .description(
    "Full pipeline to ingest media. Copy and process files, then clean the SD card"
  )
  .version(pkg.version)
  .option(...opt.volume)
  .requiredOption(...opt.output)
  .action(async (options: Options) => {
    const files = await copyFiles(options);

    for (const file of files) {
      await removeFiles({ path: `${options.volume}/${file}` });
    }

    await processMedia({ path: options.output });
  });

program.parse();
console.table(program.opts());
