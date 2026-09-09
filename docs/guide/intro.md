---
title: 介绍
path: 'intro'
order: 0
---

`ngx-tethys`是 Tethys Design 的 Angular UI 组件库，主要用于研发企业级中后台产品，来自 Worktile 前端开发团队，目前应用于 Worktile 和 PingCode 两款中大型企业级 SaaS 产品中。

## 特性
- 📦 开箱即用的 Angular 组件库，与 Angular 保持同步升级
- 🚀 强大丰富的组件，覆盖企业级应用大部分场景
- 💻 使用 TypeScript 构建，提供完整的类型定义
- 🏡 提炼自企业级产品的交互语言和视觉风格

## 背景
`ngx-tethys` 开始于2018年，起初为了快速响应业务开发，只提供了部分简单的基础组件，底层依赖了`ngx-bootstrap`组件库，时隔多年，目前已经有60+多个组件，基本涵盖了 PC Web 大部分场景，底层依赖的 ngx-bootstrap 已经从`9.0.0`版本后彻底移除。

## 当前版本
[![npm (scoped)](https://img.shields.io/npm/v/ngx-tethys?style=flat-square)](https://www.npmjs.com/package/ngx-tethys)

## 版本规则
`ngx-tethys` 与 `@angular/core` 保持相同的主版本号，目前支持 Angular `^22.0.0` 版本。

## 依赖第三方库
- Components Dev Kit (CDK)
- date-fns

## 安装
我们强烈推荐使用官方的 `@angular/cli` 工具链辅助进行开发，在实际项目开发中，它可以很好的满足对 TypeScript 代码的构建、调试、代理、打包部署等一系列工程化的需求。

```bash
ng new PROJECT_NAME
cd PROJECT_NAME
ng add ngx-tethys
```
> 如果你想了解更多 CLI 工具链的功能和命令，建议访问 [Angular CLI](https://github.com/angular/angular-cli) 了解更多

