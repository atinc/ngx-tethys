---
title: 13.1.0 升级指南
path: 'migration-v13.1.0'
order: 994
label: new
---


<alert>本文档将帮助你从 ngx-tethys 13.0 版本升级到 13.1 版本。</alert>

无需特殊处理，直接修改版本号到`13.1.0`即可。

## 新组件
- 新增`Action`组件模块，另一个即时操作组件，包含`thy-action`(`thyAction`指令)和`thy-actions`组件
- 新增`Dot`组件模块，展示点的组件，包含`thy-dot`(`thyDot`指令)组件
- 新增`Segment`组件模块，分段控制器组件，包含`thy-segment`和`thy-segment-item`组件
- 新增`Tag`组件模块，标签组件，包含`thy-tag`(`thyTag`指令)组件，用于替换之前的`thy-label`

## 新特性
- Layout 侧边栏新增 `thy-sidebar-header` `thy-sidebar-content`和`thy-sidebar-footer`布局组件，并调整样式
- Layout`thy-header`组件大小和样式调整，'sm' | 'md' | 'lg' | 'xlg' 高度分别为 48px, 52px, 56px, 60px(目前100px)
- Layout`thy-sidebar`新增`thyCollapsible`和`thyCollapsed`展开收起功能以及宽度拖拽的样式调整
- Layout`thy-sidebar`新增`thyTrigger`设置展示收起的触发器自定义模板，默认显示展开收起的圆形图标，设置为 null 表示不展示触发元素，手动控制展开收起状态
- Layout`thy-sidebar`新增`thyTheme`: 'white' | 'light' | 'dark' 主题，dark 为后续扩展保留
- Table`thy-table`新增`thyLayoutFixed`属性设置表格布局固定模式
- Table`thy-table`新增`thyMinWidth`属性设置表格最小宽度
- Table`thy-table-column`新增`thyMinWidth`属性设置列最小宽度（需要注意只有存在宽度`auto`列的情况才会有效）
- Table`thy-table-column`新增`thyOperational`属性设置操作列
- Table`thy-table-column`新增`thySecondary`属性设置次要列，次要列颜色变淡
- Table`thy-table-column`新增`thySortable`、`thySortDirection`和`(thySortChange)`设置列排序功能
- Table`thy-table`thyTheme 新增`boxed`模式
- Table`thy-table`大小和样式调整，'xs' | 'sm' | 'md' | 'lg' | 'xlg' 高度分别为: 44px, 48px, 52px, 56px, 60px(目前64px)
- Nav`thy-nav`新增`pulled`模式，替换之前的`primary`，将来会逐步把 `primary | secondary | secondary-divider | thirdly` 类型去掉，将来会支持 `pulled | tabs | lite | pill | slider | wrapped`模式
- Nav`thy-nav`组件调整样式和大小，'sm' | 'md' | 'lg'  高度分别为: 48px, 52px, 56px，大小和类型无关
- Nav`thyNavLink`改名为`thyNavItem`，暂时保留了`thyNavLink`，将来会去除
- Nav`thyNavItem` 新增`thyNavItemDisabled`属性设置禁用导航项
- Space 组件间距调整，大小支持 'zero' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' 和自定义数字，分别为: 0px, 4px, 8px, 12px, 16px, 20px, 24px, 28px
- Menu`thy-menu`新增`thyTheme`属性设置主题, 值为: `'compact' | 'loose' | 'dark'`, 默认为`compact`
- Menu`thy-menu-group`新增`thyCollapsible`和`thyCollapsed`设置展开收起，默认不支持展开收起，同时支持`headerContent`设置分组头内容
- Menu`thy-menu-item`新增`thyIcon`设置图标
- Divider`thy-divider`组件新增`thyColor`设置分割线的颜色，默认 #eee，light 为 #ddd，primary 主色，success 成功色，warning 警告色，danger 危险色
- Card`thy-card`组件大小调整，可选值为：sm、md、lg
- Card`thy-card`组件新增`thyBordered`设置卡片边框
- Empty`thy-empty`组件修改默认空图标以及样式，并提供`preset-light`内置图标，适用有背景色的场景
- Space`thy-space`组件调整大小，thySize 支持 'zero' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' 和自定义数字大小
- 修改`thy-dropdown-menu`菜单和 Popover 弹出框的阴影和边框
- Breadcrumb 样式调整，Item 支持图标+文字的场景
- Dialog 修改间距，默认去除头部边框，`thy-dialog-header`新增`thyDivided`设置边框
- Slide 修改阴影和边框
- Calendar 修改阴影和边框
- Dropdown 默认设置`hasBackdrop`为`false`，修改`placement`默认为`bottomLeft`
- Dropdown`thyDropdown` 支持模板和组件菜单且新增基类`ThyDropdownAbstractMenu`实现菜单组件
- Dropdown 使用`thy-divider`替换`thy-dropdown-menu-divider`
- Dropdown 添加`thyActiveClass`实现弹出菜单的 Origin 元素激活样式
- Input 修改图标颜色为 $gray-400(#cacaca)，图标大小为 14px
- Input`thy-input-group`新增`prefix`和`suffix`模板代替之前`thy-input`组件的`append`和`prepend`，实现输入框的完全自定义
- Input`thy-input-search`组件`thyTheme`属性新增`transparent`实现透明无边框的效果
- Progress 设置一个最小宽度，当百分比很低的时候可以展示进度
- Alert 新增`thyTheme`属性支持`'fill' | 'bordered' | 'naked'`，以及样式调整
- Select 新增`thyAutoActiveFirstItem`属性设置是否自动 Active 第一个元素
- Badge 新增`thyContent`替换`thyContext`
- Styles 修改 spacer to 0-10(4px、8px、12px、16px、20px、24px、28px、32px、36px、40px)，和 thy-space 组件保持大小一致
- Tree 展开收起箭头颜色默认为`#999999` 移入以后改为`#666666`
- Tree ThyTreeNodeData 新增`itemClass`参数设置节点的样式类，实现自定义样式
- Image 新增`thyResolveSize`属性支持自动计算预览图片大小
- Avatar 名字的间距改为 8px
- 废弃`thy-label`组件，使用`thy-tag`替换


## 缺陷修复
- Notify 修复在模态框下弹出提示被遮盖的问题
- Transfer 修复固定列不能拖拽到非固定列的问题
- Dialog`supperLg`改为`superLg`修复单词拼写错误
- Form 修复按 Tab 键不能聚焦到下一个输入框的问题
- Progress`thy-progress`组件修改`primary`类型为主色
- Button 在`thy-button-group`组件中，only-icon 模式下的大小调整，宽高相同
- 修复 Dropdown 子菜单上下弹出被遮罩隐藏的问题
- 修复 Tree 在 safari 等有些版本的浏览器下，出现横向滚动条的问题

