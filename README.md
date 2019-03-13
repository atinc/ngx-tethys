# ngx-tethys [![Build Status](https://api.travis-ci.org/worktile/ngx-tethys.svg?branch=master)](https://travis-ci.org/worktile/ngx-tethys)

>An UI components based on Worktile Design and Angular.

# Getting Started

## Installation

Install ngx-tethys from npm

```
npm install ngx-tethys --save
```

## Demo

https://worktile.github.io/ngx-tethys

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

## Building & Publish

1. `npm run build`;
1. cd `built` folder, `npm publish`
