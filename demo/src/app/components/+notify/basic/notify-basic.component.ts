import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from '../../../../../../src/notify/notify.service';

@Component({
    selector: 'demo-notify-basic',
    templateUrl: './notify-basic.component.html'
})
export class DemoNotifyBasicComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showDefault() {
        this.notifyService.show({
            title: '添加项目成功！',
            duration: 0
        });
    }
}
