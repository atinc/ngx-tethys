import { ThyCopyEvent } from 'ngx-tethys/copy';

import { Component } from '@angular/core';

@Component({
    selector: 'thy-copy-mode-example',
    templateUrl: './mode.component.html'
})
export class ThyCopyModeExampleComponent {
    constructor() {}

    copy(event: ThyCopyEvent) {
        if (event.isSuccess) {
            console.log('复制成功啦');
        } else {
            console.log('复制失败啦');
        }
    }
}
