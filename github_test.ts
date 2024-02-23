import { assertEquals } from "assert/mod.ts";
import { afterAll, afterEach, beforeAll, describe, it } from "testing/bdd.ts";
import { buildGraphQLClient, fetchPullRequests } from "./github.ts";
import { server } from "./src/mocks/server.ts";

describe("fetchPullRequests()", () => {
  const client = buildGraphQLClient("test-token");

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("returns pull requests", async () => {
    const pullRequests = await fetchPullRequests(
      client,
      "test-user",
      "open",
    );

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
