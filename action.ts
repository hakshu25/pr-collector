import { buildGraphQLClient, fetchPullRequests } from "./github.ts";

interface ActionOptions {
  githubUserToken: string;
  state: string | "open" | "closed" | "merged";
}

const validateState = (
  state: string,
): state is "open" | "closed" | "merged" => {
  return ["open", "closed", "merged"].includes(state);
};

export const action = async (
  { githubUserToken, state }: ActionOptions,
  repositoryArgs: string[],
) => {
  const client = buildGraphQLClient(githubUserToken);

  try {
    // TODO: Print PRs in a table. ⇛ cliffy/table
    // TODO: Print PRs in a table with colors.
    // TODO: Fetch PRs from all repositories.
    if (!validateState(state)) {
      throw new Error(`Invalid state: ${state}`);
    }

    const pullRequests = await fetchPullRequests(
      client,
      repositoryArgs[0],
      state,
    );
    console.log(pullRequests);
  } catch (e) {
    console.error(e);
    Deno.exit(1);
  }
};
