---
title: Immutable
subtitle: 不可变
---

<alert>轻量级的不可变工具函数。</alert>

## 何时使用

当需要修改对象和数组时使用。

## 模块导入
```ts
import { produce } from "@tethys/cdk/immutable";
```

## 数组操作

### add

```ts
const users =  [
    { _id: '1', name: 'user 1' },
    { _id: '2', name: 'user 2' }
];
const newUsers = produce(users).add({ _id: '3', name: 'user 3' });
```


### update
```ts
const users =  [
    { _id: '1', name: 'user 1' },
    { _id: '2', name: 'user 2' }
];
const newUsers = produce(users).update('1', { name: 'user 1 new' });
```

### remove
```ts
const users =  [
    { _id: '1', name: 'user 1' },
    { _id: '2', name: 'user 2' }
];
const newUsers = produce(users).remove('1');
```

### move
```ts
const users =  [
    { _id: '1', name: 'user 1' },
    { _id: '2', name: 'user 2' }
];
const newUsers = produce(users).move('1', { afterId: '2' });
const newUsers = produce(users).move('1', { toIndex: 1 });
```

## 对象操作

### set
```ts
const user =  { _id: '1', name: 'user 1', address: { postCode: '1000000', street: ['Beijing', 'Hai Dian'] } };
const newUser = produce(user).set("address.postCode", "1000001");
const newUser = produce(user).set("name", "user 1 new ");
```

### get
```ts
const user =  { _id: '1', name: 'user 1', address: { postCode: '1000000', street: ['Beijing', 'Hai Dian'] } };
const postCode = produce(user).get("address.postCode");
const name = produce(user).get("name");
```
