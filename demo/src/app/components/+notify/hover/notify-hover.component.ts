import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from '../../../../../../src/notify/notify.service';

@Component({
    selector: 'demo-notify-hover',
    templateUrl: './notify-hover.component.html'
})
export class DemoNotifyHoverComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showHoverClose() {
        this.notifyService.show({
            type: 'success',
            title: '成功',
            content: '添加项目成功！',
            pauseOnHover: false
        });
    }
}
