import { graphql } from "@octokit/graphql";

type GraphQlClient = typeof graphql;

interface ViewerQueryResponse {
  viewer: {
    login: string;
  };
}

const viewerQuery = `
query {
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
query pullRequests($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    pullRequests(first: 100) {
      nodes {
        title,
        number,
        url
      }
    }
  }
}
`;

export const buildGraphQLClient = (token: string): typeof graphql => {
  return graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });
};

interface PullRequest {
  title: string;
  number: number;
  url: string;
}

interface PullRequestsQueryResponse {
  repository: {
    pullRequests: PullRequest[];
  };
}

export const fetchPullRequests = async (
  client: GraphQlClient,
  repo: string,
): Promise<PullRequest[]> => {
  const owner = await fetchLoggedInUser(client);
  const { repository: { pullRequests } } = await client<
    PullRequestsQueryResponse
  >(
    pullRequestsQuery,
    {
      owner,
      repo,
    },
  );
  return pullRequests;
};
