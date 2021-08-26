import { ThyCopyEvent } from 'ngx-tethys/copy/copy.directive';
import { ThyNotifyService } from 'ngx-tethys/notify';

import { Component } from '@angular/core';

@Component({
    selector: 'thy-copy-notify-example',
    templateUrl: './notify.component.html'
})
export class ThyCopyNotifyExampleComponent {
    constructor(private notifyService: ThyNotifyService) {}

    copy(event: ThyCopyEvent) {
        if (event.isSuccess) {
            console.log('复制成功啦');
        } else {
            console.log('复制失败啦');
        }
    }

    copy1(event: ThyCopyEvent) {
        if (event.isSuccess) {
            this.notifyService.success('复制成功', '编号复制成功');
        } else {
            this.notifyService.error('复制失败', '编号复制失败');
        }
    }
}
