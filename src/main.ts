import { Command, EnumType } from "./deps/deps.ts";
import { action } from "./action.ts";

enum PRState {
  Open = "open",
  Closed = "closed",
}

const PRStateType = new EnumType(PRState);

export const command = new Command()
  .name("pr-collector")
  .version("1.0.0")
  .description("Collect PRs from multiple GitHub repositories.")
  .usage("[options]")
  .env("GITHUB_USER_TOKEN=<token:string>", "GitHub Personal Access token.", {
    required: true,
  })
  .type("state", PRStateType)
  .option(
    "-s --state <state:state>",
    'Filter PRs by state. Default to "open".',
    { default: "open" },
  )
  .option(
    "-u --user <user:string>",
    "GitHub user name. Default to the authenticated user.",
  )
  .option(
    "-l --limit <limit:number>",
    "Limit the number of PRs to fetch. Default to 100.",
    { default: 100 },
  )
  .action(action);

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await command.parse(Deno.args);
}
