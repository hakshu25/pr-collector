import { snapshotTest } from "https://deno.land/x/cliffy@v1.0.0-rc.3/testing/mod.ts";
import { command } from "./main.ts";

await snapshotTest({
  name: "pr-collector",
  meta: import.meta,
  osSuffix: ["darwin"],
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
  },
  async fn() {
    await command.parse();
  },
});
