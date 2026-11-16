import { ThyCopyDirective, ThyCopyEvent } from 'ngx-tethys/copy';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-copy-notify-example',
    templateUrl: './notify.component.html',
    imports: [ThyCopyDirective, ThyButton]
})
export class ThyCopyNotifyExampleComponent {
    private notifyService = inject(ThyNotifyService);

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
