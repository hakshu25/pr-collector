# PR Collector

## Description

This is a simple tool to collect PRs from multiple GitHub repositories.

## Installation

```bash
# MacOS
brew tap hakshu25/pr-collector
brew install pr-collector
```

## environment variables

Need to set the following environment variables before using this tool.

```bash
GITHUB_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Usage

```bash
$ pr-collector --help
Usage: pr-collector [OPTIONS] [REPOSITORY_ARGS]...

  Collect PRs from multiple GitHub repositories.

Arguments:
  [REPOSITORY_ARGS]... List of repositories

Options:
  -h, --help     Print help
  -v, --version  Print version
  -t, --title    TEXT Title of the PR
  -l, --label    TEXT Label of the PR
  --author,      TEXT Author of the PR
  --assignee     TEXT Assignee of the PR
  -r, --reviewer TEXT Reviewer of the PR
```
