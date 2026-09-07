---
title: 22.x 升级指南
path: 'migration-v22'
order: 985
---

<alert>本文档将帮助你从 ngx-tethys 21.x 版本升级到 22.x 版本。</alert>

## 开始之前

- 首先确保你 `Node.js ^22.22.3 || ^24.15.0 || >=26.0.0`
- 升级 Angular 至 `^22.0.0`（`@angular/core`、`@angular/cdk` 等需同步升级）
- 升级 TypeScript 至 `~6.0`（Angular 22 要求）
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级

执行 `ng update ngx-tethys` 命令自动升级，该命令会：

- 升级 `ngx-tethys` 及依赖的 CDK、Angular 库到 `22.x`，并更新 `package.json`
- 运行 schematic 自动迁移模板、样式与 TypeScript 代码（各组件详情见下文 **自动迁移** 小节）

若已手动升级依赖，或仅需重新执行代码迁移，可单独运行：

```bash
ng generate ngx-tethys:migrate-22
```

该命令仅执行 v22 代码迁移，不会修改 `package.json` 中的依赖版本。

## 破坏性修改

以下按组件分类，分别列出 **破坏性更改** 与 **自动迁移**。

---

### 1. thy-button（`thyButton` 指令）

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- 新增 `thyAppearance`（`fill` / `outline` / `link`），`thyButton` 仅表示颜色（`default` / `primary` / `info` / `warning` / `danger` / `success`）
- 旧复合 type 需拆分，对照如下：

| 旧 `thyButton` / `thyType` | 新写法 |
|---------------------------|--------|
| `outline-primary` | `thyAppearance="outline" thyButton="primary"` |
| `outline-default` | `thyAppearance="outline" thyButton="default"` |
| `link-secondary` | `thyAppearance="link" thyButton="default"` |
| `link` | `thyAppearance="link" thyButton="primary"` |
| `link-danger` 等 `link-*` | `thyAppearance="link" thyButton="{color}"` |
| `secondary` | `thyButton="primary"` |
| `primary-square` 等 `*-square` | 去掉 `-square`（如 `primary-square` → `primary`） |
| `link-danger-weak` | `class="link-danger-weak"`（非 Button API） |

- 尺寸类型 `ButtonGroupSize` 重命名为 `ThyButtonSize`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`
- 旧复合 `thyButton` / `thyType` 改写为 `thyAppearance` + 颜色 type；`*-square` 去掉后缀；`link-danger-weak` 改为 CSS class
- TypeScript 中 `ButtonGroupSize` → `ThyButtonSize`

---

### 2. thy-button-group

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- `thyType="outline-default" | outline-primary"` 仍是独立 API，不要求同步改造为 `thyAppearance`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`

---

### 3. thy-button-icon（`thyButtonIcon` 指令）

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`

---

### 4. thy-input

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- `type` 重命名为 `thyType`
- `placeholder` 重命名为 `thyPlaceholder`
- 尺寸类型 `InputSize`、`ThyInputSize` 重命名为 `ThyFormControlSize`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`
- `type` → `thyType`；`placeholder` → `thyPlaceholder`
- TypeScript 中 `InputSize` / `ThyInputSize` → `ThyFormControlSize`

---

### 5. thy-input-search

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- `placeholder` 重命名为 `thyPlaceholder`
- 输出 `(clear)` 重命名为 `(thyClear)`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`
- `placeholder` → `thyPlaceholder`；`(clear)` → `(thyClear)`

---

### 6. thy-input-number / thy-input-group

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- `thy-input-group` 不再支持 `xs` 尺寸（可选值：`sm` / `md` / `lg`）

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`

---

### 7. thyInput 指令

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- 仍使用原生 HTML `placeholder`，不受 `thyPlaceholder` 重命名影响

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`

---

### 8. thy-select / thy-custom-select / thy-native-select / thy-tree-select

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- `thyPlaceHolder` 重命名为 `thyPlaceholder`
- 尺寸类型 `SelectControlSize` 重命名为 `ThyFormControlSize`
- `thy-tree-select` 移除 `thyIconType` 及类型 `ThyTreeSelectType`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`
- `thyPlaceHolder` → `thyPlaceholder` (thy-select / thy-custom-select)
- TypeScript 中 `SelectControlSize` → `ThyFormControlSize`
- 移除 `thy-tree-select` 上的 `thyIconType` 和 `ThyTreeSelectType`

---

### 9. thy-cascader（`thy-cascader` 指令）

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`

---

### 10. thy-select-control（`thySelectControl` 指令）

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- 尺寸类型 `SelectControlSize` 重命名为 `ThyFormControlSize`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`
- TypeScript 中 `SelectControlSize` → `ThyFormControlSize`

---

### 11. thy-date-picker / thy-range-picker / thy-month-picker / thy-quarter-picker / thy-week-picker / thy-year-picker

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- `thyPlaceHolder` 重命名为 `thyPlaceholder`
- 类型 `CompatibleDate` 重命名为 `ThyCompatibleDate`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`
- `thyPlaceHolder` → `thyPlaceholder`
- TypeScript 中 `CompatibleDate` → `ThyCompatibleDate`

---

### 12. thyDatePicker / thyRangePicker 指令

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- `thyPlaceHolder` 重命名为 `thyPlaceholder`
- 移除 `thyOffset`、`thyHasBackdrop`，合并到 `[thyPopoverOptions]`，例如：`[thyPopoverOptions]="{ offset: 8, hasBackdrop: false }"`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`
- `thyPlaceHolder` → `thyPlaceholder`
- `thyOffset` / `thyHasBackdrop` 合并进 `[thyPopoverOptions]`；默认值（`offset: 4`、`hasBackdrop: true`）时直接移除
- 若元素上**已存在** `[thyPopoverOptions]`，**不会**自动迁移，需完全手动合并（详见 **手动检查**）

---

### 13. thy-time-picker

**破坏性更改**

- 默认尺寸从 36px 改为 md（32px）；需保持 36px 视觉请设 `thySize="lg"`
- 尺寸类型 `TimePickerSize` 重命名为 `ThyFormControlSize`

**自动迁移**

- 未设置 `thySize` 时补回 `thySize="lg"`；`thySize="default"` / `thySize=""` 替换为 `thySize="lg"`
- TypeScript 中 `TimePickerSize` → `ThyFormControlSize`

---

### 14. Autocomplete（`thyAutocomplete`）

**破坏性更改**

- `thyAutocompleteComponent` 重命名为 `thyAutocomplete`

**自动迁移**

- `thyAutocompleteComponent` → `thyAutocomplete`

---

### 15. thy-action

**破坏性更改**

- `thyTheme` 重命名为 `thyAppearance`

**自动迁移**

- `thyTheme` → `thyAppearance`

---

### 16. thy-tag

**破坏性更改**

- `thyTheme` 重命名为 `thyAppearance`
- `weak-fill` 外观值改名为 `subtle`

**自动迁移**

- `thyTheme` → `thyAppearance`
- `thyAppearance="weak-fill"` / `thyTheme="weak-fill"` 替换为 `thyAppearance="subtle"`
- TypeScript 运行时赋值（如 `theme.set('weak-fill')`）及字符串内嵌旧 CSS 类名（如 `thy-tag-weak-fill-*`）无自动迁移，需手动处理（详见 **手动检查**）

---

### 17. thy-header

**破坏性更改**

- `thyHasBorder` 重命名为 `thyDivided`
- 移除 `thyIconPrefix` 及字体图标支持；`thyIcon` 仅接受 SVG 图标名

**自动迁移**

- `thyHasBorder` → `thyDivided`
- 移除 `thyIconPrefix`；若 `thyIcon` 含 `wtf` 字体图标前缀，迁移会输出警告（需手动改为 SVG 图标名）

---

### 18. thy-badge

**破坏性更改**

- `thyContext` 重命名为 `thyContent`
- 移除 `thyIsDot`、`thyIsHollow`；请改用 `thy-dot` 组件实现圆点/空心点效果

**自动迁移**

- `thyContext` → `thyContent`
- 移除 `thyIsDot`、`thyIsHollow`

---

### 19. thy-nav（`thyNavItem` / `thyNavItemActive` 指令）

**破坏性更改**

- `thyNavLink` 重命名为 `thyNavItem`
- `thyNavLinkActive` 重命名为 `thyNavItemActive`
- 移除 `thyInsideClosable`，改用 `thyPopoverOptions.insideClosable`

**自动迁移**

- `thyNavLink` → `thyNavItem`；`thyNavLinkActive` → `thyNavItemActive`
- `thyInsideClosable` 默认 `true` 时移除属性，`false` 时写入 `[thyPopoverOptions]="{ insideClosable: false }"`
- 若元素上**已存在** `[thyPopoverOptions]`，**不会**自动迁移，需完全手动合并（详见 **手动检查**）

---

### 20. thy-table

**破坏性更改**

- 移除 `thyShowHeader`，改用 `thyHeadless`（语义相反：`thyHeadless="true"` 等价于旧 `thyShowHeader="false"`）
- 移除 `thyLoadingText`（`thy-button` 的 `thyLoadingText` 仍保留）
- `ThyTableEmptyOptions` 移除 `translationKey`、`translationValues`、`entityName`、`entityNameTranslateKey`；请改用 `message` 或自行传入翻译后的文案（详见 **30. thy-empty**）

**自动迁移**

- `thyShowHeader="true"` 时移除属性；`false` 时改为 `thyHeadless`；动态绑定时取反


---

### 21. thy-card / thy-card-header / thy-card-content

**破坏性更改**

- 移除 `thyHasLeftRightPadding`
- `thySize` 仅保留在 `thy-card` 上；`thy-card-header` / `thy-card-content` 不再支持 `thySize`

**自动迁移**

- 移除 `thyHasLeftRightPadding`
- 若 `thy-card-header` / `thy-card-content` 上有 `thySize` 且 card 本身没有，则上移到 `thy-card`

---

### 22. thy-divider

**破坏性更改**

- 移除 `thyDeeper`，改用 `thyColor="light"` 表示较深分割线
- `thyColor="deeper"` 不再有效（`$divider-colors` 中已移除 `deeper`），请统一改用 `thyColor="light"`

**自动迁移**

- `thyDeeper` 迁移为 `thyColor="light"`；已有 `thyColor` 时仅移除 `thyDeeper`
- CSS 类名 `thy-divider-deeper` 替换为 `thy-divider-light`

---

### 23. thy-avatar

**破坏性更改**

- `thyShowRemove` 重命名为 `thyRemovable`
- `(thyOnRemove)` 重命名为 `(thyRemove)`
- `ThyAvatarService.avatarSrcTransform()` 重命名为 `srcTransform()`

**自动迁移**

- `thyShowRemove` → `thyRemovable`；`(thyOnRemove)` → `(thyRemove)`
- `avatarSrcTransform()` → `srcTransform()`

**手动检查**

- **`ThyAvatarService` 子类中的 `avatarSrcTransform` 方法定义**：自动迁移仅改写 `ThyAvatarService` 类型变量上的**调用**（如 `this.thyAvatarService.avatarSrcTransform(...)` → `srcTransform(...)`），**不会**删除或重命名子类里的方法声明；若子类仍保留仅为兼容的 `avatarSrcTransform()` 包装方法，需手动删除，只保留 `srcTransform()` 实现


---

### 24. thy-anchor-link（原 `thy-link`）

**破坏性更改**

- 组件重命名为 `thy-anchor-link`
- 模板引用 `#ref="thyLink"` 重命名为 `#ref="thyAnchorLink"`

**自动迁移**

- `thy-link` → `thy-anchor-link`；`thyLink` → `thyAnchorLink`

---

### 25. thy-dialog

**破坏性更改**

- `ThyDialogSizes.supperLg` 重命名为 `ThyDialogSizes.superLg`
- CSS 类名 `dialog-supper-lg` 修正为 `dialog-super-lg`

**自动迁移**

- `ThyDialogSizes.supperLg` → `ThyDialogSizes.superLg`
- CSS 类名 `dialog-supper-lg` → `dialog-super-lg`

---

### 26. thy-tabs

**破坏性更改**

- 类型 `ThyActiveTabInfo` 重命名为 `ThyActiveTabValue`

**自动迁移**

- `ThyActiveTabInfo` → `ThyActiveTabValue`

---

### 27. thy-progress

**破坏性更改**

- 类型 `ThyStackedValue` 重命名为 `ThyProgressStackedValue`

**自动迁移**

- `ThyStackedValue` → `ThyProgressStackedValue`

---

### 28. thy-property

**破坏性更改**

- `ThyPropertyItem.setKeepEditing()` 重命名为 `setEditing()`

**自动迁移**

- `setKeepEditing()` → `setEditing()`

---

### 29. thy-empty

**破坏性更改**

- 移除 `thyTranslationKey`、`thyTranslationValues`、`thyEntityName`、`thyEntityNameTranslateKey`
- 移除 `ThyEmptyConfig` 及 `ThyTranslate` 集成
- 未传入 `thyMessage` 时使用内置 locale 默认文案（中文为「暂无数据」）

**迁移方式**

- 直接传入 `thyMessage`：`<thy-empty thyMessage="没有任何数据"></thy-empty>`
- 多语言场景在调用方自行翻译后传入：`<thy-empty [thyMessage]="'common.tips.NO_RESULT' | translate"></thy-empty>`
- 若通过 `ThyTableEmptyOptions` 配置空状态，改用 `message` 字段

**自动迁移**

- 无

---

### 30. 样式（Sass / CSS）

**破坏性更改**

以下 Sass 变量已删除，请改用对应的 `lg` 变量或 `$gray-300`：

| 旧变量 | 新变量 |
|--------|--------|
| `$input-btn-height` | `$input-btn-height-lg` |
| `$input-btn-line-height` | `$input-btn-line-height-lg` |
| `$input-btn-padding-x` | `$input-btn-padding-x-lg` |
| `$input-btn-padding-y` | `$input-btn-padding-y-lg` |
| `$input-padding-x` | `$input-padding-x-lg` |
| `$input-padding-y` | `$input-padding-y-lg` |
| `$input-border-radius` | `$input-border-radius-lg` |
| `$input-font-size` | `$input-font-size-lg` |
| `$btn-line-height` | `$btn-line-height-lg` |
| `$btn-padding-x` | `$btn-padding-x-lg` |
| `$btn-padding-y` | `$btn-padding-y-lg` |
| `$btn-icon-circle-padding-base` | `$btn-icon-circle-padding-lg` |
| `$btn-icon-only-padding-x` | `$btn-icon-only-padding-x-lg` |
| `$select-control-height-default` | `$select-control-height-lg` |
| `$select-control-padding-y-default` | `$select-control-padding-y-lg` |
| `$divider-deeper-color` | `$gray-300` |
| `$btn-base-min-width` | 按按钮尺寸选用 `$btn-xs-min-width` / `$btn-sm-min-width` / `$btn-md-min-width` / `$btn-lg-min-width`（旧默认 36px 视觉对应 `$btn-lg-min-width`） |

此外：

- `$editable-padding-x` / `$editable-padding-y` 默认值改为引用 md 系列变量（视觉从 36px 变为 32px）；大尺寸仍可用 `$editable-padding-x-lg` / `$editable-padding-y-lg`
- Bootstrap 层 `$input-line-height`、`$input-height` 改为引用 md 系列变量

**自动迁移**

- 替换上述 Sass 变量引用，支持带命名空间写法（如 `variables.$input-padding-x`）及 `.scss`、`.sass` 两种语法

---



## 手动检查

以下场景自动迁移无法完全覆盖，升级后请重点检查：

- 本文档所列旧 API 均已**直接移除**；未执行 `ng update` 或未手动改动的代码将编译失败
- **`thyPopoverOptions` 合并迁移**（涉及 `thy-nav` 与 `thyDatePicker` / `thyRangePicker` 指令）：
  - **`thy-nav`**：`thyInsideClosable` 已移除，改用 `thyPopoverOptions.insideClosable`
    - **会自动迁移**（元素上**尚未**绑定 `[thyPopoverOptions]` 时）：
      - `thyInsideClosable="true"`、`thyInsideClosable` 或 `[thyInsideClosable]="true"` → 直接删除（默认值 `true`）
      - `thyInsideClosable="false"` 或 `[thyInsideClosable]="false"` → `[thyPopoverOptions]="{ insideClosable: false }"`
      - `[thyInsideClosable]="insideClosable"` → `[thyPopoverOptions]="{ insideClosable: insideClosable }"`
    - 元素上**已存在** `[thyPopoverOptions]` 时，形如`<thy-nav thyInsideClosable="false" [thyPopoverOptions]="popoverOptions"></thy-nav>`，**不会自动迁移**，需自行删除 `thyInsideClosable`，并将 `insideClosable` 合并进 `popoverOptions`

  - **`thyDatePicker` / `thyRangePicker` 指令**：`thyOffset`、`thyHasBackdrop` 已移除，合并到 `[thyPopoverOptions]`
    - **会自动迁移**（元素上**尚未**绑定 `[thyPopoverOptions]` 时）：
      - 默认值 `thyOffset="4"`、`[thyOffset]="4"`、`thyHasBackdrop="true"`、`thyHasBackdrop`、`[thyHasBackdrop]="true"` → 直接删除
      - `thyHasBackdrop="false"` 或 `[thyHasBackdrop]="false"` → `[thyPopoverOptions]="{ hasBackdrop: false }"`
    - 元素上**已存在** `[thyPopoverOptions]` 时，形如`<div thyDatePicker [thyOffset]="0" [thyHasBackdrop]="false" [thyPopoverOptions]="popoverOptions"></div>`，**不会自动迁移**，需自行删除 `thyOffset` / `thyHasBackdrop`，并将 `offset` / `hasBackdrop` 合并进 `popoverOptions`
- `thy-badge` 不再支持 `thyIsDot` / `thyIsHollow`
- `thy-header` 不再支持 `thyIconPrefix` 及字体图标，`thyIcon` 仅接受 SVG 图标名；使用 `wtf` 字体图标的场景，需手动替换为 SVG 图标名
- `thy-empty` 不再支持 `thyTranslationKey`、`thyTranslationValues`、`thyEntityName`、`thyEntityNameTranslateKey` 及 `ThyEmptyConfig` 翻译集成，需改为 `thyMessage`；`ThyTableEmptyOptions` 不再支持 `translationKey`、`translationValues`、`entityName`、`entityNameTranslateKey` 翻译集成，需改为 `message`
- **Button / 尺寸动态绑定**（自动迁移仅支持字面量）：
  - Button 变量：形如 `[thyButton]="buttonType"` 且 `buttonType` 可能为 `'outline-primary'` 等旧复合值时，**不会自动迁移**；需手动改为 `[thyButton]="'primary'" thyAppearance="outline"`，或在组件中拆分 `buttonColor` / `buttonAppearance` 两个变量
  - Button 三元表达式：形如 `[thyButton]="shouldDisplayReview ? 'outline-default' : 'danger'"`，需要手动拆分
  - 尺寸：形如 `[thySize]="size"` **不会自动补** `lg`，需要手动检查
- **`thy-tag` 运行时赋值 / 字符串中的旧值**（Schematics 仅处理模板字面量）：
  - TypeScript 中形如 `this.theme.set('weak-fill')` **不会自动迁移**；v22 合法值为 `'outline' | 'fill' | 'subtle'`，需改为 `'subtle'`（若模板为 `[thyAppearance]="theme()"` 等同理）
  - i18n / TS 字符串内嵌旧 CSS 类名：形如 `thy-tag-weak-fill-primary` **不会自动替换**，需改为 `thy-tag-subtle-primary`（其它颜色后缀同理，如 `thy-tag-weak-fill-default` → `thy-tag-subtle-default`）
- **`ThyAvatarService` 子类中的 `avatarSrcTransform` 方法定义**：自动迁移仅改写 `ThyAvatarService` 类型变量上的**调用**（如 `this.thyAvatarService.avatarSrcTransform(...)` → `srcTransform(...)`），**不会**删除或重命名子类里的方法声明；若子类仍保留仅为兼容的 `avatarSrcTransform()` 包装方法，需手动删除，只保留 `srcTransform()` 实现
- **移除的 CSS 类**（自定义样式若依赖这些 class 会失效，请改用新写法或移除选择器）：
  - `thy-divider-deeper` → `thy-divider-light`（`thyColor="light"`）
  - `thy-card--clear-left-right-padding`（移除 `thyHasLeftRightPadding` 后不再生成）
  - `thy-card-header--{sm,md,lg}`、`thy-card-content--sm`（`thySize` 仅保留在 `thy-card` 上）
  - `thy-badge-dot` / `thy-badge-hollow`（改用 `thy-dot` 组件）

