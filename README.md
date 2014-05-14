# grunt-ccb

> Create a CCB with manfiest information in JIRA

[![Build Status](https://travis-ci.org/opentable/grunt-ccb.svg?branch=master)](https://travis-ci.org/opentable/grunt-ccb)

[![NPM](https://nodei.co/npm/grunt-ccb.png)](https://nodei.co/npm/grunt-ccb)

## Getting Started
This plugin requires Grunt `~0.4.1`

```shell
npm install grunt-ccb --save-dev
```

## The "ccb" task

### Overview
This plugin will grab the commit log from Github from a specified date, and store this to a file.
The date is either hardcoded (using the commitHistoryStartDate.date property in the config) or retrieved from a http web service.

### Config
This plugin requires a config sections named `ccb` passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    ccb: {
        options: {
            jira: {
                api_url: "https://company.atlassian.net/rest/api/2/",
                proxy : null,
                user: "user",
                password: "password",
                project_id: 12100,
                ccb_issue_type: 20
            },
            project: {
                name: "Location API",
                version: "1.0.1"
            },
            manifest: "tests/data/manifest.json",
            build_label: "project_123"
        }
    }
})
```

## Options

- `jira`
    - `api_url` - Url of the Jira api root
    - `proxy` - Full url of proxy including port
    - `user` - Jira username
    - `password`  - Jira password
    - `project_id`  - Jira id of the project to post the ccb
    - `ccb_issue_type`  - Jira id of the type of issue to post the ccb as
- `project` - TODO: We should use the properties in the package.json here
    - `name` - Name of the project that is creating the ccb (displayed in the ccb subject)
- `manifest` - Path to a file that contains the manifest for this project (this will be the body of the ccb)
  `build_label` - The build that created this ccb
