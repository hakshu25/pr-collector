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
export GITHUB_USER_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Usage

```bash
$ pr-collector --help

Usage:   pr-collector [options]
Version: 1.0.0                 

Description:

  Collect PRs from multiple GitHub repositories.

Options:

  -h, --help              - Show this help.                                                                                  
  -V, --version           - Show the version number for this program.                                                        
  -s, --state    <state>  - Filter PRs by state. Default to "open".               (Default: "open", Values: "open", "closed")
  -u, --user     <user>   - GitHub user name. Default to the authenticated user.                                             

Environment variables:

  GITHUB_USER_TOKEN  <token>  - GitHub Personal Access token.  (required)
```
