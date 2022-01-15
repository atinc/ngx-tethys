---
category: form
title: Uploader
subtitle: 上传
---

<alert>文件选择上传和拖拽上传控件。</alert>

## 何时使用
将文件通过网页上传到远程服务器。
- 当需要上传一个或多个文件时
- 当需要使用拖拽交互时

## 模块导入
```ts
import { ThyUploaderModule } from "ngx-tethys/uploader";
```

## 基本使用
首先需要在上传按钮外层添加`thy-file-select`组件，设置文件选择事件`thyOnFileSelect`。
```html
<thy-file-select (thyOnFileSelect)="selectFiles($event)">
  <button thyButton="primary">上传</button>
</thy-file-select>
```
选择文件会触发`thyOnFileSelect`事件，可以在组件中通过注入`ThyUploaderService`服务进行文件的远程上传，远程上传过程中可以显示上传进度。

```ts
@Component({
    selector: 'app-uploader-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyUploaderBasicExampleComponent {
    queueFiles: ThyUploadFile[] = [];

    constructor(private thyUploaderService: ThyUploaderService) {}

    selectFiles(event: { files: File[] }) {
        const uploadFiles = event.files.map(file => {
            return {
                nativeFile: file,
                url: UPLOAD_URL,
                method: 'POST',
                fileName: file.name,
                withCredentials: true
            };
        });
        this.thyUploaderService.uploadBulk(uploadFiles).subscribe(
            result => {
                if (result.status === ThyUploadStatus.started) {
                    console.log(`started: ${result.uploadFile.fileName}`);
                    this.queueFiles.push(result.uploadFile);
                } else if (result.status === ThyUploadStatus.done) {
                    console.log(`done: ${result.uploadFile.fileName}`);
                    const index = this.queueFiles.indexOf(result.uploadFile);
                    if (index > -1) {
                        this.queueFiles.splice(index, 1);
                    }
                }
            },
            error => {
                console.log(error);
            }
        );
    }
}
```

## ThyUploaderService 服务

此模块提供了`ThyUploaderService`服务进行文件的远程上传，支持单个文件上传和批量上传，上传函数返回一个`Observable<ThyUploadResponse>`流，通过订阅流可以获取文件上传的进度和状态。

上传状态有四种，分别为：
- `pending`: 准备上传中，默认状态
- `started`: 开始上传
- `uploading`: 正在上传
- `done`: 上传结束


