import { assertEquals } from "assert/mod.ts";
import { afterAll, afterEach, describe, it } from "testing/bdd.ts";
import { buildGraphQLClient, fetchPullRequests } from "./github.ts";
import { server } from "./src/mocks/server.ts";

describe("buildGraphQLClient()", () => {
  it("returns a graphql client with authentication token set", () => {
    const client = buildGraphQLClient("test-token");
    assertEquals(
      client.endpoint.DEFAULTS.headers.authorization,
      "token test-token",
    );
  });
});

describe("fetchPullRequests()", () => {
  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("returns a list of pull requests", async () => {
    server.listen();
    const client = buildGraphQLClient("test-token");

    const pullRequests = await fetchPullRequests(client, "test-repo");

    assertEquals(pullRequests, [
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
    ]);
  });
});
