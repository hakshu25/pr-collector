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

  describe("state", () => {
    describe("when state is not provided", () => {
      it("returns opened pull requests", async () => {
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

    it("returns closed pull requests", async () => {
      const pullRequests = await fetchPullRequests(
        client,
        "test-repo",
        "closed",
      );

      assertEquals(pullRequests, [
        {
          title: "test-pr3",
          number: 3,
          url: "http://localhost:3000/test-pr3",
        },
      ]);
    });

    it("returns merged pull requests", async () => {
      const pullRequests = await fetchPullRequests(
        client,
        "test-repo",
        "merged",
      );

      assertEquals(pullRequests, [
        {
          title: "test-pr4",
          number: 4,
          url: "http://localhost:3000/test-pr4",
        },
      ]);
    });
  });
});
