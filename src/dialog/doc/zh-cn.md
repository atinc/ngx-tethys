---
category: feedback
title: Dialog
subtitle: 对话框
order: 1
---

<alert>打开模态框。</alert>

## 何时使用
- 当需要在父窗体向用户弹出一个附加的对话弹框时使用。比如表单提交对话框。
- 当需要向客户提示某些谨慎操作（比如删除操作）后的二次确认时使用。

## 模块导入
```ts
import { ThyDialog } from 'ngx-tethys';

// 按需导入 ThyDialogRef, ThyDialogSizes
```

## 如何使用
Dialog组件提供了一个ThyDialog服务，用于配置和打开模态框。

### 打开组件
通过调用`open`方法并传要加载的组件和可选的配置对象可以打开对话框，`open`方法将返回一个`ThyDialogRef`的实例：

```ts
const dialogRef = dialog.open(ProfileComponent, {
  height: '400px',
  width: '600px',
});
```

`ThyDialogRef`提供了已打开对话框的一个引用，可用它来关闭对话框和接受关闭对话框后的通知。
```ts
dialogRef.afterOpened().subscribe(result => {
  console.log(`Dialog result: ${result}`); // Bar!
});
dialogRef.afterClosed().subscribe(result => {
  console.log(`Dialog result: ${result}`); // Bar!
});

dialogRef.close('Bar!');
```

通过`ThyDialog`创建的组件可以注入`ThyDialogRef`，并用它来关闭包含该组件的对话框，当关闭时，可以提供一个可选的结果值，该结果值会作为结果转发给相关事件，比如`afterClosed`。

```ts
@Component({/* ... */})
export class YourDialog {
  constructor(public dialogRef: ThyDialogRef<YourDialog>) { }

  closeDialog() {
    this.dialogRef.close('Bar!');
  }
}
```

### 打开模板

`ThyDialog`服务的`open`方法不仅支持组件，也支持打开模板`TemplateRef<T>`，模板可以通过参数传递，也可以通过`@ViewChild()`方式从视图中获取。

```ts
openProfile(template: TemplateRef<any>) {
    const dialogRef = dialog.open(template, {
        height: '400px',
        width: '600px',
    });
}
```

展示效果如下：
<example name="thy-dialog-basic-example" />

### 设置打开对话框的全局默认值

对话框的默认选项可以通过在应用根模块中为`THY_DIALOG_DEFAULT_OPTIONS`令牌提供一个`ThyDialogConfig`实例来指定。

```ts
@NgModule({
  providers: [
    { provide: THY_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }}
  ]
})
```
默认的配置如下：
```ts
const DEFAULT_OPTIONS = {
    role: 'dialog',
    hasBackdrop: true,
    backdropClass: '',
    panelClass: '',
    backdropClosable: true,
    closeOnNavigation: true,
    autoFocus: true,
    restoreFocus: true,
    restoreFocusOptions: {
      preventScroll: true
    },
    hostClass: 'thy-dialog-content'
};
```

### 设置对话框底部布局的全局默认值
对话框的底部布局默认值可以通过在应用根模块中为`THY_DIALOG_LAYOUT_CONFIG`令牌提供一个`ThyDialogLayoutConfig`实例来指定。
```ts
@NgModule({
  providers: [
    { provide: THY_DIALOG_LAYOUT_CONFIG, useValue: {
        footerAlign: 'right',
        footerDivided: true
    }}
  ]
})
```
默认的配置如下：
```ts
const DEFAULT_CONFIG = {
    footerAlign: 'left',
    footerDivided: false
};
```


### 模态框组件共享数据
如果要和对话框共享数据，可以通过`initialState`参数把信息传给该组件。

```ts
const dialogRef = dialog.open(YourDialogComponent, {
  initialState: { name: 'peter' },
});

@Component({/* */})
class YourDialogComponent {
    name: string;
}
```

## 模态框内容

`Dialog`内置了以下几个布局组件，轻松的定义对话框内容的结构。

组件| 说明 
---| --- 
`thy-dialog-header`| 对话框头部
`thy-dialog-footer`| 对话框底部
`thy-dialog-body`| 对话框主体内容

```html
<thy-dialog-header thyTitle="Dialog Title"></thy-dialog-header>
<thy-dialog-body>
    <p>dialog body</p>
</thy-dialog-body>
<thy-dialog-footer>
    <button thyButton="primary" (click)="thyDialog.close()">确定</button>
    <button thyButton="link-secondary" (click)="thyDialog.close()">关闭</button>
    <ng-template #description>
      <span class="text-desc">当前打开的是一个对话框</span>
    </ng-template>
</thy-dialog-footer>
```

## 打开Confirm
`ThyDialog`服务提供了一个`confirm`方法，支持通过传入一个`ThyConfirmConfig`实例，来打开一个二次弹出提示框。

<example name="thy-dialog-confirm-example" />

Confirm对话框的默认选项可以通过在应用根模块中为`THY_CONFIRM_DEFAULT_OPTIONS`令牌提供一个`ThyConfirmConfig`实例来指定。

```ts
@NgModule({
  providers: [
    { provide: THY_CONFIRM_DEFAULT_OPTIONS, useValue: { 
        title: '确认归档',
        content: '确认要归档选中的6项任务吗？',
        okText: '确认归档',
        okType: 'primary',
        cancelText: '取消归档',
        footerAlign: 'right',
        onOk: () => {
          console.log('归档了6项任务');
        }
      }
    }
  ]
})
```
默认的配置如下：
```ts
const DEFAULT_OPTIONS = {
  title: '确认删除',
  okText: '确定',
  okType: 'danger',
  cancelText: '取消',
  footerAlign: 'left'
};
```
