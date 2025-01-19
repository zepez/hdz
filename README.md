# HDZero File Ingestion CLI

This project is intended to automate handling of files on HDZero SD-card, including DVR footage processing. 

```bash
Usage: hdz [options] [command]

Options:
  -h, --help               display help for command

Commands:
  format-disk [options]    Rename and format SD card as MS-DOS
  copy-files [options]     Copy all files within a directory in the volume to another directory
  remove-files [options]   Remove all files within a directory in the volume without deleting the directory itself
  process-media [options]  Convert .ts to .mp4 and remove all other files
  ingest [options]         Full pipeline to ingest media. Copy and process files, then clean the SD card
  help [command]           display help for command
```