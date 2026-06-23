# ngx-tethys

Worktile & PingCode 前端团队开发的快速且可靠的企业级 Tethys Angular 组件库。

[![CircleCI](https://circleci.com/gh/atinc/ngx-tethys.svg?style=shield)](https://circleci.com/gh/atinc/ngx-tethys)
[![Coverage Status][coveralls-image]][coveralls-url]
![](https://img.shields.io/badge/Made%20with%20Angular-red?logo=angular)
[![npm (scoped)](https://img.shields.io/npm/v/ngx-tethys?style=flat)](https://www.npmjs.com/package/ngx-tethys)
[![npm](https://img.shields.io/npm/dm/ngx-tethys)](https://www.npmjs.com/package/ngx-tethys)
[![release](https://img.shields.io/github/release-date/atinc/ngx-tethys.svg?style=flat-square)](https://github.com/atinc/ngx-tethys)
[![docgeni](https://img.shields.io/badge/docs%20by-docgeni-348fe4)](https://github.com/docgeni/docgeni)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[coveralls-image]: https://coveralls.io/repos/github/atinc/ngx-tethys/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/atinc/ngx-tethys

[English](https://github.com/atinc/ngx-tethys/blob/master/README.md) | 中文文档

# ✨ 特性

- 📦 开箱即用
- 🚀 强大且包含 60+ 个丰富组件
- 🔰 完美支持 TypeScrip，提供完整的类型定义
- 🎨 提炼企业级交互语言和设计风格
- 💫 和 Angular 版本保持同步
- ❤️ 高质量，每个组件都具备完善的测试覆盖率和文档，高质量等于放心使用

# 📖 文档

- [快速开始](https://tethys.pingcode.com/docs/getting-started)
- [主题样式](https://tethys.pingcode.com/docs/theme)
- [Tethys Design](https://tethys.pingcode.com/design/intro)
- [Tethys CDK](https://tethys.pingcode.com/cdk/behaviors/overview)

# 开发

> 仅为类库贡献者阅读。

## Clone and installation

```
$ git clone git@github.com:atinc/ngx-tethys.git
$ cd ngx-tethys
$ pnpm install
$ pnpm run start
```

## Release & Publish

1. Run `pnpm run release` to release new version, this command will does the following:
   - Checkout to `master` and identifies current version and latest tag.
   - Prompts for a new version to select.
   - Create a release branch as `release-v1.0.0`
   - Modifies package metadata (package.json, version.ts) to reflect new release and generate changelog
   - Commits those changes to release branch.
   - Pushes to the git remote.

   You can run `pnpm run release -- [patch|minor|major|2.0.0]` to skip the version selection prompt and increment the version by that keyword or specify version.

1. Submit pull request from release branch to master(don't merge it)
1. GitHub Actions will auto build and publish lib

Release the next version requires executing `pnpm run release-next`

Manually release version requires executing `pnpm run release-manual`

`pnpm run release -- --dry-run` or `pnpm run pub -- --dry-run`

running with the flag `--dry-run` allows you to see what commands would be run, without committing to git or updating files. (意思就是打印一下日志让你看看做了哪些步骤，但是并不会真的执行脚本，你可以放心的执行)

## Notes

1. Don't use `barrel index` (should directly import specify component in module, don't import `index.ts`)
1. Should exports component module in `public-api.ts`
