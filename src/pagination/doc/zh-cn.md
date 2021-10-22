---
category: display
title: Pagination
subtitle: 分页
---

<alert>列表数据展示分页组件。</alert>

## 何时使用  
- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## 模块导入
```
import { ThyPaginationModule } from "ngx-tethys/pagination";
```
## 如何使用

最基本的使用如下：

```
<thy-pagination
  [(thyPageIndex)]="currentIndex"
  [thyPageSize]="10"
  [thyTotal]="50"
  [thyShowQuickJumper]="false"
></thy-pagination>
```

展示效果如下：

<example name="thy-pagination-basic-example" />


## 全局配置
Pagination 支持全局统一配置组件每页的默认条数，上一页下一页按钮的显示文本等许多个性化的配置，具体的配置如下:

```
@NgModule({
    ...,
    imports: [ThyPaginationModule],
    providers: [
        {
            provide: THY_PAGINATION_CONFIG,
            useValue: {
                boundaryLinks: false,
                directionLinks: true,
                pageSize: 20,
                maxCount: 7,
                rangeCount: 5,
                showQuickJumper: true,
                firstText: '首页',
                lastText: '尾页',
                previousText: '',
                nextText: '',
                firstIcon: '',
                lastIcon: '',
                previousIcon: 'angle-left',
                nextIcon: 'angle-right',
                totalPagesFormat: '共{total}页'
            }
        }
    ]
})
```
