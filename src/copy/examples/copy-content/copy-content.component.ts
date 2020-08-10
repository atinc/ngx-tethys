import { Component } from '@angular/core';
import { ThyCopyEvent } from 'ngx-tethys/copy/copy.directive';
@Component({
    selector: 'thy-copy-copy-content-example',
    templateUrl: './copy-content.component.html'
})
export class ThyCopyCopyContentExampleComponent {
    constructor() {}

    copy(event: ThyCopyEvent) {
        if (event.isSuccess) {
            console.log('复制成功啦');
        } else {
            console.log('复制失败啦');
        }
    }
}
