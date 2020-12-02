---
title: 9.x 升级指南
path: 'migration-v9'
order: 100
---

本文档将帮助你从 ngx-tethys 8.x 版本升级到 9.x 版本。

## 开始之前

- 首先确保你 Node.js >= 10.13
- 创建新的分支进行升级，或者把当前分支备份
- 删除项目下 package-lock.json 文件

## 升级依赖
### 官方依赖升级
- `ng update @angular/cli^9 @angular/core@^9 @angular/cdk^9 --force`

### 第三方依赖升级
- `ngx-bootstrap`升级到v6.2.0

### 升级 ngx-tethys
- 修改 `ngx-tethys` 版本为 `9.0.0`

## 新特性和相关修改
- 所有模块的引入改为二级方式引入, 比如: `import { ThyButtonModule } from "ngx-tethys/button"`
- 避免使用`ngx-tethys`主入口方式引入, 主入口会在 `10.0.0` 版本彻底移出
  ```
    import { ThyButtonModule, ThyIconModule} from "ngx-tethys";

    // 需要修改成
    import { ThyButtonModule } from "ngx-tethys/button";
    import { ThyIconModule} from "ngx-tethys/icon";
  ```
- `ngx-tethys/util/helpers` 函数入口取消，需要修改成`ngx-tethys/util`导入
    ```
    import { isString } from "ngx-tethys/util/helpers";
    // 需要修改成
    import { isString } from "ngx-tethys/util";
    ```
- util.helpers 会保留到下一个大版本，提前使用 "ngx-tethys/util" 导入替换
    ```
    import { helpers } from "ngx-tethys/util";
    helpers.isString(xxx);
    helpers.isNumber(xxx)
    // 需要修改成
    import { isString, isNumber } from "ngx-tethys/util";
    ```
- 彻底移除`modal`、`datepicker`、`pop-box`、`confirm`废弃的模块，分别使用`dialog`、`date-picker`、`popover`、`dialog.confirm`替换
- 彻底移除了 `ngx-bootstrap`、`ngx-sortablejs` 依赖
- 新增`styles/main.bundle.scss`和`styles/basic.bundle.scss` bundle 文件，用于替换`styles/index.scss`和`styles/basic.scss`，之后的大版本会移出`styles/index.scss`和`styles/basic.scss`
- 移出了 scrollbar 的样式，使用浏览器默认的滚动条样式，如果需要使用，请单独在项目中引入如下 scrollbar 样式即可

    ```
    ::-webkit-scrollbar {
        width: 6px;
        height: 9px;
        -webkit-appearance: none;
    }

    ::-webkit-scrollbar-track-piece {
        background: $scrollbar-track-piece;
    }

    ::-webkit-scrollbar-thumb {
        background: $scrollbar-thumb;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:vertical:hover {
        background: darken($scrollbar-thumb, 15%);
    }

    ::-webkit-scrollbar-thumb:horizontal:hover {
        background: darken($scrollbar-thumb, 15%);
    }
    ```
- Id, PaginationInfo, Dictionary, NumericDictionary, IndexableObject 等类型移动到了`ngx-tethys/types`模块
    ```
    import { PaginationInfo } from "ngx-tethys/types";
    ```
- `ngx-tethys/store`模块下的 Id, PaginationInfo 类型无法使用, 请替换成 `ngx-tethys/types`
- `directives`下的指令全部移动到`ngx-tethys/shared`模块, 单独引入需要导入`ThySharedModule`

## 过渡

- 下个大版本移除主入口，即`ngx-tethys`
- 下个大版本移除util中的helpers导出

