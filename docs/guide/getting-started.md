---
title: 快速上手
path: 'getting-started'
order: 1
---

## 使用 CLI 搭建本地项目
我们强烈建议使用官方的 @angular/cli 工具链辅助进行开发，下面我们用一个简单的实例来说明，你可以阅读[官网文档搭建环境](https://angular.cn/guide/setup-local)搭建本地开发环境和工作空间。
### 安装脚手架工具
```bash
npm install -g @angular/cli
```
### 创建一个项目
> 在创建项目之前，请确保 `@angular/cli` 已被成功安装。

执行以下命令，`@angular/cli` 会在当前目录下新建一个名称为 ` my-app` 的文件夹，并自动安装好相应依赖。

```
ng new my-app
```

### 初始化配置
进入项目文件夹，执行以下命令后将自动完成 ngx-tethys 的初始化配置，包括引入导入模块，引入样式文件等工作。

```
$ ng add ngx-tethys
```

开发者可以通过增加参数来完成个性化的初始化配置，例如国际化或者自定义主题等，详细可以参考[脚手架](./docs/schematics)部分。

### 开发调试
一键启动调试，运行成功后显示欢迎页面。

```
$ ng serve --port 0 --open
```

### 构建和部署
执行`ng build --prod`项目会被打包到 `dist` 目录中。


## 手动安装
### 安装组件

```bash
$ npm install ngx-tethys --save
// or
$ yarn add ngx-tethys
```
### 引入样式

- 在 angular.json 中引入
    ```
    {
        "styles": [
            "node_modules/ngx-tethys/styles/main.bundle.scss"
        ]
    }
    ```
- 在`style.scss`中引入预构建样式文件
    ```scss
    @import "~ngx-tethys/styles/main.bundle.scss";
    ```

### 引入组件模块

最后需要将使用的组件模块引入到你的 `app.module.ts` 文件和[特性模块](https://angular.cn/guide/feature-modules)中。

以 `ThyButtonModule` 模块为例，先引入组件模块：

```ts
import { NgModule } from '@angular/core';
import { ThyButtonModule } from 'ngx-tethys/button';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ThyButtonModule
  ]
})
export class AppModule { }
```

然后在模板中使用：
```html
<button thyButton="primary">主要按钮</button>
```

> 在 <=9.0.0 版本，`ngx-tethys` 提供了根入口`NgxTethysModule`导入所有模块，将来的版本会移出，请避免使用根入口模块。
