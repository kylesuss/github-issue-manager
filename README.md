GitHub Issue Manager
------------

### Environment Variables

A `.env` file must be added to the root of the project (it is then ignored in `.gitignore`) in order to allow the app to communicate with the GitHub API.

A sample setup looks like:

```shell
# <root>/.env
GITHUB_TOKEN=12345
```

Substitute `12345` for the token you generated through GitHub's [personal access tokens page](https://github.com/settings/tokens).

### Installation

```shell
npm install
npm start # Start the dev server after the GITHUB_TOKEN is added
```
