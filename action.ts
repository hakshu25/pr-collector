import { buildGraphQLClient, fetchPullRequests } from "./github.ts";

interface ActionOptions {
  githubUserToken: string;
}

export const action = async (
  { githubUserToken }: ActionOptions,
  repositoryArgs: string[],
) => {
  const client = buildGraphQLClient(githubUserToken);

  try {
    const pullRequests = await fetchPullRequests(client, repositoryArgs[0]);
    console.log(pullRequests);
  } catch (e) {
    console.error(e);
    Deno.exit(1);
  }
};
