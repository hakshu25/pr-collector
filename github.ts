import { Octokit } from "octokit";

type GraphQlClient = Octokit['graphql'];

interface ViewerQueryResponse {
  viewer: {
    login: string;
  };
}

const viewerQuery = `
query loginUserName {
  viewer {
    login
  }
}
`;

const fetchLoggedInUser = async (client: GraphQlClient): Promise<string> => {
  const { viewer: { login } } = await client<ViewerQueryResponse>(viewerQuery);
  return login;
};

const pullRequestsQuery = (state: "open" | "closed", user: string) => `
query {
  search(query: "is:pr state:${state} user:${user}", type: ISSUE, first: 100) {
    nodes {
      ... on PullRequest {
        title
        number
        url
      }
    }
  }
}
`;

export const buildGraphQLClient = (token: string): Octokit['graphql'] => {
  const client = new Octokit({ auth: token, request: fetch })
  return client.graphql;
};

export interface PullRequest {
  title: string;
  number: number;
  url: string;
}

interface PullRequestsQueryResponse {
  search: {
    nodes: PullRequest[];
  };
}

export const fetchPullRequests = async (
  client: GraphQlClient,
  user: string | undefined,
  state: "open" | "closed" = "open",
): Promise<PullRequest[]> => {
  const reposOwner = user || await fetchLoggedInUser(client);
  let pullRequests: PullRequest[] = [];
  try {
  const query = pullRequestsQuery(state, reposOwner)
  const { search: { nodes }} = await client<
    PullRequestsQueryResponse
  >(
    query,
  );
  pullRequests = nodes;
  } catch (e) {
    console.error(e);
  }
  return pullRequests;
};
