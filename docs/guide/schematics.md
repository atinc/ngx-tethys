---
title: 脚手架
path: 'schematics'
order: 2
---

使用脚手架可以更加方便的初始化项目，生成模板代码，节省开发时间。
> 脚手架部分完全基于 [Schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2) 进行开发。

## 项目初始化
在项目下运行命令 `ng add ngx-tethys` 跟随选项便可完成初始化配置，包括引入导入模块，引入样式文件等工作。
同时你可以通过选择预设的模板创建一个 Angular 项目，并在此基础上进行开发。

## 生成组件

快速生成模板代码，每个官网的代码演示都附有可生成的模板，开发者可以通过展开每个组件的代码演示部分获取其生成代码。

### 命令
```
$ ng g ngx-tethys:[schematic] <name> [options]
```
