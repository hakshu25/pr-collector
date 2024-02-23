import { snapshotTest } from "cliffy/testing/mod.ts";
import { command } from "./main.ts";

await snapshotTest({
  name: "pr-collector",
  meta: import.meta,
  dir: '../__snapshots__',
  denoArgs: ["--allow-net", "--allow-env", "--allow-read"],
  steps: {
    "should output help with -h flag": { args: ["-h"] },
    "should output help with --help flag": { args: ["--help"] },
    "should output short version with -V flag": { args: ["-V"] },
    "should output long version with --version flag": { args: ["--version"] },
    "should print help message and error message without args": {
      canFail: true,
    },
    "should print error message for unknown option": {
      args: ["--unknown-option"],
      canFail: true,
    },
    "should print error message for unknown command": {
      args: ["unknown-command"],
      canFail: true,
    },
  },
  async fn() {
    await command.parse();
  },
});
