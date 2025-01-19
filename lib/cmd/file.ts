import { $ } from "bun";

export const listFiles = async (path: string) => {
  console.log(`Reading files in ${path}`);
  const result = await $`ls ${path}`.quiet();

  return result.stdout.toString().split("\n").filter(Boolean);
};

export const createDirectory = async (path: string) => {
  console.log(`Ensuring ${path} directory exists`);
  await $`mkdir -p ${path}`;
};

export const copyFiles = async (from: string, to: string) => {
  console.log(`Copying files from ${from} to ${to}`);
  await $`cp -r ${from}/. ${to}`;
};

export const removeFile = async (path: string) => {
  console.log(`Removing file at ${path}`);
  try {
    await $`rm ${path}`;
  } catch (e) {
    console.log("Unable to remove file. Are you sure the file exists?");
  }
};

export const removeFiles = async (path: string) => {
  console.log(`Removing files in ${path}`);
  try {
    await $`rm -r ${path}/*`;
  } catch (e) {
    console.log(
      "Unable to remove files. Are there any files in the directory?",
    );
  }
};
