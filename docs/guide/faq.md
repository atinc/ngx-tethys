---
title: 常见问题
path: 'faq'
order: 100
---

## 组件的文档是怎么生成的？
NGX-TETHYS 组件库的文档是基于 [Docgeni](https://github.com/docgeni/docgeni) 自动生成的，开箱即用的 Angular 组件文档生成工具。

## 数据修改后页面为什么没有更新

为了获得更好的性能，NGX-TETHYS 大部分组件都运行在 [OnPush](https://angular.io/api/core/ChangeDetectionStrategy) 模式下，这意味着对`@Input()`数据的直接修改将不会生效，请使用 immutable(不可变)的方式操作数组或者对象，为了方便操作，NGX-TETHYS`Util`模块内置了一个小型的 immutable 工具函数。

```ts
import { produce } from "ngx-tethys/util";

// Add Item
this.items = [ ...this.items, {
  id : `10`,
  name : `Name 10`
}];
// Or
this.items = produce(this.items).add({
  id : `10`,
  name : `Name 10`
});

// Update Item
this.items = produce(this.items, { idKey: "id" }).update('10', 'New name');

// Remove Item
this.items = this.items.filter(item => item.id !== deleteKey);
// Or
this.items = produce(this.items).remove(item => item.id === deleteKey);

```

## 模板中`thyValue="data"` `[thyValue]="data"` 与 `thyValue="{{data}}` 有什么区别?

- `thyValue="data"`方式组件收到的是字符串`data`。
- `[thyValue]="data"`方式组件收到的是组件中的变量`data`存储的值。
- `thyValue="{{data}}` 等价于 [thyValue]="data.toString()"。

如果你需要传入`number`或者`boolean`类型时，建议使用 [thyValue]="data" 的方式，当然对于`boolean`类型，`thyValue="false"`是会得到 false 的，所有组件内部都进行了转换处理。

