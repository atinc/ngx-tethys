---
category: display
title: Pagination
subtitle: 分页
---

采用分页的形式分隔长列表，每次只加载一个页面。

**何时使用** 
- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

### 基本使用

- 基本使用只需要设置一下分页参数 `当前所在分页：pageIndex`|` 每页显示大小：pageSize`| `总页数：total` 即可

```
pagination = {
    pageIndex: 1,
    pageSize: 20,
    total: 100
};
```
<example name="thy-pagination-base-example" />

