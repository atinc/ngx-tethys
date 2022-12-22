---
title: 13.x 升级指南
path: 'migration-v13'
order: 995
label: new
---

<alert>本文档将帮助你从 ngx-tethys 12.x 版本升级到 13.x 版本。</alert>

## 开始之前

- 首先确保你 `Node.js ^14.15.0 || >>=16.10.0`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
执行 `ng update ngx-tethys` 命令自动升级, 这个命令核心处理如下事项：
- 升级 `ngx-tethys` 到 `13.x` 版本，并修改 package.json 中的依赖版本号
- 会自动把依赖的 CDK 和 Angular 库都升级到 `13.x` 版本，并修改 package.json 中的依赖版本号
- 自动修改`ngx-tethys/store`引用为`@tethys/store`
- 自动修改`uploader`引用为`upload`
- 自动修改`raster`引用为`grid`
- 自动所有一级入口引用为二级入口，`import { ThyButtonModule } from "ngx-tethys";` 改为`import { ThyButtonModule } from "ngx-tethys/button";`


## 破坏性修改

- `store` 模块从组件库中移除，请使用`@tethys/store`代替
- `uploader`组件改名为`upload`，包含文件夹、类型定义和服务命名
- 去除一级入口的导入，所有模块采用二级入口导入
- 去除根模块`NgxTethysModule`，需要单独导入指定模块，可以直接使用`附录1`中的代码段
- 去除 Markdown 组件，如需使用请单独拷贝`附录2`的指令和样式到项目中使用
- `Raster`模块改为`Grid`，主要提供栅格系统的指令
- `thyButton`组件移除已经废弃的属性`thySquare`，目前按钮默认就是方形，无需单独传参，这个应该很少使用，所以未加 Schematics 自动修改，如使用请手动移除即可
- 所有非 styles 文件夹的样式默认不支持导入，只支持`ngx-tethys/styles/*`样式导入

## Sass 入口修改
在过去的版本中可以子导入任意文件夹的样式文件:

```sass
@use "ngx-tethys/button/styles/button.scss";
@use "ngx-tethys/button/styles/mixin.scss";
```
Angular 13 的打包默认采用 Node.js 的 [package entry-points](https://nodejs.org/dist/latest-v16.x/docs/api/packages.html#package-entry-points)，只导出了公开的样式文件（`ngx-tethys/styles/*`），上述使用在新版中会报`SassError: Can't find stylesheet to import.` 错误。

对于所有的`mixin`已经通过`styles/basic.scss` forward 重新导出，可以按照如下新方式使用:

```sass
@use "ngx-tethys/styles/basic.scss" as basic;

.example {
    @include basic.button-variant(...);
    color: basic.$gray-400;
}
```

如果需要单独导入某一个组件的样式，默认是不支持的，当然可以通过设置`angular.json`中的`...build.options. stylePreprocessorOptions`参数实现所有样式文件的导入，这是一个有风险的行为，因为内部的 scss 文件名和路径可能会变化。
 
```json
    "stylePreprocessorOptions": {
        "includePaths": ["node_modules/"]
    }
```

官方提供的入口如下:

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

## 废弃
- `ActionMenu`组件标记为废弃，请使用`Dropdown`组件替换，即将在之后的大版本中彻底移除

<label type="info">附录1</label> 所有模块定义列表

```ts

import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyAffixModule } from 'ngx-tethys/affix';
import { ThyAlertModule } from 'ngx-tethys/alert';
import { ThyAnchorModule } from 'ngx-tethys/anchor';
import { ThyArrowSwitcherModule } from 'ngx-tethys/arrow-switcher';
import { ThyAutocompleteModule } from 'ngx-tethys/autocomplete';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyBackTopModule } from 'ngx-tethys/back-top';
import { ThyBadgeModule } from 'ngx-tethys/badge';
import { ThyBreadcrumbModule } from 'ngx-tethys/breadcrumb';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCalendarModule } from 'ngx-tethys/calendar';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyCopyModule } from 'ngx-tethys/copy';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyDateRangeModule } from 'ngx-tethys/date-range';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyDragDropModule } from 'ngx-tethys/drag-drop';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyFullscreenModule } from 'ngx-tethys/fullscreen';
import { ThyGuiderModule } from 'ngx-tethys/guider';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyImageModule } from 'ngx-tethys/image';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyMentionModule } from 'ngx-tethys/mention';
import { ThyMenuModule } from 'ngx-tethys/menu';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyMessageModule } from 'ngx-tethys/message';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyProgressModule } from 'ngx-tethys/progress';
import { ThyPropertyOperationModule } from 'ngx-tethys/property-operation';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyRateModule } from 'ngx-tethys/rate';
import { ThyResizableModule } from 'ngx-tethys/resizable';
import { ThyResultModule } from 'ngx-tethys/result';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySelectCommonModule, ThySharedModule } from 'ngx-tethys/shared';
import { ThySkeletonModule } from 'ngx-tethys/skeleton';
import { ThySlideModule } from 'ngx-tethys/slide';
import { ThySliderModule } from 'ngx-tethys/slider';
import { ThyStatisticModule } from 'ngx-tethys/statistic';
import { ThyStepperModule } from 'ngx-tethys/stepper';
import { ThyStrengthModule } from 'ngx-tethys/strength';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyTableModule } from 'ngx-tethys/table';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { ThyTimelineModule } from 'ngx-tethys/timeline';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyTransferModule } from 'ngx-tethys/transfer';
import { ThyTreeModule } from 'ngx-tethys/tree';
import { ThyTreeSelectModule } from 'ngx-tethys/tree-select';
import { ThyUploadModule } from 'ngx-tethys/upload';
import { warnDeprecation } from 'ngx-tethys/util';
import { ThyVoteModule } from 'ngx-tethys/vote';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThySegmentModule } from 'ngx-tethys/segment';
import { ThyTabsModule } from 'ngx-tethys/tabs';

const TETHYS_MODULES = [
    ThyLayoutModule,
    ThyButtonModule,
    ThyBackTopModule,
    ThyIconModule,
    ThyImageModule,
    ThyPopoverModule,
    ThyBadgeModule,
    ThyTableModule,
    ThyGridModule,
    ThyAvatarModule,
    ThyLabelModule,
    ThyNavModule,
    ThyMenuModule,
    ThyPaginationModule,
    ThyNotifyModule,
    ThyMessageModule,
    ThyCardModule,
    ThyLoadingModule,
    ThyAlertModule,
    ThyActionMenuModule,
    ThyTreeModule,
    ThyEmptyModule,
    ThySwitchModule,
    ThyTransferModule,
    ThyStrengthModule,
    ThyFormModule,
    ThyInputModule,
    ThyInputNumberModule,
    ThyDropdownModule,
    ThyCopyModule,
    ThyCheckboxModule,
    ThySelectModule,
    ThySlideModule,
    ThyRadioModule,
    ThySelectModule,
    ThyPropertyOperationModule,
    ThyUploadModule,
    ThyDateRangeModule,
    ThySharedModule,
    ThyListModule,
    ThyTreeSelectModule,
    ThyStepperModule,
    ThyCascaderModule,
    ThyDialogModule,
    ThyTooltipModule,
    ThyProgressModule,
    ThyBreadcrumbModule,
    ThyArrowSwitcherModule,
    ThyFlexibleTextModule,
    ThyDragDropModule,
    ThySelectCommonModule,
    ThySkeletonModule,
    ThyVoteModule,
    ThyResultModule,
    ThyMentionModule,
    ThyDatePickerModule,
    ThyTimelineModule,
    ThyDividerModule,
    ThyTimePickerModule,
    ThyStatisticModule,
    ThyAutocompleteModule,
    ThyAnchorModule,
    ThyAffixModule,
    ThySliderModule,
    ThyCalendarModule,
    ThyFullscreenModule,
    ThyGuiderModule,
    ThyResizableModule,
    ThyCollapseModule,
    ThyRateModule,
    ThySegmentModule,
    ThyTabsModule
];
```

<label type="info">附录2</label> Markdown 样式和指令清单
- [markdown/markdown.scss](https://github.com/atinc/ngx-tethys/blob/v12.x/src/markdown/markdown.scss)
- [thy-markdown-parser.directive.ts](https://github.com/atinc/ngx-tethys/blob/v12.x/src/markdown/thy-markdown-parser.directive.ts)
- [thy-markdown-parser.service.ts](https://github.com/atinc/ngx-tethys/blob/v12.x/src/markdown/thy-markdown-parser.service.ts)
- [thy-markdown-text-parser.directive.ts](https://github.com/atinc/ngx-tethys/blob/v12.x/src/markdown/thy-markdown-text-parser.directive.ts)
