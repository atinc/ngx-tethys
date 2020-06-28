---
category: feedback
title: Dialog
subtitle: 对话框
order: 1
---

## 概览
`Dialog`主要提供了一个`ThyDialog`服务，用于打开模态框。 

通过调用`open`方法并传要加载的组件和可选的配置对象可以打开对话框，`open`方法将返回一个`ThyDialogRef`的实例：

```ts
let dialogRef = dialog.open(ProfileComponent, {
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

## 打开模版

`ThyDialog`服务的`open`方法不仅支持组件，也支持打开模版`TemplateRef<T>`，模版可以通过参数传递，也可以通过`@ViewChild()`方式从视图中获取。

```ts
openProfile(template: TemplateRef<any>) {
    let dialogRef = dialog.open(template, {
        height: '400px',
        width: '600px',
    });
}
```

## 设置全局默认值

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
    restoreFocus: true
};
```

## 模态框组件共享数据
如果要和对话框共享数据，可以通过`initialState`参数把信息传给该组件。

```ts
let dialogRef = dialog.open(YourDialogComponent, {
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
    <button thyButton="primary" (click)="thyDialog.close()">确认</button>
    <button thyButton="link-secondary" (click)="thyDialog.close()">关闭</button>
    <ng-template #description>
      <span class="text-desc">当前打开的是一个对话框</span>
    </ng-template>
</thy-dialog-footer>
```
