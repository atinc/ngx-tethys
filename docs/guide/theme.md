---
title: 主题样式
path: 'theme'
order: 40
---

通过`ng add ngx-tethys`的方式引入组件库后会自动在`angular.json`中引入样式:
```json
{
    "styles": [
        "node_modules/ngx-tethys/styles/index.scss"
    ]
}
```

如果需要定制一些样式或者修改变量，可以在`styles.scss`中单独引入:

```sass
@use "ngx-tethys/styles/index.scss";
```

<alert>从 v12 版本开始，ngx-tethys 使用最新的 SASS 模块系统，推荐使用 @use 代替 @import</alert>

修改变量采用如下方式:

```sass
@use "ngx-tethys/styles/variables.scss" with (
    $primary: #348fe4,
    ...
);
```

从 v13 版本开始，ngx-tethys 只导出了`styles/*`文件夹中的样式文件，所有组件内部的 styles 文件不可直接导入使用，对外公开的样式如下:

```sass
// 包含所有的样式
@use "ngx-tethys/styles/index.scss"; 
@use "ngx-tethys/styles/index"; 
@use "ngx-tethys"; 

// 包含所有的变量和mixins
@use "ngx-tethys/styles/basic.scss";
@use "ngx-tethys/styles/basic";

// 包含所有的变量
@use "ngx-tethys/styles/variables.scss";
@use "ngx-tethys/styles/variables";
```

如果需要单独导入某一个组件的样式，默认是不支持的，当然可以通过设置`angular.json`中的`...build.options. stylePreprocessorOptions`参数实现所有样式文件的导入，这是一个有风险的行为，因为内部的 scss 文件名和路径可能会变化。
 
```json
    "stylePreprocessorOptions": {
        "includePaths": ["node_modules/"]
    }
```
