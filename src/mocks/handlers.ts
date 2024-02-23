import { graphql, RequestHandler } from "msw";
import { PullRequest } from "../github.ts";

export const handlers: RequestHandler[] = [
  graphql.query("loginUserName", (_, res, ctx) => {
    return res(
      ctx.data({
        viewer: {
          login: "test-user",
        },
      }),
    );
  }),
  graphql.query("searchPullRequests", (_, res, ctx) => {
    const pullRequests: PullRequest[] = [
      {
        title: "test-pr1",
        number: 1,
        url: "http://localhost:3000/test-pr",
      },
      {
        title: "test-pr2",
        number: 2,
        url: "http://localhost:3000/test-pr2",
      },
    ];

    return res(
      ctx.data({
        search: {
          nodes: pullRequests,
        },
      }),
    );
  }),
];
