import { Component } from '@angular/core';
import { ThyCopyDirective, ThyCopyEvent } from 'ngx-tethys/copy';

@Component({
    selector: 'thy-copy-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyCopyDirective]
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
