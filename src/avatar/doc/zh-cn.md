---
category: display
title: Avatar
subtitle: 头像
---

<alert>显示用户头像的组件。</alert>

## 何时使用

当需要显示用户头像时。

## 模块导入
```ts
import { ThyAvatarModule } from "ngx-tethys/avatar";
```

## 类型

目前支持两种类型：图片和名称，名称支持中文和英文
- 名称是中文时显示姓名
- 名称是英文时以空格分割，取前两个单词的首字母大写
- 图片资源加载失败，或者未上传图片，则采用文字默认头像

```
<thy-avatar thyName="Peter" class="mr-2"></thy-avatar>
<thy-avatar thyName="张学友" class="mr-2"></thy-avatar>
<thy-avatar thyName="Peter" class="mr-2" [thySrc]="avatarSrc"></thy-avatar>

```

<example name="thy-avatar-basic-example" />

## 名称
头像名称（thyName）有两种作用：
- 当`thySrc`为空时，生成上述示例中的头像地址
- 其次就是除了头像地址外，还可以展示名称，需要设置参数`thyShowName="true"`

```
<thy-avatar class="mr-1" thyName="张学友" thyShowName="true"></thy-avatar>
<thy-avatar [thySrc]="avatarSrc" thyName="张学友" thyShowName="true"></thy-avatar>

```
<example name="thy-avatar-name-example" />

## 大小
头像固定的字符串大小为： `xxs`、`xs`、`sm`、`md`、`lg`，对应的大小为：`22px`、`24px`、`32px`、`36px`、`48px`，除此之外还支持 `28px`, `68px`, `110px`, `160px`， size 设置为 `md` 和 `36` 是等价的，推荐使用 `md`。

<example name="thy-avatar-size-example" />

## 自定义
对于大部分系统而言，用户的头像只会存储后面的 Path，不会把全路径存储在用户的`avatar`属性上，为了让使用的时候更简单，API 返回的数据直接可以使用，我们提供了扩展 `ThyAvatarService` 的方法，只需要创建自定义头像服务类重载`srcTransform`转换即可实现统一`src`转换。

```ts
@Injectable()
export class CustomAvatarService extends ThyAvatarService {
    constructor(private domSanitizer: DomSanitizer) {
        super();
    }

    avatarSrcTransform(src: string, size: number): string {
        return `https://cdn.example.com/assets/images/${src}`;
    }
}
```

这样在使用 `thy-avatar` 组件的时候就不需要传入全路径。

```html
<thy-avatar thySrc="one-avatar.jpg"></thy-avatar>
```
生成头像地址的全路径为：`https://cdn.example.com/assets/images/one-avatar.jpg`
