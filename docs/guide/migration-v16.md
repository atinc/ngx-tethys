---
title: 16.x 升级指南
path: 'migration-v16'
order: 991
hidden: true
---

<alert>本文档将帮助你从 ngx-tethys 15.x 版本升级到 16.x 版本。</alert>

## 开始之前

- 首先确保你 `Node.js ^14.15.0 || >>=16.10.0`
- 创建新的分支进行升级，或者把当前分支备份

## 自动升级
执行 `ng update ngx-tethys` 命令自动升级, 这个命令核心处理如下事项：
- 升级 `ngx-tethys` 到 `16.x` 版本，并修改 package.json 中的依赖版本号
- 会自动把依赖的 CDK 和 Angular 库都升级到 `16.x` 版本，并修改 package.json 中的依赖版本号
- 自动修改`thyLabel`组件为`thyTag`

## 破坏性修改

- `thyLabel` 组件从组件库中移除，请使用`thyTag`组件代替

<label type="info">附录1</label> 所有`thyLabel`与`thyTag`对应的修改列表


- 模板
   - thySize:sm20 md24 lg28 不变
      - 不设置值（default 22）-> md 24 
      - default 22 -> md 24
      - xlg 36 -> lg 28
   - thyHasHover 直接变为 thyHoverable
   - thyIconPrefix 删除
   - thyBeforeIcon 前插入个名字是 thyBeforeIcon 值的 icon  <thy-icon  thyIconName="smile">
   - thyAfterIcon 后插入个名字是 thyAfterIcon 值的 icon  <thy-icon  thyIconName="smile" class=“ml-1”>
   - thyLabel default | primary | success | info | warning | danger  | emboss-default | emboss-primary | emboss-warning | emboss-danger | outline
      - thyLabel=default -> thyColor=default
      - thyLabel=primary -> thyColor=primary
      - thyLabel=success -> thyColor=success
      - thyLabel=info -> thyColor=info
      - thyLabel=warning -> thyColor=warning
      - thyLabel=danger -> thyColor=danger
      - thyLabel= emboss-default -> thyColor=default  thyTheme="weak-fill"
      - thyLabel= emboss-primary -> thyColor=primary  thyTheme="weak-fill"
      - thyLabel= emboss-warning -> thyColor=warning  thyTheme="weak-fill"
      - thyLabel= emboss-danger -> thyColor=danger  thyTheme="weak-fill"
      - thyLabel= outline -> thyTheme=“outline” 
   - thyLabelColor 直接变为 thyColor
   - thyBackgroundOpacity 删除
   - thyLabelType  state | pill
      - thyLabelType = state：thyShape= rectangle
      - thyLabelType = pill：thyShape= pill
   - thyOnRemove 删除
- ts
   - ThyLabelTypeSize -> ThyTagSize
   - ThyLabelType -> ThyTagColor
   - ThyLabelComponent -> ThyTagComponent
   - ThyLabelModule -> ThyTagModule
   - 导入路径
- stylesheets
   - .thy-label -> .thy-tag
   - .thy-label-default -> .thy-tag-default
   - .thy-label-primary -> .thy-tag-primary
   - .thy-label-success -> .thy-tag-success
   - .thy-label-info -> .thy-tag-info
   - .thy-label-warning -> .thy-tag-warning
   - .thy-label-danger -> .thy-tag-danger
   - .thy-label-sm -> .thy-tag-sm
   - .thy-label-md -> .thy-tag-md
   - .thy-label-lg -> .thy-tag-lg
   - .thy-label-pill -> .thy-tag-pill
   - .thy-label-emboss-default -> .thy-tag-weak-fill-default
   - .thy-label-emboss-primary -> .thy-tag-weak-fill-primary
   - .thy-label-emboss-warning -> .thy-tag-tag-weak-fill-warning
   - .thy-label-emboss-danger -> .thy-tag-tag-weak-fill-danger
   - .thy-label-outline -> .thy-tag-outline

