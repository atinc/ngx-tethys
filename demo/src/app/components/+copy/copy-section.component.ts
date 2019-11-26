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
            console.log('复制成功啦');
        } else {
            console.log('复制失败啦');
        }
    }
}
