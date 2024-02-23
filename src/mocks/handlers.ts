import { RequestHandler, graphql } from "msw";
import { PullRequest } from "../../github.ts";

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
  graphql.query("pullRequests", (req, res, ctx) => {
    const { state } = req.variables;
    let pullRequests: PullRequest[] = [];
    switch (state) {
      case "OPEN":
        pullRequests = [
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
        break;
      case "CLOSED":
        pullRequests.push({
          title: "test-pr3",
          number: 3,
          url: "http://localhost:3000/test-pr3",
        });
        break;
      case "MERGED":
        pullRequests.push({
          title: "test-pr4",
          number: 4,
          url: "http://localhost:3000/test-pr4",
        });
        break;
    }

    return res(
      ctx.data({
        repository: {
          pullRequests,
        },
      }),
    );
  }),
];
