---
title: 快速上手
path: 'getting-started'
order: 1
---

## 安装

```bash
$ npm install ngx-tethys --save
// or
$ yarn add ngx-tethys
```
## 如何使用

在根模块导入 `NgxTethysModule`, 这样所有组件模块都可以直接使用

```ts
import { NgxTethysModule } from 'ngx-tethys';

@NgModule({
  imports: [ NgxTethysModule ]
})
export class AppModule {
}
```

也可以单独导入某一个组件模块，一般建议在 SharedModule 中导入需要使用的组件模块
```ts
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyLayoutModule } from 'ngx-tethys/layout';

@NgModule({
    imports: [ ThyButtonModule, ThyLayoutModule ]
})
export class AppModule {
}
```

## 样式导入
目前只支持 SCSS 样式导入，修改 `styles.scss` 
```
@import 'ngx-tethys/styles/index.scss';
```
