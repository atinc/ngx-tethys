import { Component } from '@angular/core';
import { ThyCopyEvent } from 'ngx-tethys/copy';
@Component({
    selector: 'thy-copy-copy-content-example',
    templateUrl: './copy-content.component.html',
    standalone: false
})
export class ThyCopyCopyContentExampleComponent {
    public copyContent = '我是p标签，点击button复制的是我的文本';

    public inputText = '';

    constructor() {}

    copy(event: ThyCopyEvent) {
        if (event.isSuccess) {
            console.log('复制成功啦');
        } else {
            console.log('复制失败啦');
        }
    }
}
