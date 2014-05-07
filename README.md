# grunt-package-github

> Adds information from Github about this project to package.json

[![NPM](https://nodei.co/npm/grunt-package-github.png)](https://nodei.co/npm/grunt-package-github)

## Getting Started
This plugin requires Grunt `~0.4.1`

```shell
npm install grunt-package-github --save-dev
```

## The "package-github-data" task

### Overview
This plugin will add the lastCommitTimestamp and lastCommitSha to the package.json. These are both retrieved from Github using the config below.

### Config
This plugin requires a config sections named `package-github-data` passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  package-github-data: {
    options: {
        github: {
            user: "your_github_user",
            repo: "your_github_repo",
            o_auth_token: "your_github_o_auth_token"
        }
    }
  }
})
```
