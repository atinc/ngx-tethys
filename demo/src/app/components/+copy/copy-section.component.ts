import { Component } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys';
import { ThyCopyEvent } from 'ngx-tethys/directive/thy-copy.directive';
@Component({
    selector: 'demo-copy-section',
    templateUrl: './copy-section.component.html'
})
export class DemoCopySectionComponent {
    constructor(private notifyService: ThyNotifyService) {}
    copy(event: ThyCopyEvent) {
        if (event.isSuccess) {
            this.notifyService.success('编号已成功复制到粘贴板');
        } else {
            this.notifyService.error('复制失败');
        }
    }
}
