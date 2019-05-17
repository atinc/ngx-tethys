# ngx-tethys [![Build Status](https://api.travis-ci.org/atinc/ngx-tethys.svg?branch=master)](https://travis-ci.org/atinc/ngx-tethys)

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

## Release & Publish

1. 获取主仓储 `ngx-tethys` 最新代码（如果是自己fork的项目，需要 `fetch` 远程仓储并且合并到本地分支 ）
1. 执行 `npm run release` 输入新的版本号（`release` 命令会根据tag自动生成 `changelog`, 并且自动生成新的版本对应的分支）
1. 提交 `Pull Request` 到主仓储 `ngx-tethys` `master` 分支，测试通过后合并 `Pull Request`，并且删除临时分支
1. 本地切换到主仓储 `ngx-tethys/master` 分支，（如果是自己fork项目，则 `git checkout upstream/master`）
1. 本地执行 `git pull` or `git fetch upstream` 同步远程更新
1. 执行 `npm run pub` 发布新版本
1. 在主仓储添加当前版本对应的新的 `tag`

## Announcements

1. 不建议使用 `barrel index`（开发新的组件模块时，最外层的 `module` 最好直接引用组件，不要通过 `index` 导出，再进行引用）
1. 新增加组件模块，需要在 `public-api.ts` 文件中导出
