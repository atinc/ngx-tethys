---
category: display
title: Table
subtitle: 表格
name: table
---


<alert>展示行列数据。</alert>

## 何时使用
- 当有大量结构化的数据需要展现时
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时


## 模块导入
```ts
import { ThyTableModule } from "ngx-tethys/table";
```

## 基本使用

```html
<thy-table [thyModel]="data" thyRowKey="id">
  <thy-table-column thyTitle="Id" thyModelKey="id"></thy-table-column>
  <thy-table-column thyTitle="Name" thyModelKey="name"></thy-table-column>
  <thy-table-column thyTitle="Age" thyModelKey="age"></thy-table-column>
  <thy-table-column thyTitle="Job" thyModelKey="job"> </thy-table-column>
  <thy-table-column thyTitle="Address" thyModelKey="address"></thy-table-column>
  <thy-table-column thyTitle="" thyClassName="thy-operation-links">
    <ng-template #cell let-row>
      <a class="link-secondary" href="javascript:;">
        <thy-icon thyIconName="user-add"></thy-icon>
      </a>
      <a class="link-danger-weak" href="javascript:;">
        <thy-icon thyIconName="trash"></thy-icon>
      </a>
    </ng-template>
  </thy-table-column>
</thy-table>
```

<!-- <example name="thy-table-basic-example" /> -->






