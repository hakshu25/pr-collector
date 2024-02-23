import { Table } from "cliffy/table/table.ts";
import { colors } from "cliffy/ansi/colors.ts";
import { PullRequest } from "./github.ts";

const applyIdColor = colors.green;
const applyUrlColor = colors.underline.blue;

export const render = (pullRequests: PullRequest[]): void => {
  new Table().header(['ID', 'Title', 'URL']).body(pullRequests.map((pr): [string, string, string] => [applyIdColor(`#${pr.number}`), pr.title, applyUrlColor(pr.url)])).border(true).render();
}