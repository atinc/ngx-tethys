---
type: operations
title: 构建与发布
description: pnpm run build 如何依次产出 cdk、ngx-tethys 和 schematics，以及 release-auto 分支如何在 CI 里发布 latest 或 next。
tags: [build, release, npm, ci]
verified:
  - by: openwiki/0.6.0
    at: 2026-09-28T07:54:10.806Z
sources:
  - id: openwiki-source-4d1d392666be6dfdd7a91a2e
    resource: repo://.github/workflows/release.yml
  - id: openwiki-source-96a0dbf32ffe8acb7d902575
    resource: repo://cdk/ng-package.json
  - id: openwiki-source-5b54a58d1b51cd490b0e7162
    resource: repo://package.json
  - id: openwiki-source-23775c3de52f3ab95a13cb8b
    resource: repo://README.md
  - id: openwiki-source-624efccdd5b1da6b4a6aaf16
    resource: repo://scripts/pre-publish.js
  - id: openwiki-source-2d4a34ff0e8329c43274f7e4
    resource: repo://src/ng-package.json
generated: { by: "cursor", at: "2026-09-28T07:54:10.806Z" }
---

库的构建和站点构建是两条命令。`pnpm run build` 只产出要发布的包。文档站走 `build-site`。

## 构建顺序

`pnpm run build` 串行三步：

1. `ng build cdk --configuration production`，产物在 `dist/cdk`。
2. 清空 `dist/tethys` 后，用生产配置构建 `ngx-tethys`。接着把仓库根的 `README.md` 和 `CHANGELOG.md` 拷进 `dist/tethys`，再把 `src/core/testing` 下的 TypeScript 原样拷到 `dist/tethys/core/testing`。组件 scss 由 ng-packagr 的 assets 规则带上，不靠这一步。
3. `tsc -p ./schematics` 输出到 `dist/tethys/schematics`，并把 schematics 里的 json 和 template 文件拷到同一目录。

`build-styles` 会再拷一次 `src/**/*.scss`，但它不在 `pnpm run build` 里面。

## 发版分支

`pnpm run release` 调用 `wpm release`，分支名格式是 `release-auto-v{{version}}`。`release-next` 用 `release-auto-next-v{{version}}`。`release-manual` 和 `release-only` 不套这个自动分支名。`admin-release` 跳过建分支和推送。

README 写明 `pnpm run release -- --dry-run` 和 `pnpm run pub -- --dry-run` 只打印将要执行的步骤，不改文件、不提交。

## 谁真正 npm publish

`pub` 先 `wpm publish`，再在 `dist/tethys` 和 `dist/cdk` 里执行不带 tag 的 `npm publish`，也就是 latest。`pub-next` 同样两步，但两个包都加 `--tag next`。

工作区 `package.json` 的 `prepublishOnly` 在版本号包含 `next`、而 npm tag 不是 `next` 时打印错误并以退出码 1 结束。这条脚本挂在工作区包上，用来拦住把 next 版本发到默认 tag。

## CI

`.github/workflows/release.yml` 只处理分支名以 `release-auto-` 开头的 pull request。它先自动批准，再发布。

- `release-auto-v` 开头执行 `pnpm run pub`。
- `release-auto-next-v` 开头执行 `pnpm run pub-next`。这两个前缀互不包含，不会一条分支跑两次发布。

Node 用 24，依赖按锁文件安装。发布后读取根 `package.json` 的 `version`，向 PingCode webhook 送出版本和名称「组件库 ngx-tethys」，然后尝试自动合并。`main.yml` 只跑 lint 和测试，不发布。

## 相关页面

- [包与入口](../architecture/packages.md)说明 `dist/tethys` 和 `dist/cdk` 分别是什么。
- [脚手架与版本迁移](../integrations/schematics.md)说明打进 `dist/tethys/schematics` 的规则。
- [测试](testing.md)说明发布前 CI 跑哪些测试。
- [文档站点](docs-site.md)说明站点构建为什么不在 `pnpm run build` 里。
