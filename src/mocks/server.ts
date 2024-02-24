import { setupServer } from "../deps/test_deps.ts";
import { handlers } from "./handlers.ts";

export const server = setupServer(...handlers);
