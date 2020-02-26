# ngx-tethys [![Build Status](https://api.travis-ci.org/atinc/ngx-tethys.svg?branch=master)](https://travis-ci.org/atinc/ngx-tethys)

>An UI components based on Worktile Design and Angular.

# Getting Started

## Installation

Install ngx-tethys from npm

```
npm install ngx-tethys --save
```

## Demo

https://atinc.github.io/ngx-tethys

## Usage

Import root module into every module (e.g. `AppModule`) where you want to use the components, directives, and services.

```
import { NgxTethysModule } from 'ngx-tethys';

@NgModule({
  imports: [ NgxTethysModule ]
})
export class AppModule {
}
```

You can freely import the specified feature modules.


```
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyLayoutModule } from 'ngx-tethys/layout';

@NgModule({
    imports: [ ThyButtonModule, ThyLayoutModule ]
})
export class AppModule {
}
```

## Development

```
$ git clone git@github.com:worktile/ngx-tethys.git
$ cd ngx-tethys
$ npm install
$ npm run start
```

## Release & Publish

1. Run `npm run release` to release new version, this command will does the following: 
    - Checkout to `master` and identifies current version and latest tag.
    - Prompts for a new version to select.
    - Create a release branch as `release-v1.0.0`
    - Modifies package metadata (package.json, version.ts) to reflect new release and generate changelog
    - Commits those changes to release branch.
    - Pushes to the git remote.

    You can run `npm run release [patch|minor|major|2.0.0]` to skip the version selection prompt and increment the version by that keyword or specify version.
1. Submit pull request from release branch to master
1. Code review & merge pull request for release
1. Run `npm run pub` to pub lib to npm, this command will does the following: 
    - Fetch latest code and checkout to `master`
    - Create tag for new version
    - Pushes tags to git remote
    - Auto run `npm run build` which build source output `built` folder
    - Auto switch `built` folder and run `npm publish` to publish lib to npm


## Notes

1. Don't use `barrel index` (should directly import specify component in module, don't import `index.ts`)
1. Should exports component module in `public-api.ts`

