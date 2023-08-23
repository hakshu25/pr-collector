import { graphql } from "msw";

export const handlers = [
  graphql.query("loginUserName", (_, res, ctx) => {
    return res(
      ctx.data({
        viewer: {
          login: "test-user",
        },
      }),
    );
  }),
  graphql.query("pullRequests", (_, res, ctx) => {
    return res(
      ctx.data({
        repository: {
          pullRequests: [
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
          ],
        },
      }),
    );
  }),
];
