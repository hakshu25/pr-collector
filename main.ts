import { Command } from "cliffy/command/mod.ts";
import { action } from "./action.ts";

export const command = new Command()
  .name("pr-collector")
  .version("1.0.0")
  .description("Collect PRs from multiple GitHub repositories.")
  .usage("[options] [REPOSITORY_ARGS]")
  .arguments("<REPOSITORY_ARGS:string[]>")
  .env("GITHUB_USER_TOKEN=<token:string>", "GitHub Personal Access token.", {
    required: true,
  })
  .action(action);

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await command.parse(Deno.args);
}
