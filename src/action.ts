import { buildGraphQLClient, fetchPullRequests } from "./github.ts";
import { render } from "./renderer.ts";

interface ActionOptions {
  githubUserToken: string;
  state: string | "open" | "closed";
  user?: string;
}

const validateState = (
  state: string,
): state is "open" | "closed" => {
  return ["open", "closed"].includes(state);
};

export const action = async (
  { githubUserToken, state, user }: ActionOptions,
) => {
  const client = buildGraphQLClient(githubUserToken);

  try {
    if (!validateState(state)) {
      throw new Error(`Invalid state: ${state}`);
    }

    const pullRequests = await fetchPullRequests(
      client,
      user,
      state,
    );

    render(pullRequests);
  } catch (e) {
    console.error(e);
    Deno.exit(1);
  }
};
