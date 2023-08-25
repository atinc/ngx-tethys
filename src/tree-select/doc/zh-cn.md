---
category: form
title: TreeSelect
subtitle: 树选择
---

<alert>选择弹出框中数据结构是树结构的组件，获取数据支持异步获取，支持单选和多选。</alert>

## 基础使用
设置符合条件的数据之后，即可以展示：
```html
<thy-tree-select 
    [thyTreeNodes]="treeSelectNodes"
    [(ngModel)]="selectedValue">
</thy-tree-select>
```
<example name="thy-tree-select-basic-example" />

## 多选
树选择还支持多选，只需要将 `thyMultiple` 设置为 `true` ,即可实现：
```html
<thy-tree-select [thyTreeNodes]="treeSelectNodes" [thyMultiple]="isMultiple" [(ngModel)]="selectedValue">
  <ng-template #treeNodeTemplate let-node>
    <thy-icon class="prefix-icon" [thyIconName]="node.expand ? 'folder-open-fill' : 'folder-fill'"></thy-icon>
    {{ node.name }}
  </ng-template>
</thy-tree-select>
```
<example name="thy-tree-select-multiple-example" />
这里还用了 `treeNodeTemplate` 来更改可选项的样式。

## 空选项
当选项为空的情况，有相关的展示样式：
```html
<thy-tree-select [thyTreeNodes]="[]"> </thy-tree-select>

```
还可以通过 `thyEmptyOptionsText` 自定义空选项的情况下的提示文本

<example name="thy-tree-select-empty-selection-example" />

## 异步获取可选项
```html
<thy-tree-select
  [thyTreeNodes]="asyncNodes"
  [thyAsyncNode]="true"
  [(ngModel)]="asyncValue"
  [thyGetNodeChildren]="fetchNodeChildren"
  thyChildCountKey="childCount"
></thy-tree-select>
```
```typescript
fetchNodeChildren(node: ThyTreeSelectNode) {
        return of([
            {
                _id: '010101',
                name: 'child-1',
                level: 2,
                icon: 'flag',
                children: []
            },
            {
                _id: '010102',
                name: 'child-2',
                level: 2,
                icon: 'flag',
                children: []
            }
        ]).pipe(delay(600));
    }
}
```

<example name="thy-tree-select-async-fetch-example" />
