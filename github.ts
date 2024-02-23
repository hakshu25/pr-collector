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

const pullRequestsQuery = `
query pullRequests($owner: String!, $repo: String!, $state: PullRequestState!) {
  repository(owner: $owner, name: $repo) {
    pullRequests(first: 100, states: [$state]) {
      nodes {
        title,
        number,
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
  repository: {
    pullRequests: {
      nodes: PullRequest[];
    }
  };
}

export const fetchPullRequests = async (
  client: GraphQlClient,
  repo: string,
  state: "open" | "closed" | "merged" = "open",
): Promise<PullRequest[]> => {
  const owner = await fetchLoggedInUser(client);
  let pullRequests: PullRequest[] = [];
  try {
  const { repository } = await client<
    PullRequestsQueryResponse
  >(
    pullRequestsQuery,
    {
      owner,
      repo,
      state: state.toUpperCase(),
    },
  );
  pullRequests = repository.pullRequests.nodes;
  } catch (e) {
    console.error(e);
  }
  return pullRequests;
};
