import { Component } from '@angular/core';
import { ThyCopyEvent } from 'ngx-tethys/copy/copy.directive';
@Component({
    selector: 'thy-copy-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyCopyBasicExampleComponent {
    constructor() {}

    copy(event: ThyCopyEvent) {
        if (event.isSuccess) {
            console.log('复制成功啦');
        } else {
            console.log('复制失败啦');
        }
    }
}
