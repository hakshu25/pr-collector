import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

export const command = new Command()
  .name("pr-collector")
  .version("1.0.0")
  .description("Collect PRs from multiple GitHub repositories.")
  .usage("[options] [REPOSITORY_ARGS]")
  .arguments("<REPOSITORY_ARGS:string[]>")
  .action((options, repositoryArgs) => {
    console.debug(options);
    console.debug(repositoryArgs);
  });

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await command.parse(Deno.args);
}
